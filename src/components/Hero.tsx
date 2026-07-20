import { motion } from 'framer-motion';
import { Siren, FolderOpen, Laugh, ShieldAlert, Fingerprint, AlertTriangle } from 'lucide-react';
import { SUBJECT } from '../content/data';
import { useSound } from './SoundManager';

export default function Hero({ onRoast }: { onRoast: () => void }) {
  const { beep } = useSound();
  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-24">
      {/* Warning tape */}
      <div className="absolute top-20 left-0 w-full overflow-hidden">
        <div className="tape flex w-[200%] animate-marquee py-1.5 font-mono text-[10px] uppercase tracking-[0.4em] text-black">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="px-4">
              Classified · Do Not Distribute · Friend Eyes Only · Case {SUBJECT.caseId} ·
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-neon-red/40 bg-neon-red/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-neon-red"
        >
          <ShieldAlert className="h-3.5 w-3.5 animate-flicker" />
          {SUBJECT.classification}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-neon-blue/70"
        >
          The Official Investigation Files Of
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl md:text-7xl"
        >
          <span className="bg-gradient-to-r from-neon-blue via-white to-neon-purple bg-clip-text text-transparent">
            JATIN NAGA SAI
          </span>
          <br />
          <span className="bg-gradient-to-r from-neon-red via-neon-amber to-neon-red bg-clip-text text-transparent neon-text-red">
            BANDIREDDI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 max-w-2xl text-base text-white/70 sm:text-lg"
        >
          "Documenting one legend, one questionable decision at a time."
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#complaints" onMouseEnter={() => beep()} className="btn-neon-red">
            <Siren className="h-4 w-4" /> View Complaint Records
          </a>
          <a href="#case-files" onMouseEnter={() => beep()} className="btn-neon">
            <FolderOpen className="h-4 w-4" /> Open Classified Files
          </a>
          <button onClick={onRoast} onMouseEnter={() => beep()} className="btn-neon border-neon-purple/40 text-neon-purple bg-neon-purple/5 hover:bg-neon-purple/15">
            <Laugh className="h-4 w-4" /> Generate Random Roast
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {[
            { label: 'Case ID', value: SUBJECT.caseId, icon: <FolderOpen className="h-3.5 w-3.5" /> },
            { label: 'Threat Level', value: SUBJECT.threatLevel, icon: <AlertTriangle className="h-3.5 w-3.5" /> },
            { label: 'Last Seen', value: SUBJECT.lastSeen, icon: <Fingerprint className="h-3.5 w-3.5" /> },
            { label: 'Status', value: 'AT LARGE', icon: <ShieldAlert className="h-3.5 w-3.5" /> },
          ].map((c) => (
            <div key={c.label} className="panel p-3 text-left">
              <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-neon-blue/60">
                {c.icon} {c.label}
              </div>
              <div className="mt-1 font-mono text-xs text-white/90">{c.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Floating documents */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          {[
            { l: '8%', t: '30%', r: -12, d: 0 },
            { l: '82%', t: '22%', r: 14, d: 0.5 },
            { l: '15%', t: '70%', r: 8, d: 1 },
            { l: '88%', t: '65%', r: -10, d: 1.5 },
          ].map((p, i) => (
            <motion.div
              key={i}
              className="absolute h-24 w-20"
              style={{ left: p.l, top: p.t, rotate: `${p.r}deg` }}
              animate={{ y: [0, -14, 0], rotate: [p.r, p.r + 3, p.r] }}
              transition={{ duration: 6 + i, repeat: Infinity, delay: p.d }}
            >
              <div className="classified-paper h-full w-full rounded-sm p-2 font-mono text-[7px] leading-tight">
                <div className="font-bold">CLASSIFIED</div>
                <div className="mt-1 opacity-70">CASE FILE</div>
                <div className="mt-1 opacity-50">████████</div>
                <div className="opacity-50">██████</div>
                <div className="mt-1 border-t border-black/30 pt-1">FBI · 2026</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-white/40"
      >
        ▼ Scroll to declassify
      </motion.div>
    </section>
  );
}
