import { motion } from 'motion/react';
import { brand } from '../config/brand';

const steps = [
  {
    title: 'Speak or sign',
    description: 'Express yourself naturally in your preferred language or modality.',
  },
  {
    title: `${brand.name} understands`,
    description: 'Advanced models process your communication in real time.',
  },
  {
    title: 'Delivered your way',
    description: 'The receiver gets your message exactly as they need it.',
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How it works</h2>
          <p className="text-brand-text-muted text-lg">A seamless flow from expression to understanding.</p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-start justify-between relative gap-12 md:gap-4">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-brand-border z-0">
            <motion.div 
              className="h-full bg-brand-primary"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          {/* Connector Line for Mobile */}
          <div className="md:hidden absolute top-0 bottom-0 left-6 w-[2px] bg-brand-border z-0">
             <motion.div 
              className="w-full bg-brand-primary"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.3 + 0.2 }}
              className="relative z-10 flex flex-row md:flex-col items-center md:text-center gap-6 w-full md:w-1/3 pl-12 md:pl-0"
            >
              <div className="absolute md:relative left-0 md:left-auto flex items-center justify-center w-12 h-12 md:w-24 md:h-24 rounded-full glass-panel text-brand-primary font-bold text-xl md:text-3xl -ml-6 md:ml-0 shadow-lg bg-brand-surface border border-brand-primary/20">
                {index + 1}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-brand-text-muted">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
