import { motion } from 'motion/react';

export default function TrustSection() {
  return (
    <section id="accessibility" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-10 md:p-12 rounded-3xl"
          >
            <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Accessibility First</h2>
            <ul className="space-y-4 text-brand-text-muted">
              <li className="flex items-start gap-3">
                <span className="text-brand-primary mt-1">•</span>
                <span>Large text options and high contrast modes available natively.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-primary mt-1">•</span>
                <span>Full keyboard navigation support across the entire interface.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-primary mt-1">•</span>
                <span>Screen reader labels and clear visual alerts for important states.</span>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            id="privacy"
            className="glass-panel p-10 md:p-12 rounded-3xl"
          >
            <div className="w-12 h-12 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Privacy by Design</h2>
            <ul className="space-y-4 text-brand-text-muted">
              <li className="flex items-start gap-3">
                <span className="text-brand-accent mt-1">•</span>
                <span>Call video is never stored by default.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-accent mt-1">•</span>
                <span>Only the minimum data required for processing is collected.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-accent mt-1">•</span>
                <span>Delete your history and communication data anytime.</span>
              </li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
