import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function SectionHeading({
  index,
  title,
  subtitle,
  accent = 'blue',
  icon,
}: {
  index: string;
  title: string;
  subtitle?: string;
  accent?: 'blue' | 'red' | 'purple' | 'amber' | 'green';
  icon?: ReactNode;
}) {
  const colorMap: Record<string, string> = {
    blue: 'text-neon-blue neon-text',
    red: 'text-neon-red neon-text-red',
    purple: 'text-neon-purple neon-text-purple',
    amber: 'text-neon-amber',
    green: 'text-neon-green',
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
        <span className="text-neon-blue/70">{index}</span>
        <span className="h-px w-10 bg-neon-blue/40" />
        <span>{icon}</span>
      </div>
      <h2 className={`mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold ${colorMap[accent]}`}>
        {title}
      </h2>
      {subtitle && <p className="mt-2 max-w-2xl text-sm sm:text-base text-white/60">{subtitle}</p>}
      <div className="hud-line mt-5" />
    </motion.div>
  );
}
