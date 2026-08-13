import { useEffect } from "react";
import {
    Check,
    X,
    AlertTriangle,
    Info,
    XIcon,
} from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
    message: string;
    title?: string;
    type?: ToastType;
    duration?: number;
    onClose: () => void;
}

function Toast({
    message,
    title,
    type = "success",
    duration = 4000,
    onClose,
}: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const config = {
        success: {
            icon: <Check size={20} strokeWidth={2.8} />,
            defaultTitle: "Message sent successfully!",
            className: "toast-success",
        },

        error: {
            icon: <X size={20} strokeWidth={2.8} />,
            defaultTitle: "Something went wrong.",
            className: "toast-error",
        },

        warning: {
            icon: <AlertTriangle size={20} strokeWidth={2.8} />,
            defaultTitle: "Please check your input.",
            className: "toast-warning",
        },

        info: {
            icon: <Info size={20} strokeWidth={2.8} />,
            defaultTitle: "Thanks for reaching out!",
            className: "toast-info",
        },
    };

    const current = config[type];

    return (
        <div
            className={`toast-notification ${current.className}`}
            role="alert"
            aria-live="polite"
        >
            {/* Icon */}
            <div className="toast-icon">
                {current.icon}
            </div>

            {/* Content */}
            <div className="toast-content">
                <div className="toast-title">
                    {title || current.defaultTitle}
                </div>

                <div className="toast-message">
                    {message}
                </div>
            </div>

            {/* Close */}
            <button
                type="button"
                className="toast-close"
                onClick={onClose}
                aria-label="Close notification"
            >
                <XIcon size={18} />
            </button>

            {/* Progress */}
            <div
                className="toast-progress"
                style={{
                    animationDuration: `${duration}ms`,
                }}
            />
        </div>
    );
}

interface ToastContainerProps {
    toast: {
        message: string;
        title?: string;
        type: ToastType;
        duration?: number;
    } | null;

    onClose: () => void;
}

export default function ToastContainer({
    toast,
    onClose,
}: ToastContainerProps) {
    if (!toast) return null;

    return (
        <div className="toast-container">
            <Toast
                message={toast.message}
                title={toast.title}
                type={toast.type}
                duration={toast.duration}
                onClose={onClose}
            />
        </div>
    );
}