import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { TIMELINE } from '../../content/data';

export default function TimelineSection() {
  return (
    <section id="timeline" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        index="07"
        title="TIMELINE OF EVENTS"
        subtitle="A chronological record of the subject's descent into legend-hood."
        accent="purple"
        icon={<Clock className="h-3.5 w-3.5" />}
      />

      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-neon-blue/60 via-neon-purple/40 to-neon-red/40 sm:left-1/2" />
        <div className="space-y-8">
          {TIMELINE.map((t, i) => (
            <motion.div
              key={t.year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.05 }}
              className={`relative pl-12 sm:w-1/2 sm:pl-0 ${
                i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:ml-auto sm:pl-12'
              }`}
            >
              <div
                className={`absolute top-2 h-3 w-3 rounded-full bg-neon-blue shadow-neon ${
                  i % 2 === 0
                    ? 'left-3 sm:left-auto sm:-right-1.5'
                    : 'left-3 sm:-left-1.5'
                }`}
              />
              <div className="panel p-5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-neon-purple/80">
                  {t.year}
                </div>
                <h3 className="mt-1 font-display text-lg font-semibold text-white">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{t.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
