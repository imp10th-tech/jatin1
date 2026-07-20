import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { Activity, Gauge, Zap, Brain, Battery, MessageSquareOff } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { STATS } from '../../content/data';

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, mv]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

function Meter({ label, value, color }: { label: string; value: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const colorMap: Record<string, string> = {
    red: 'from-neon-red to-neon-amber',
    blue: 'from-neon-blue to-neon-cyan',
    purple: 'from-neon-purple to-neon-blue',
    amber: 'from-neon-amber to-neon-red',
  };
  return (
    <div ref={ref}>
      <div className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-widest text-white/50">
        <span>{label}</span>
        <span className="text-white/80">{value}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded bg-white/10">
        <motion.div
          className={`h-full bg-gradient-to-r ${colorMap[color]}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function DashboardSection() {
  const [excuse, setExcuse] = useState(STATS.currentExcuse);
  const [energy, setEnergy] = useState(8);

  useEffect(() => {
    const excuses = [
      "Phone silent lo undhi, chudaledhu.",
      "Just now chusanu bro.",
      "Battery die aipoindhi.",
      "Maa amma pani ichindhi.",
      "Auto dorakaledhu.",
    ];
    const iv = setInterval(() => {
      setExcuse(excuses[Math.floor(Math.random() * excuses.length)]);
      setEnergy((e) => Math.max(2, Math.min(15, e + (Math.random() > 0.5 ? 1 : -1))));
    }, 3200);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="dashboard" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        index="02"
        title="LIVE STATUS DASHBOARD"
        subtitle="Real-time telemetry from the subject's known devices. Numbers may be fictional, but the energy is real."
        accent="blue"
        icon={<Activity className="h-3.5 w-3.5" />}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.counters.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="panel group relative overflow-hidden p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-2xl">{c.icon}</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-neon-blue/50">Live</span>
            </div>
            <div className="font-display text-3xl font-bold text-white">
              <Counter value={c.value} suffix={c.suffix} />
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/50">
              {c.label}
            </div>
            <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-neon-blue/10 blur-2xl transition-all group-hover:bg-neon-blue/20" />
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="panel p-6 lg:col-span-2"
        >
          <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neon-red/80">
            <Gauge className="h-3.5 w-3.5" /> Subject Meters
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {STATS.meters.map((m) => (
              <Meter key={m.label} {...m} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="panel p-6"
        >
          <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neon-amber/80">
            <MessageSquareOff className="h-3.5 w-3.5" /> Current Excuse
          </div>
          <motion.div
            key={excuse}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md border border-neon-amber/30 bg-neon-amber/5 p-3 font-mono text-sm text-neon-amber"
          >
            "{excuse}"
          </motion.div>
          <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
            <Battery className="h-3.5 w-3.5" /> Energy Level
            <span className="ml-auto text-neon-green">{Math.round(energy)}%</span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-green to-neon-blue"
              animate={{ width: `${energy}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
            <Brain className="h-3.5 w-3.5" /> Brain Cells
            <span className="ml-auto text-neon-purple">23 / 100</span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded bg-white/10">
            <div className="h-full w-[23%] bg-gradient-to-r from-neon-purple to-neon-red" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
