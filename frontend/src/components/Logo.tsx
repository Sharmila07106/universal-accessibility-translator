import { brand } from '../config/brand';

export default function Logo({ size = 24 }: { size?: number }) {
  // We'll use size for font size to keep the prop functional
  const nameParts = brand.name.split('Bridge');
  const firstPart = nameParts[0];
  const secondPart = brand.name.includes('Bridge') ? 'Bridge' : nameParts[1] || '';

  return (
    <div className="flex items-center gap-2" style={{ fontSize: size }} aria-label={`${brand.name} logo`}>
      <span className="font-extrabold tracking-tight">
        <span className="text-brand-text">{firstPart}</span>
        <span className="text-brand-accent">{secondPart}</span>
      </span>
    </div>
  );
}
