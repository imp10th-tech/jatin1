import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Skull, Search } from 'lucide-react';

const PAGES: Record<string, { title: string; body: string; tag: string }> = {
  '/classified': {
    title: 'CLASSIFIED EYES ONLY',
    body:
      'You found the classified page. The Bureau is impressed. Unfortunately, the contents of this page have been redacted by Jatin himself, who claims he "didn\'t see" the request to declassify them.',
    tag: 'EYES ONLY',
  },
  '/evidence': {
    title: 'EVIDENCE LOCKER',
    body:
      'Evidence locker opened. Contents: 38 warm chargers, 212 empty snack packets, 1,247 unread messages, and a single Mirinda-stained fingerprint. All evidence points to one suspect. He says "theekhanga istha."',
    tag: 'EVIDENCE',
  },
  '/wanted': {
    title: 'WANTED: SUBJECT AT LARGE',
    body:
      'Subject remains at large. Last seen online, posting a story, ignoring your DM. Reward: one unlimited biryani buffet for information leading to a reply within 24 hours. Approach with biryani, not with messages.',
    tag: 'WANTED',
  },
  '/top-secret': {
    title: 'TOP SECRET // FRIEND EYES ONLY',
    body:
      'You have accessed the top-secret page. The Bureau thanks you. The top-secret information is: Jatin is, despite everything, a genuinely good friend. He will show up late, but he will show up. Eventually. With biryani. Probably.',
    tag: 'TOP SECRET',
  },
  '/criminal-record': {
    title: 'CRIMINAL RECORD',
    body:
      'Criminal record retrieved. Charges: 1,247 counts of message abandonment, 38 counts of charger theft, 212 counts of snack liberation, 14,600 counts of alarm snoozing, and 1 count of being a legend. Verdict: guilty of being iconic.',
    tag: 'RECORD',
  },
  '/404': {
    title: '404 · SUBJECT NOT FOUND',
    body:
      'Error 404: Jatin not found. He was last seen "on the way" 3 hours ago. If found, please return to: the group chat, where he is admin but has not posted since the previous government. Reward: a warm charger.',
    tag: '404',
  },
};

export default function HiddenPages() {
  const [route, setRoute] = useState<string | null>(null);

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash;
      if (h && PAGES[h.replace('#', '')]) {
        setRoute(h.replace('#', ''));
      } else if (h === '#/404') {
        setRoute('/404');
      }
    };
    onHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (route) {
      const ach = (window as any).__unlockEgg;
      if (ach) ach('verdict');
    }
  }, [route]);

  const page = route ? PAGES[route] : null;

  return (
    <AnimatePresence>
      {page && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setRoute(null);
            history.replaceState(null, '', ' ');
          }}
        >
          <motion.div
            initial={{ scale: 0.9, rotate: -1, y: 20 }}
            animate={{ scale: 1, rotate: 0, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="classified-paper relative max-w-lg p-6"
          >
            <div className="absolute -top-3 left-1/2 tape h-8 w-32 -translate-x-1/2" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-classified-red">
                {route} · {page.tag}
              </span>
              <button
                onClick={() => {
                  setRoute(null);
                  history.replaceState(null, '', ' ');
                }}
                className="rounded p-1 hover:bg-black/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <h3 className="mt-3 flex items-center gap-2 font-display text-2xl font-bold">
              {route === '/404' ? <Search className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
              {page.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed">{page.body}</p>
            <div className="mt-4 flex items-center justify-between border-t border-black/30 pt-3 font-mono text-[10px] uppercase tracking-widest">
              <span>Friend Bureau of Investigation</span>
              <span className="rotate-[-6deg] border-2 border-classified-red px-2 py-0.5 text-classified-red">
                {page.tag}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
