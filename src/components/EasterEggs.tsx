import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X, Keyboard } from 'lucide-react';

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a',
];

const ACHIEVEMENTS = [
  { id: 'konami', title: 'The Konami Agent', desc: 'You entered the sacred code. Jatin is impressed (he will not reply).' },
  { id: 'ducks', title: 'Duck Whisperer', desc: 'You found a floating duck. Quack quack, agent.' },
  { id: 'verdict', title: 'Case Closed', desc: 'You reached the final verdict. Biryani is owed.' },
  { id: 'jarvis', title: 'Talked to JARVIS', desc: 'You held a conversation with the AI. It was one-sided, like talking to Jatin.' },
  { id: 'roast', title: 'Roastmaster', desc: 'You generated a roast. The Bureau approves.' },
];

export default function EasterEggs() {
  const [konami, setKonami] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [toast, setToast] = useState<{ title: string; desc: string } | null>(null);
  const [ducks, setDucks] = useState<{ id: number; x: number; y: number; vx: number; vy: number }[]>([]);
  const [showSecret, setShowSecret] = useState(false);

  const unlock = useCallback((id: string) => {
    setUnlocked((u) => {
      if (u.includes(id)) return u;
      const ach = ACHIEVEMENTS.find((a) => a.id === id);
      if (ach) {
        setToast({ title: ach.title, desc: ach.desc });
        setTimeout(() => setToast(null), 4000);
      }
      return [...u, id];
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      setKonami((k) => {
        const next = [...k, e.key].slice(-KONAMI.length);
        if (next.join(',') === KONAMI.join(',')) {
          unlock('konami');
          // confetti ducks
          setDucks((d) => [
            ...d,
            ...Array.from({ length: 12 }).map((_, i) => ({
              id: Date.now() + i,
              x: Math.random() * 100,
              y: Math.random() * 100,
              vx: (Math.random() - 0.5) * 0.4,
              vy: (Math.random() - 0.5) * 0.4,
            })),
          ]);
          return [];
        }
        return next;
      });
      if (e.key.toLowerCase() === 'j' && e.shiftKey && e.altKey) {
        setShowSecret(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [unlock]);

  useEffect(() => {
    if (ducks.length === 0) return;
    const iv = setInterval(() => {
      setDucks((arr) =>
        arr
          .map((d) => ({
            ...d,
            x: Math.max(0, Math.min(100, d.x + d.vx)),
            y: Math.max(0, Math.min(100, d.y + d.vy)),
          })),
      );
    }, 50);
    const timeout = setTimeout(() => setDucks([]), 8000);
    return () => {
      clearInterval(iv);
      clearTimeout(timeout);
    };
  }, [ducks.length]);

  // expose unlock to other components via window
  useEffect(() => {
    (window as any).__unlockEgg = unlock;
    return () => {
      delete (window as any).__unlockEgg;
    };
  }, [unlock]);

  return (
    <>
      {/* Floating ducks */}
      <AnimatePresence>
        {ducks.map((d) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="pointer-events-none fixed z-[80] text-3xl"
            style={{ left: `${d.x}%`, top: `${d.y}%` }}
          >
            🦆
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Achievement toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 40, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-[90] flex items-center gap-3 rounded-xl border border-neon-amber/40 bg-ink-900/95 p-3 shadow-neon"
          >
            <Trophy className="h-6 w-6 text-neon-amber" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-neon-amber">Achievement Unlocked</div>
              <div className="font-display text-sm font-semibold text-white">{toast.title}</div>
              <div className="text-[11px] text-white/60">{toast.desc}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret dev notes modal */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSecret(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="panel max-w-lg p-6"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neon-green/80">
                  <Keyboard className="h-3.5 w-3.5" /> Secret Developer Notes
                </div>
                <button onClick={() => setShowSecret(false)} className="rounded p-1 hover:bg-white/10">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-2 text-sm text-white/75">
                <p>// TODO: Replace photo placeholders with actual Jatin photo.</p>
                <p>// TODO: Buy biryani. Lots of it.</p>
                <p>// TODO: Tell Jatin to reply within 24 hours. (He won't.)</p>
                <p>// Note: Konami code spawns ducks. Try ↑↑↓↓←→←→ B A.</p>
                <p>// Note: Press Shift+Alt+J to open this panel again.</p>
                <p>// Achievement progress: {unlocked.length}/{ACHIEVEMENTS.length}</p>
                <p className="text-neon-green">// P.S. Anna, nuvvu legend ra. Don't ever change.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden 404 trigger — click logo 5 times */}
      <HiddenPagesLink />
    </>
  );
}

function HiddenPagesLink() {
  const [clicks, setClicks] = useState(0);
  useEffect(() => {
    if (clicks >= 5) {
      const t = setTimeout(() => setClicks(0), 1500);
      return () => clearTimeout(t);
    }
  }, [clicks]);
  return (
    <button
      onClick={() => setClicks((c) => c + 1)}
      title="..."
      className="fixed bottom-3 right-3 z-[70] hidden font-mono text-[9px] uppercase tracking-widest text-white/10 hover:text-neon-blue/60 sm:block"
    >
      [404]
    </button>
  );
}
