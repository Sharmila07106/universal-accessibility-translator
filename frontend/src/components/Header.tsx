import Logo from './Logo';
import { useTheme } from '../hooks/useTheme';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-panel border-t-0 border-x-0 border-b border-brand-border/40">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#top" className="rounded-xl focus-visible:outline-2 focus-visible:outline-brand-primary outline-offset-4" aria-label="Setu Home">
          <Logo size={36} />
        </a>
        
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm" aria-label="Main navigation">
          <a href="#how-it-works" className="text-brand-text hover:text-brand-primary transition-colors focus-visible:outline-2 rounded">How it works</a>
          <a href="#features" className="text-brand-text hover:text-brand-primary transition-colors focus-visible:outline-2 rounded">Features</a>
          <a href="#accessibility" className="text-brand-text hover:text-brand-primary transition-colors focus-visible:outline-2 rounded">Accessibility</a>
          <a href="#privacy" className="text-brand-text hover:text-brand-primary transition-colors focus-visible:outline-2 rounded">Privacy</a>
        </nav>

        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          className="p-2.5 rounded-full bg-brand-surface/50 hover:bg-brand-surface border border-brand-border text-brand-text-muted hover:text-brand-primary hover:border-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2"
        >
          {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          )}
        </button>
      </div>
    </header>
  );
}
