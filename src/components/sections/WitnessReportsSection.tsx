import { motion } from 'framer-motion';
import { Users, FileBarChart, Quote } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { WITNESS_STATEMENTS, INVESTIGATION_REPORTS } from '../../content/data';

const REL_COLOR: Record<string, string> = {
  High: 'border-neon-green/40 text-neon-green',
  Medium: 'border-neon-amber/40 text-neon-amber',
  'Very High': 'border-neon-blue/40 text-neon-blue',
  Low: 'border-white/20 text-white/60',
};

export default function WitnessReportsSection() {
  return (
    <section id="witness" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        index="08"
        title="WITNESS STATEMENTS"
        subtitle="Sworn testimonies from friends, roommates, cousins, and one deeply traumatized snack owner."
        accent="blue"
        icon={<Users className="h-3.5 w-3.5" />}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {WITNESS_STATEMENTS.map((w, i) => (
          <motion.div
            key={w.witness}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="panel relative p-5"
          >
            <Quote className="absolute -top-2 -left-2 h-6 w-6 text-neon-blue/30" />
            <div className="flex items-center justify-between">
              <div className="font-display text-base font-semibold text-white">{w.witness}</div>
              <span className={`chip ${REL_COLOR[w.reliability] ?? 'border-white/20'}`}>
                Reliability: {w.reliability}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/75">"{w.statement}"</p>
          </motion.div>
        ))}
      </div>

      <div id="reports" className="mt-16">
        <SectionHeading
          index="09"
          title="INVESTIGATION REPORTS"
          subtitle="Analytical deep-dives by the Bureau's top (imaginary) behavioral scientists."
          accent="amber"
          icon={<FileBarChart className="h-3.5 w-3.5" />}
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {INVESTIGATION_REPORTS.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="panel p-5"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-neon-amber/70">
                {r.id}
              </div>
              <h3 className="mt-1 font-display text-lg font-semibold text-white">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{r.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
