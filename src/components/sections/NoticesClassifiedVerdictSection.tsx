import { motion } from 'framer-motion';
import { Megaphone, Lock, Gavel, ScrollText } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { GOVERNMENT_NOTICES, CLASSIFIED_DOCS, VERDICT, SUBJECT } from '../../content/data';

function NoticesSection() {
  return (
    <section id="notices" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        index="16"
        title="GOVERNMENT NOTICES"
        subtitle="Official advisories issued by the Friend Bureau of Investigation."
        accent="amber"
        icon={<Megaphone className="h-3.5 w-3.5" />}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {GOVERNMENT_NOTICES.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="panel relative overflow-hidden p-5"
          >
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-neon-amber/10 blur-2xl" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neon-amber/80">{n.id}</span>
              <span className="chip border-neon-red/40 text-neon-red">Official Notice</span>
            </div>
            <h3 className="mt-2 font-display text-base font-semibold text-white">{n.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{n.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ClassifiedSection() {
  return (
    <section id="classified-docs" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        index="17"
        title="CLASSIFIED DOCUMENTS"
        subtitle="Declassified for friend-eyes-only. Burn after reading (or after biryani)."
        accent="red"
        icon={<Lock className="h-3.5 w-3.5" />}
      />
      <div className="grid gap-5 md:grid-cols-3">
        {CLASSIFIED_DOCS.map((d, i) => (
          <motion.div
            key={d.code}
            initial={{ opacity: 0, rotate: i % 2 === 0 ? -2 : 2, y: 16 }}
            whileInView={{ opacity: 1, rotate: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="classified-paper relative overflow-hidden rounded-md p-5"
          >
            <div className="absolute -top-3 left-1/2 tape h-8 w-24 -translate-x-1/2" />
            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-classified-red">
              <span>{d.code}</span>
              <span className="border border-classified-red px-1.5 py-0.5">{d.classification}</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold">{d.title}</h3>
            <p className="mt-2 text-xs leading-relaxed">{d.body}</p>
            <div className="mt-3 flex items-center justify-between border-t border-black/30 pt-2 font-mono text-[9px] uppercase tracking-widest">
              <span>Filed: Friend Bureau</span>
              <span className="rotate-[-6deg] border-2 border-classified-red px-1.5 py-0.5 text-classified-red">
                {d.classification}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function VerdictSection() {
  return (
    <section id="verdict" className="relative mx-auto max-w-5xl px-6 py-24">
      <SectionHeading
        index="18"
        title="FINAL VERDICT"
        subtitle="The Bureau has deliberated. The gavel falls."
        accent="red"
        icon={<Gavel className="h-3.5 w-3.5" />}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-2xl border-2 border-neon-red/40 bg-gradient-to-b from-ink-800 to-ink-950 p-8 text-center shadow-neon-red sm:p-12"
      >
        <div className="absolute inset-0 bg-grid-cyan bg-[size:30px_30px] opacity-20" />
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-20 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-neon-red/30 blur-3xl"
        />

        <div className="relative">
          <ScrollText className="mx-auto mb-4 h-10 w-10 text-neon-red animate-flicker" />
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            {VERDICT.preamble}
          </p>

          <div className="my-6 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
            The Friend Bureau of Investigation finds
          </div>

          <motion.h3
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-2xl font-bold text-white sm:text-3xl"
          >
            {SUBJECT.name}
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="mx-auto my-6 inline-block border-4 border-neon-red px-8 py-3 font-display text-4xl font-bold text-neon-red neon-text-red sm:text-6xl"
          >
            {VERDICT.finding}
          </motion.div>

          <div className="mx-auto mt-6 max-w-md space-y-3 text-left">
            <div className="rounded-md border border-neon-amber/30 bg-neon-amber/5 p-3">
              <div className="font-mono text-[10px] uppercase tracking-widest text-neon-amber/80">Sentence</div>
              <div className="font-display text-lg font-semibold text-white">{VERDICT.sentence}</div>
            </div>
            <div className="rounded-md border border-neon-red/30 bg-neon-red/5 p-3">
              <div className="font-mono text-[10px] uppercase tracking-widest text-neon-red/80">Lifetime Punishment</div>
              <div className="font-display text-lg font-semibold text-white">{VERDICT.punishment}</div>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60">
            {VERDICT.closing}
          </p>

          <div className="mt-8 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/30">
            <Gavel className="h-3.5 w-3.5" /> Signed, sealed, and delivered by the Friend Bureau of Investigation
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export { NoticesSection, ClassifiedSection, VerdictSection };
