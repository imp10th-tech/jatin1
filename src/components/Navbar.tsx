import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Volume2, VolumeX, Siren, Menu, X } from 'lucide-react';
import { useSound } from './SoundManager';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#dashboard', label: 'Dashboard' },
  { href: '#complaints', label: 'Complaints' },
  { href: '#case-files', label: 'Case Files' },
  { href: '#wanted', label: 'Wanted' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#witness', label: 'Witnesses' },
  { href: '#reports', label: 'Reports' },
  { href: '#jarvis', label: 'JARVIS' },
  { href: '#generators', label: 'Generators' },
  { href: '#stats', label: 'Stats' },
  { href: '#resume', label: 'Resume' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#notices', label: 'Notices' },
  { href: '#classified', label: 'Classified' },
  { href: '#verdict', label: 'Verdict' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [siren, setSiren] = useState(false);
  const { enabled, toggle, alarm, stopAlarm } = useSound();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (siren) alarm();
    else stopAlarm();
  }, [siren, alarm, stopAlarm]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-ink-950/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <ShieldAlert className="h-6 w-6 text-neon-red animate-flicker" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/80 sm:text-sm">
            F.B.I. <span className="text-neon-red">/</span> Bandireddi Files
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.slice(0, 8).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/60 transition-colors hover:bg-white/10 hover:text-neon-blue"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSiren((s) => !s)}
            className={`rounded-md border p-2 transition-all ${
              siren
                ? 'border-neon-red bg-neon-red/20 text-neon-red animate-pulseGlow'
                : 'border-white/15 text-white/60 hover:text-neon-red'
            }`}
            aria-label="Toggle warning siren"
            title={siren ? 'Siren ON — evacuate ears' : 'Toggle warning siren'}
          >
            <Siren className="h-4 w-4" />
          </button>
          <button
            onClick={toggle}
            className="rounded-md border border-white/15 p-2 text-white/60 transition-colors hover:text-neon-blue"
            aria-label="Toggle sound"
            title={enabled ? 'Sound ON' : 'Sound OFF'}
          >
            {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-md border border-white/15 p-2 text-white/70 lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-ink-950/95 backdrop-blur-xl lg:hidden"
          >
            <div className="grid grid-cols-2 gap-1 p-4 sm:grid-cols-3">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-white/70 hover:bg-white/10 hover:text-neon-blue"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
