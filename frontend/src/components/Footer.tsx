import { useEffect, useState } from 'react';
import { checkHealth } from '../services/api';
import Logo from './Logo';
import { brand } from '../config/brand';

export default function Footer() {
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
    <footer className="w-full py-12 px-6 border-t border-brand-border/40 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Logo size={32} />
          <p className="text-sm font-medium text-brand-text-muted">{brand.taglineShort}</p>
        </div>

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
      </div>
    </footer>
  );
}
