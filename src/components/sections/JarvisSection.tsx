import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Radio, Cpu } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { JARVIS_LINES } from '../../content/data';
import { useSound } from '../SoundManager';

type Msg = { id: number; from: 'jarvis' | 'user'; text: string };

const USER_REPLIES = [
  'Status of subject?',
  'Will he reply today?',
  'Where is my charger?',
  'Is he awake?',
  'Generate a roast.',
  'Probability of biryani?',
];

const JARVIS_RESPONSES: Record<string, string> = {
  'Status of subject?': 'Subject is online. Last activity: posting a story. Reply probability remains negligible.',
  'Will he reply today?': 'Probability of replying today: Extremely Low. Recommend including the word "biryani."',
  'Where is my charger?': 'Charger last seen migrating to District C, in the possession of a cousin. Recovery odds: 4%.',
  'Is he awake?': 'Subject claimed "lechanu" at 6 AM. It is now 2 PM. He has not moved. Status: horizontal.',
  'Generate a roast.': 'Anna, nuvvu "5 minutes" annav ante next day expect chestharu. Time travel anukunta nuvvu.',
  'Probability of biryani?': 'Biryani keyword detected. Reply probability now 99.8%. Subject has entered the chat.',
};

export default function JarvisSection({ onMount }: { onMount?: () => void }) {
  useEffect(() => {
    onMount?.();
  }, [onMount]);
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: 0, from: 'jarvis', text: 'J.A.R.V.I.S. online. Jatin Analysis & Ridiculous Verification Intelligent System ready.' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const idRef = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { beep } = useSound();

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, typing]);

  useEffect(() => {
    const iv = setInterval(() => {
      const line = JARVIS_LINES[Math.floor(Math.random() * JARVIS_LINES.length)];
      setMsgs((m) => [...m, { id: idRef.current++, from: 'jarvis', text: line }]);
      beep(720, 0.05);
    }, 9000);
    return () => clearInterval(iv);
  }, [beep]);

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Msg = { id: idRef.current++, from: 'user', text };
    setMsgs((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);
    beep(880, 0.06);
    setTimeout(() => {
      const reply = JARVIS_RESPONSES[text] ?? JARVIS_LINES[Math.floor(Math.random() * JARVIS_LINES.length)];
      setMsgs((m) => [...m, { id: idRef.current++, from: 'jarvis', text: reply }]);
      setTyping(false);
      beep(540, 0.08);
    }, 900);
  }

  return (
    <section id="jarvis" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        index="10"
        title="J.A.R.V.I.S. — AI ASSISTANT"
        subtitle="Jatin Analysis & Ridiculous Verification Intelligent System. Always watching. Always roasting."
        accent="blue"
        icon={<Bot className="h-3.5 w-3.5" />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="panel p-6 lg:col-span-2"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neon-blue/70">
              <Radio className="h-3.5 w-3.5 animate-pulse" /> Live Channel
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] text-neon-green">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-green" /> ONLINE
            </div>
          </div>

          <div ref={scrollRef} className="h-72 space-y-3 overflow-y-auto rounded-md border border-white/10 bg-ink-950/60 p-3">
            <AnimatePresence initial={false}>
              {msgs.map((m) => (
                <motion.div
                  key={m.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      m.from === 'user'
                        ? 'bg-neon-blue/15 text-neon-blue'
                        : 'bg-white/5 text-white/85'
                    }`}
                  >
                    {m.from === 'jarvis' && (
                      <div className="mb-0.5 font-mono text-[9px] uppercase tracking-widest text-neon-purple/70">
                        JARVIS
                      </div>
                    )}
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="rounded-lg bg-white/5 px-3 py-2">
                    <span className="inline-flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-neon-blue"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="mt-3 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask JARVIS..."
              className="flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-2 font-mono text-sm text-white placeholder:text-white/30 focus:border-neon-blue/60 focus:outline-none"
            />
            <button type="submit" className="btn-neon">
              <Send className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-3 flex flex-wrap gap-2">
            {USER_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="chip border-white/15 text-white/60 hover:border-neon-blue/40 hover:text-neon-blue"
              >
                {q}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="panel flex flex-col items-center justify-center p-6 text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="relative h-40 w-40"
          >
            <div className="absolute inset-0 rounded-full border-2 border-neon-blue/30" />
            <div className="absolute inset-3 rounded-full border border-neon-purple/30" />
            <div className="absolute inset-6 rounded-full border border-neon-red/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Cpu className="h-12 w-12 text-neon-blue neon-text" />
            </div>
          </motion.div>
          <div className="mt-4 font-display text-lg font-bold text-white">J.A.R.V.I.S.</div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Jatin Analysis & Ridiculous Verification Intelligent System
          </div>
          <div className="mt-3 rounded-md border border-neon-blue/30 bg-neon-blue/5 p-2 font-mono text-[10px] text-neon-blue/90">
            "Agent, I am detecting another "5 minutes" claim. Brace for geological time."
          </div>
        </motion.div>
      </div>
    </section>
  );
}
