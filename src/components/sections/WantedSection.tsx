import { motion } from 'framer-motion';
import { Award, Star, Skull, Trophy } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { HALL_OF_SHAME, HALL_OF_FAME, SUBJECT } from '../../content/data';
import jatinPhoto from '../../assets/jatin1.jpg';


export default function WantedSection() {
  return (
    <section id="wanted" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        index="06"
        title="WANTED · HALL OF SHAME · HALL OF FAME"
        subtitle="The subject is simultaneously the most-wanted and most-celebrated legend in the friend group."
        accent="red"
        icon={<Skull className="h-3.5 w-3.5" />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Wanted poster */}
        <motion.div
          initial={{ opacity: 0, rotate: -3, y: 20 }}
          whileInView={{ opacity: 1, rotate: -2, y: 0 }}
          viewport={{ once: true }}
          className="classified-paper relative overflow-hidden rounded-md p-6 lg:col-span-1"
        >
          <div className="absolute -top-3 left-1/2 tape h-8 w-32 -translate-x-1/2" />
          <div className="text-center font-mono text-3xl font-bold tracking-widest text-classified-red">
            WANTED
          </div>
          <div className="text-center font-mono text-[10px] uppercase tracking-widest text-black/70">
            Dead or Alive (preferably alive, with biryani)
          </div>
          <div className="relative mx-auto my-4 h-56 w-44 overflow-hidden rounded-sm border-4 border-black/80 bg-gradient-to-b from-ink-700 to-ink-900">
              <img
    src={jatinPhoto}
    alt="Jatin Naga Sai Bandireddi"
    className="h-full w-full object-cover"
  />
            <div className="absolute inset-0 bg-grid-cyan bg-[size:14px_14px] opacity-30" />
            <div className="flex h-full flex-col items-center justify-center gap-2 p-3 text-center">
              <div className="h-24 w-24 rounded-full border-2 border-white/30 bg-ink-800" />
              <div className="font-mono text-[9px] uppercase tracking-widest text-white/60">
                {/* TODO: Replace with actual Jatin photo */}
                Wanted
              </div>
            </div>
          </div>
          <div className="text-center font-display text-lg font-bold">{SUBJECT.name}</div>
          <div className="mt-2 text-center font-mono text-[10px] uppercase tracking-widest text-black/70">
            Aliases
          </div>
          <div className="text-center font-mono text-[11px]">{SUBJECT.aliases.join(' · ')}</div>
          <div className="mt-3 border-t-2 border-classified-red/40 pt-2 text-center font-mono text-[10px] uppercase tracking-widest text-classified-red">
            Reward
          </div>
          <div className="text-center text-xs leading-snug">{SUBJECT.reward}</div>
          <div className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-black/70">
            Threat Level: {SUBJECT.threatLevel}
          </div>
          <div className="absolute bottom-2 right-2 rotate-[-8deg] border-2 border-classified-red px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-classified-red">
            Case {SUBJECT.caseId}
          </div>
        </motion.div>

        {/* Hall of Shame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="panel p-6"
        >
          <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neon-red/80">
            <Skull className="h-3.5 w-3.5" /> Hall of Shame
          </div>
          <ul className="space-y-3">
            {HALL_OF_SHAME.map((h) => (
              <li key={h.title} className="border-l-2 border-neon-red/40 pl-3">
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">{h.title}</div>
                <div className="font-display text-2xl font-bold text-neon-red neon-text-red">{h.value}</div>
                <div className="text-xs text-white/60">{h.note}</div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Hall of Fame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="panel p-6"
        >
          <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neon-amber/80">
            <Trophy className="h-3.5 w-3.5" /> Hall of Fame
          </div>
          <ul className="space-y-3">
            {HALL_OF_FAME.map((h) => (
              <li key={h.title} className="border-l-2 border-neon-amber/40 pl-3">
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">{h.title}</div>
                <div className="font-display text-2xl font-bold text-neon-amber">{h.value}</div>
                <div className="text-xs text-white/60">{h.note}</div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2 rounded-md border border-neon-amber/30 bg-neon-amber/5 p-2 font-mono text-[10px] text-neon-amber/90">
            <Award className="h-3.5 w-3.5" /> Despite everything, he's still our legend.
            <Star className="ml-auto h-3.5 w-3.5" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
