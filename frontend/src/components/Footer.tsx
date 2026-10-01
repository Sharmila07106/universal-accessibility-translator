import { useEffect, useState } from 'react';
import { checkHealth } from '../services/api';
import type { HealthStatus } from '../services/api';
import Logo from './Logo';
import { brand } from '../config/brand';

const getStatusColor = (status?: string) => {
  if (status === 'UP') return 'bg-green-50 border-green-200 text-green-700 dark:bg-green-950/30 dark:border-green-900/50 dark:text-green-400';
  return 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-900/50 dark:text-red-400';
};

const StatusPill = ({ label, status, isError = false }: { label: string; status: string; isError?: boolean }) => {
  const isUp = status === 'UP' && !isError;
  return (
    <div 
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium shadow-sm transition-colors ${getStatusColor(isUp ? 'UP' : 'DOWN')}`}
      aria-live="polite"
    >
      {isUp ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
      )}
      <span>{label}: {isUp ? 'Connected' : 'Unavailable'}</span>
    </div>
  );
};

export default function Footer() {
  const [healthData, setHealthData] = useState<HealthStatus | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    checkHealth()
      .then(data => {
        setHealthData(data);
        setError(false);
      })
      .catch(err => {
        console.error(err);
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

        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
          {error || !healthData ? (
             <StatusPill label="Backend" status="DOWN" isError={true} />
          ) : (
             <>
               <StatusPill label="Backend" status={healthData.status === 'DEGRADED' ? 'UP' : healthData.status} />
               {healthData.components?.database && (
                 <StatusPill label="Database" status={healthData.components.database} />
               )}
               {healthData.components?.redis && (
                 <StatusPill label="Redis" status={healthData.components.redis} />
               )}
               {healthData.timestamp && (
                 <span className="text-xs text-brand-text-muted ml-2">
                   Last checked: {new Date(healthData.timestamp).toLocaleTimeString()}
                 </span>
               )}
             </>
          )}
        </div>
      </div>
    </footer>
  );
}
