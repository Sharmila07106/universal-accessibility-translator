import { brand } from '../config/brand';

export default function Logo({ size = 24 }: { size?: number }) {
  // We'll use size for font size to keep the prop functional
  return (
    <div className="flex items-center gap-2" style={{ fontSize: size }}>
      <span className="font-extrabold tracking-tight">
        <span className="text-brand-text">Human</span>
        <span className="text-brand-accent">Bridge</span>
      </span>
    </div>
  );
}
