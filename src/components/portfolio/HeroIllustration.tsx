import { Bot, Cpu, Hexagon, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function HeroIllustration() {
  return (
    <div className="hero-illustration">
      <div className="hero-illustration__backdrop" />
      <div className="hero-illustration__shadow" />
      <svg className="hero-illustration__lines" viewBox="0 0 690 365" fill="none" aria-hidden>
        <path
          d="M90 298C154 232 162 130 264 97C362 66 440 95 499 148C560 203 592 243 644 255"
          stroke="#F4C430"
          strokeWidth="1.2"
          opacity="0.36"
        />
        <path
          d="M63 264H149L186 228H306L340 195H438L474 226H618"
          stroke="#F4C430"
          strokeWidth="1"
          opacity="0.35"
        />
        <path
          d="M464 56H522L541 75H611"
          stroke="#E7C759"
          strokeWidth="1"
          opacity="0.5"
        />
        <circle cx="186" cy="228" r="4" fill="#F4C430" opacity="0.55" />
        <circle cx="474" cy="226" r="4" fill="#F4C430" opacity="0.55" />
        <circle cx="541" cy="75" r="3" fill="#F4C430" opacity="0.55" />
      </svg>

      <motion.img
        src="/images/Bumblebee.png"
        alt="Bumblebee"
        className="hero-illustration__bot"
        animate={{ y: [0, -10, 0] }}
        transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
        }}
      />
      <Hexagon className="hero-illustration__icon hero-illustration__icon--hex-right text-gold/40" />
      <Hexagon className="hero-illustration__icon hero-illustration__icon--hex-left text-gold/35" />
      <Zap className="hero-illustration__icon hero-illustration__icon--zap text-gold/70" />
      <Cpu className="hero-illustration__icon hero-illustration__icon--cpu text-gold/45" />
    </div>
  );
}

export function ArtworkSlot({ label, className = "" }: { label: string; className?: string }) {
  return (
    // <div
    //   className={`pointer-events-none grid place-items-center rounded-[24px] border border-gold/45 bg-[linear-gradient(135deg,rgba(255,244,198,0.72),rgba(255,255,255,0.38))] text-center shadow-soft backdrop-blur-sm ${className}`}
    //   aria-hidden
    // >
    <div className={`${className}`}>
      <img
        src="/images/little-quote.png"
        alt="bumblebee-quote"
        className="h-full w-full object-contain"
      /> 
    </div>
  );
}

export function MiniArtworkSlot({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`pointer-events-none rounded-[24px] border border-gold/40 bg-white/75 shadow-soft backdrop-blur-sm ${className}`}
      aria-hidden
    >
      <img
        src="/images/quote.png"
        alt="bumblebee-quote"
        className="h-full w-full object-contain"
      />
    </div>
  );
}
