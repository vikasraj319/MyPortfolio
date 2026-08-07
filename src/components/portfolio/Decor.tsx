export function CircuitLines({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute ${className}`}
      viewBox="0 0 600 400"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 206H92L126 171H238L272 206H417L454 243H592"
        stroke="var(--gold)"
        strokeWidth="1"
        opacity="0.48"
      />
      <path d="M32 82H91L119 111H218" stroke="var(--gold)" strokeWidth="1" opacity="0.34" />
      <path d="M354 70H423L450 98H555" stroke="var(--gold)" strokeWidth="1" opacity="0.28" />
      <path d="M458 309H520L544 333H590" stroke="var(--gold)" strokeWidth="1" opacity="0.34" />
      <circle cx="126" cy="171" r="3.5" fill="var(--gold)" opacity="0.6" />
      <circle cx="454" cy="243" r="3.5" fill="var(--gold)" opacity="0.6" />
      <circle cx="119" cy="111" r="2.8" fill="var(--gold)" opacity="0.48" />
      <circle cx="450" cy="98" r="2.8" fill="var(--gold)" opacity="0.42" />
      <path
        d="M24 280L51 253H96M18 302H75L103 330H178"
        stroke="var(--gold)"
        strokeWidth="1"
        opacity="0.2"
      />
    </svg>
  );
}

export function SoftBlueprint({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute ${className}`}
      viewBox="0 0 520 520"
      fill="none"
      aria-hidden
    >
      <defs>
        <pattern id="blueprint-grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" stroke="#F4C430" strokeWidth="0.5" opacity="0.18" />
        </pattern>
        <pattern id="blueprint-hex" width="72" height="82" patternUnits="userSpaceOnUse">
          <path
            d="M36 4L67 22V60L36 78L5 60V22L36 4Z"
            stroke="#F4C430"
            strokeWidth="0.8"
            opacity="0.28"
          />
        </pattern>
      </defs>
      <rect width="520" height="520" fill="url(#blueprint-grid)" opacity="0.9" />
      <rect width="520" height="520" fill="url(#blueprint-hex)" />
      <circle cx="88" cy="128" r="64" stroke="#F4C430" strokeWidth="1" opacity="0.2" />
      <circle cx="88" cy="128" r="38" stroke="#F4C430" strokeWidth="1" opacity="0.16" />
      <path d="M18 392H108L138 362H244" stroke="#F4C430" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

export function HexBadge({ className = "" }: { className?: string }) {
  return (
     <img
      src="/images/Bumblebee-logo.png"
      alt="Bumblebee Logo"
      className={className}
    />
  );
}
