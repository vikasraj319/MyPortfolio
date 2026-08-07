import { motion } from "framer-motion";

type QuoteCardProps = {
  quote: string;
  author: string;
  image: string;
};

export function QuoteCard({
  quote,
  author,
  image,
}: QuoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="
        relative
        min-h-[580px]
        rounded-[28px]
        border
        border-border
        bg-white/90
        p-8
        shadow-card
        overflow-hidden
      "
    >
      {/* Decorative Quote */}
      <span className="text-6xl font-black text-gold opacity-80">
        “
      </span>

      {/* Quote */}
      <p className="mt-6 font-display text-3xl font-bold leading-tight">
        {quote}
      </p>

      {/* Divider */}
      <div className="mt-8 h-px bg-gold/30" />

      {/* Author */}
      <p className="mt-6 text-lg font-bold text-gold">
        — {author}
      </p>

      {/* Character Image */}
      <img
        src={image}
        alt={author}
        className="
          absolute
          bottom-0
          right-0
          w-[260px]
          pointer-events-none
          select-none
        "
      />
    </motion.div>
  );
}