import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { Resend } from "resend";
import { createServerFn } from "@tanstack/react-start";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContact = createServerFn({ method: "POST" })
  .validator((data: {
    name: string;
    email: string;
    message: string;
  }) => {
    if (!data.name.trim()) {
      throw new Error("Name is required");
    }

    if (!data.email.trim()) {
      throw new Error("Email is required");
    }

    if (!data.message.trim()) {
      throw new Error("Message is required");
    }

    return data;
  })
  .handler(async ({ data }) => {
    try {
      // Check required environment variables
      if (!process.env.RESEND_API_KEY) {
        console.error("RESEND_API_KEY is missing");
        throw new Error("Email service is not configured");
      }

      if (!process.env.CONTACT_RECEIVER_EMAIL) {
        console.error("CONTACT_RECEIVER_EMAIL is missing");
        throw new Error("Receiver email is not configured");
      }

      const { data: emailData, error } = await resend.emails.send({
        from: "Portfolio <hello@vikas-tovi.dev>",
        to: process.env.CONTACT_RECEIVER_EMAIL,
        replyTo: data.email,
        subject: `Portfolio Contact - ${data.name}`,
        text: `
Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
        `.trim(),
      });

      // Handle Resend errors
      if (error) {
        console.error("Resend error:", error);
        throw new Error(error.message);
      }

      console.log("Portfolio email sent successfully:", emailData);

      return {
        success: true,
        message: "Message sent successfully",
      };
    } catch (error) {
      console.error("Contact form error:", error);

      throw new Error("Unable to send message");
    }
  });