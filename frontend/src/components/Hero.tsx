import React, { Suspense, useEffect, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';

const ThreeScene = React.lazy(() => import('./three/ThreeScene'));

export default function Hero() {
  const [reducedMotion, setReducedMotion] = useState(() => 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <ErrorBoundary>
          <Suspense fallback={null}>
            <ThreeScene reducedMotion={reducedMotion} />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-1 text-sm text-brand-primary mb-8 backdrop-blur-md">
          Early development build
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-brand-text tracking-tighter mb-6 leading-[1.1]">
          Communicate without <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
            barriers.
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-brand-text-muted max-w-2xl leading-relaxed">
          Setu connects people through voice, video, subtitles and sign language in real time.
        </p>
      </div>
    </section>
  );
}
