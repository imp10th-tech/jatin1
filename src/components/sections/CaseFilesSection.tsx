import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderLock, ChevronRight, FileText, X } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { CASE_FILES } from '../../content/data';

export default function CaseFilesSection() {
  const [open, setOpen] = useState<number | null>(null);
  const active = open !== null ? CASE_FILES[open] : null;

  return (
    <section id="case-files" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        index="05"
        title="GOVERNMENT CASE FILES"
        subtitle="Six sealed investigations, declassified for friend-eyes-only review."
        accent="amber"
        icon={<FolderLock className="h-3.5 w-3.5" />}
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CASE_FILES.map((c, i) => (
          <motion.button
            key={c.caseNo}
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-5 text-left transition-all hover:border-neon-amber/40 hover:shadow-neon"
          >
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-neon-amber/10 blur-2xl transition-all group-hover:bg-neon-amber/20" />
            <div className="font-mono text-[10px] uppercase tracking-widest text-neon-amber/70">
              {c.caseNo} · {c.date}
            </div>
            <h3 className="mt-2 flex items-center gap-2 font-display text-lg font-semibold text-white">
              <FileText className="h-4 w-4 text-neon-amber" /> {c.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/60">{c.summary}</p>
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
              <span className="text-neon-red/80">Severity: {c.severity}</span>
              <span className="flex items-center gap-1 text-neon-blue/70 group-hover:text-neon-blue">
                Open File <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
              Status: {c.status}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.92, rotate: -1, y: 20 }}
              animate={{ scale: 1, rotate: 0, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="classified-paper relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-md p-6"
            >
              <div className="absolute -top-3 left-6 tape h-8 w-24 rotate-[-3deg]" />
              <div className="absolute -top-3 right-6 tape h-8 w-24 rotate-[3deg]" />
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-classified-red">
                  CASE FILE · {active.caseNo}
                </span>
                <button onClick={() => setOpen(null)} className="rounded p-1 hover:bg-black/10">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <h3 className="font-display text-2xl font-bold">{active.title}</h3>
              <div className="mt-2 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest">
                <span className="border border-classified-red px-2 py-0.5 text-classified-red">
                  Severity: {active.severity}
                </span>
                <span className="border border-black/40 px-2 py-0.5">Filed: {active.date}</span>
                <span className="border border-black/40 px-2 py-0.5">{active.status}</span>
              </div>
              <div className="mt-4 border-y-2 border-classified-red/40 py-2 text-center font-mono text-xs uppercase tracking-[0.4em] text-classified-red">
                Investigation Summary
              </div>
              <p className="mt-3 text-sm leading-relaxed">{active.summary}</p>
              <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-classified-red">
                Evidence Collected
              </div>
              <ul className="mt-1 list-disc pl-5 text-sm">
                {active.evidence.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
              <div className="mt-5 flex items-center justify-between border-t border-black/30 pt-3 font-mono text-[10px] uppercase tracking-widest">
                <span>Filed by: Friend Bureau of Investigation</span>
                <span className="rotate-[-6deg] border-2 border-classified-red px-2 py-0.5 text-classified-red">
                  CLASSIFIED
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
