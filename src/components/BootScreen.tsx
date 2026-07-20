import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, ShieldAlert, Terminal, ScanLine } from 'lucide-react';
import { BOOT_SEQUENCE } from '../content/data';
import { useSound } from './SoundManager';

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [showFinger, setShowFinger] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const { beep, alarm, stopAlarm, enabled } = useSound();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_SEQUENCE.length) {
        setLines((l) => [...l, BOOT_SEQUENCE[i]]);
        if (enabled) beep(660 + i * 40, 0.06);
        i++;
      } else {
        clearInterval(interval);
        setShowFinger(true);
      }
    }, 420);
    return () => clearInterval(interval);
  }, [enabled, beep]);

  useEffect(() => {
    setProgress(Math.min(100, (lines.length / BOOT_SEQUENCE.length) * 70));
  }, [lines]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    if (!showFinger) return;
    let p = 0;
    const iv = setInterval(() => {
      p += 4;
      setScanProgress(p);
      if (enabled && p % 12 === 0) beep(1200, 0.03, 'square');
      if (p >= 100) {
        clearInterval(iv);
        setAccessGranted(true);
        if (enabled) {
          beep(880, 0.1);
          setTimeout(() => beep(1320, 0.18), 120);
        }
        setTimeout(onDone, 1100);
      }
    }, 60);
    return () => clearInterval(iv);
  }, [showFinger, onDone, enabled, beep]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 bg-grid-cyan bg-[size:40px_40px] opacity-30" />
      <div className="absolute inset-0 bg-scanline opacity-20" />
      <motion.div
        className="absolute top-0 left-0 h-0.5 w-full bg-neon-blue/60"
        animate={{ y: ['0vh', '100vh'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative z-10 w-full max-w-3xl px-6">
        <div className="mb-6 flex items-center justify-center gap-3">
          <ShieldAlert className="h-8 w-8 text-neon-red animate-flicker" />
          <h1 className="font-mono text-xl sm:text-2xl uppercase tracking-[0.3em] text-neon-red neon-text-red">
            Friend Bureau of Investigation
          </h1>
        </div>

        <div className="panel relative overflow-hidden p-4 sm:p-6 scanlines">
          <div className="mb-3 flex items-center gap-2 text-neon-blue/80">
            <Terminal className="h-4 w-4" />
            <span className="font-mono text-xs uppercase tracking-widest">secure_terminal://fbi-boot</span>
            <span className="ml-auto flex gap-1">
              <span className="h-2 w-2 rounded-full bg-neon-red animate-pulse" />
              <span className="h-2 w-2 rounded-full bg-neon-amber" />
              <span className="h-2 w-2 rounded-full bg-neon-green" />
            </span>
          </div>

          <div
            ref={scrollRef}
            className="h-44 overflow-y-auto font-mono text-xs sm:text-sm text-emerald-300/90"
          >
            {lines.map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-2"
              >
                <span className="text-neon-blue/60">{'>'}</span>
                <span>{l}</span>
              </motion.div>
            ))}
            {!showFinger && (
              <span className="ml-3 inline-block h-3 w-2 animate-pulse bg-emerald-300/80 align-middle" />
            )}
          </div>

          <div className="mt-4">
            <div className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-widest text-neon-blue/70">
              <span>System Boot</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <AnimatePresence>
            {showFinger && !accessGranted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-5 flex flex-col items-center gap-3"
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-neon-amber/80">
                  Biometric Verification Required
                </div>
                <div className="relative h-28 w-28">
                  <div className="absolute inset-0 rounded-full border border-neon-blue/30" />
                  <div className="absolute inset-2 rounded-full border border-neon-blue/20" />
                  <Fingerprint className="absolute inset-0 m-auto h-16 w-16 text-neon-blue/70" />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-neon-blue"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.2, 0.6] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                  <ScanLine
                    className="absolute left-0 h-1 w-full text-neon-blue"
                    style={{ top: `${scanProgress}%` }}
                  />
                </div>
                <div className="font-mono text-xs text-neon-blue/80">Scanning... {scanProgress}%</div>
              </motion.div>
            )}

            {accessGranted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 flex flex-col items-center gap-2"
              >
                <div className="stamp border-neon-green text-neon-green text-lg">ACCESS GRANTED</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-neon-green/70">
                  Welcome, Agent. Files are now declassified.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-red" />
          Warning sirens {enabled ? 'ARMED' : 'disarmed'} — toggle sound in the top-right after entry
          <button
            onClick={() => (alarm ? alarm() : null)}
            className="ml-2 rounded border border-neon-red/40 px-2 py-0.5 text-neon-red/80 hover:bg-neon-red/10"
          >
            TEST SIREN
          </button>
          <button
            onClick={() => stopAlarm()}
            className="rounded border border-white/20 px-2 py-0.5 text-white/60 hover:bg-white/10"
          >
            STOP
          </button>
        </div>
      </div>
    </motion.div>
  );
}
