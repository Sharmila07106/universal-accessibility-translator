export default function Logo({ size = 48 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 64 64" 
        role="img" 
        aria-hidden="true"
        width={size}
        height={size}
        className="text-brand-primary shrink-0"
      >
        <rect width="64" height="64" rx="16" fill="currentColor"/>
        <path 
          d="M14 44 Q32 12 50 44" 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth="5" 
          strokeLinecap="round" 
          className="logo-arch" 
        />
        <circle cx="14" cy="47" r="5" fill="var(--brand-accent, #2DD4BF)"/>
        <circle cx="50" cy="47" r="5" fill="var(--brand-accent, #2DD4BF)"/>
      </svg>
      <span className="font-bold text-2xl tracking-tight text-brand-text">Setu</span>
    </div>
  );
}
