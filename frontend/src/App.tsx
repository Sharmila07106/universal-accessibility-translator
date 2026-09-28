import { useEffect, useState } from 'react';
import { checkHealth } from './services/api';
import Logo from './components/Logo';

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="p-2 rounded-full bg-brand-surface border border-brand-border text-brand-text-muted hover:text-brand-primary hover:border-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2"
    >
      {theme === 'light' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
      )}
    </button>
  );
}

export default function App() {
  const [status, setStatus] = useState<string>('Checking backend...');
  const [timestamp, setTimestamp] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    checkHealth()
      .then(data => {
        setStatus('Backend connected');
        setTimestamp(data.timestamp);
        setError(false);
      })
      .catch(err => {
        console.error(err);
        setStatus('Backend not reachable');
        setError(true);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden transition-colors duration-300">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50 dark:opacity-30">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-primary blur-[120px] mix-blend-multiply opacity-20" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-brand-accent blur-[120px] mix-blend-multiply opacity-20" />
      </div>

      <a href="#main-content" className="absolute top-0 left-0 p-4 -translate-y-full focus:translate-y-0 z-50 bg-brand-primary text-white font-bold transition-transform">
        Skip to main content
      </a>

      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Logo size={40} />
        <ThemeToggle />
      </header>

      <main id="main-content" className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 py-12 animate-fade-in-up">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-text tracking-tight mb-6 leading-tight">
            Communicate without <span className="text-brand-primary">barriers.</span>
          </h1>
          <p className="text-lg sm:text-xl text-brand-text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
            Setu connects people through voice, video, subtitles and sign language in real time, bridging every conversation seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 mt-12 text-left">
            <div className="flex items-start gap-4 max-w-xs">
              <div className="p-3 rounded-xl bg-brand-primary/10 text-brand-primary shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="3" height="3"/><rect x="14" y="9" width="3" height="3"/><rect x="9" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="3"/></svg>
              </div>
              <div>
                <h3 className="font-semibold text-brand-text text-lg">Live captions</h3>
                <p className="text-brand-text-muted text-sm mt-1">Instant text generation from spoken words.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 max-w-xs">
              <div className="p-3 rounded-xl bg-brand-primary/10 text-brand-primary shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m14.5 4-5 16"/><path d="m4.5 12 15 0"/></svg>
              </div>
              <div>
                <h3 className="font-semibold text-brand-text text-lg">Sign language</h3>
                <p className="text-brand-text-muted text-sm mt-1">Real-time sign language avatars and recognition.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 max-w-xs">
              <div className="p-3 rounded-xl bg-brand-primary/10 text-brand-primary shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
              </div>
              <div>
                <h3 className="font-semibold text-brand-text text-lg">Your language, your way</h3>
                <p className="text-brand-text-muted text-sm mt-1">Express yourself naturally in your preferred modality.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 w-full p-6 flex justify-center mt-auto">
        <div 
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium shadow-sm transition-colors ${
            error 
              ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-900/50 dark:text-red-400' 
              : 'bg-green-50 border-green-200 text-green-700 dark:bg-green-950/30 dark:border-green-900/50 dark:text-green-400'
          }`}
          aria-live="polite"
        >
          {error ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          )}
          <span>{status}</span>
          {timestamp && !error && (
            <span className="opacity-75 font-normal border-l border-current pl-2 ml-1">
              {new Date(timestamp).toLocaleTimeString()}
            </span>
          )}
        </div>
      </footer>
    </div>
  );
}
