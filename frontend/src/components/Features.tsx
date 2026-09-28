import { motion } from 'motion/react';

const features = [
  {
    title: 'Live captions',
    desc: 'Designed to provide instant text generation from spoken words, keeping you in the loop.',
    className: 'md:col-span-2 md:row-span-2'
  },
  {
    title: 'Sign language',
    desc: 'Starting with Indian Sign Language, designed to interpret gestures seamlessly.',
    className: 'md:col-span-1 md:row-span-1'
  },
  {
    title: 'Translation',
    desc: 'Designed to translate between multiple languages in real time.',
    className: 'md:col-span-1 md:row-span-1'
  },
  {
    title: 'Confidence-aware',
    desc: 'Uncertain results are never presented as certain, maintaining trust in communication.',
    className: 'md:col-span-1 md:row-span-2'
  },
  {
    title: 'Fallback communication',
    desc: 'Text input and output are always available if AI fails or connectivity drops.',
    className: 'md:col-span-2 md:row-span-1'
  },
  {
    title: 'Personal profile',
    desc: 'Designed to adapt to your unique accessibility needs and preferences.',
    className: 'md:col-span-1 md:row-span-1'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Features</h2>
          <p className="text-brand-text-muted text-lg max-w-2xl">
            A comprehensive suite of tools designed to bridge communication gaps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
              className={`glass-panel p-8 rounded-3xl flex flex-col justify-end transition-all ${feature.className}`}
              style={{ transformPerspective: 1000 }}
            >
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-brand-text-muted">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
