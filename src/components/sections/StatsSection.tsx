import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { CHART_DATA } from '../../content/data';

function BarChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const max = Math.max(...CHART_DATA.weeklyReplies.map((d) => d.value));
  return (
    <div ref={ref} className="panel p-5">
      <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neon-blue/70">
        <BarChart3 className="h-3.5 w-3.5" /> Weekly Reply Count (per day)
      </div>
      <div className="flex h-44 items-end justify-between gap-2">
        {CHART_DATA.weeklyReplies.map((d, i) => (
          <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
            <motion.div
              className="w-full rounded-t bg-gradient-to-t from-neon-blue/40 to-neon-blue"
              initial={{ height: 0 }}
              animate={inView ? { height: `${(d.value / max) * 100}%` } : {}}
              transition={{ duration: 0.8, delay: i * 0.06 }}
              style={{ minHeight: 4 }}
            />
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">{d.day}</span>
            <span className="font-mono text-[10px] text-neon-blue">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PieChart() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });
  const total = CHART_DATA.snackByType.reduce((a, b) => a + b.value, 0);
  let acc = 0;
  return (
    <div className="panel p-5">
      <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neon-red/70">
        <PieChartIcon className="h-3.5 w-3.5" /> Snacks Liberated (by type)
      </div>
      <div className="flex items-center gap-4">
        <svg ref={ref} viewBox="0 0 100 100" className="h-36 w-36">
          {CHART_DATA.snackByType.map((s, i) => {
            const start = (acc / total) * 360;
            acc += s.value;
            const end = (acc / total) * 360;
            const r = 40;
            const cx = 50;
            const cy = 50;
            const polar = (ang: number) => {
              const rad = ((ang - 90) * Math.PI) / 180;
              return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
            };
            const [sx, sy] = polar(start);
            const [ex, ey] = polar(end);
            const large = end - start > 180 ? 1 : 0;
            return (
              <motion.path
                key={i}
                d={`M ${cx} ${cy} L ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey} Z`}
                fill={s.color}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              />
            );
          })}
          <circle cx="50" cy="50" r="22" fill="#060814" />
          <text x="50" y="52" textAnchor="middle" className="fill-white font-mono text-[8px]">
            {total} total
          </text>
        </svg>
        <ul className="flex-1 space-y-1.5">
          {CHART_DATA.snackByType.map((s) => (
            <li key={s.label} className="flex items-center gap-2 font-mono text-[11px] text-white/70">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
              {s.label}
              <span className="ml-auto text-white/50">{s.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ActivityChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const max = Math.max(...CHART_DATA.activityByHour);
  return (
    <div ref={ref} className="panel p-5 lg:col-span-2">
      <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neon-purple/70">
        <Activity className="h-3.5 w-3.5" /> Activity by Hour (peaks suspiciously at 2 AM)
      </div>
      <div className="flex h-32 items-end gap-px">
        {CHART_DATA.activityByHour.map((v, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-neon-purple/40 to-neon-blue"
            initial={{ height: 0 }}
            animate={inView ? { height: `${(v / max) * 100}%` } : {}}
            transition={{ duration: 0.5, delay: i * 0.02 }}
            title={`${i}:00 — ${v} actions`}
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between font-mono text-[9px] text-white/30">
        <span>12 AM</span><span>6 AM</span><span>12 PM</span><span>6 PM</span><span>11 PM</span>
      </div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section id="stats" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        index="12"
        title="STATISTICS DASHBOARD"
        subtitle="Beautifully rendered, completely fictional analytics of the subject's behavior."
        accent="purple"
        icon={<BarChart3 className="h-3.5 w-3.5" />}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <BarChart />
        <PieChart />
        <ActivityChart />
        <div className="panel p-5">
          <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neon-amber/70">
            <Activity className="h-3.5 w-3.5" /> Key Insights
          </div>
          <ul className="space-y-2 text-sm text-white/75">
            <li>• Reply probability spikes 880% when the word "biryani" is detected.</li>
            <li>• Subject is most active between 11 PM and 4 AM. Sleep is for the weak.</li>
            <li>• Aloo Bhujia accounts for 38% of all snack disappearances.</li>
            <li>• "5 minutes" averages 47-183 Earth minutes. Plan accordingly.</li>
            <li>• Charger migration rate: 4.2 meters per day. Mostly toward cousin's house.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
