import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquarePlus, ThumbsUp, Angry, Laugh, Flame, Loader2, Send, ShieldCheck } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { supabase, type Complaint } from '../../lib/supabase';
import { SEVERITIES } from '../../content/data';
import { useSound } from '../SoundManager';

const BAD_WORDS = ['fuck', 'shit', 'bitch', 'asshole', 'dick', 'pussy', 'cunt', 'rape', 'slut', 'whore'];
const PII_PATTERNS = [/\b\d{10}\b/, /\b[\w.+-]+@[\w-]+\.[\w.-]+\b/, /\b\d{12}\b/];

function moderate(text: string): { ok: boolean; reason?: string; cleaned: string } {
  const lower = text.toLowerCase();
  for (const w of BAD_WORDS) {
    if (lower.includes(w)) {
      return { ok: false, reason: 'Inappropriate language detected. Keep it wholesome roast only.', cleaned: text };
    }
  }
  for (const p of PII_PATTERNS) {
    if (p.test(text)) {
      return { ok: false, reason: 'Personal information detected. Please remove phone numbers, emails, and IDs.', cleaned: text };
    }
  }
  return { ok: true, cleaned: text };
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

const SEV_COLOR: Record<string, string> = {
  Low: 'border-neon-green/40 text-neon-green',
  Medium: 'border-neon-amber/40 text-neon-amber',
  High: 'border-neon-red/40 text-neon-red',
  Critical: 'border-neon-red/60 text-white bg-neon-red/20',
  Catastrophic: 'border-neon-red text-white bg-neon-red/40 animate-pulse',
};

const REACTIONS = [
  { key: 'laugh', icon: Laugh, color: 'text-neon-amber' },
  { key: 'angry', icon: Angry, color: 'text-neon-red' },
  { key: 'agree', icon: ThumbsUp, color: 'text-neon-blue' },
  { key: 'flame', icon: Flame, color: 'text-neon-purple' },
];

export default function CommunityBoardSection() {
  const [items, setItems] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [severity, setSeverity] = useState('Medium');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { beep } = useSound();

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from('complaints')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    if (!error && data) setItems(data as Complaint[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (text.trim().length < 5) {
      setError('Complaint must be at least 5 characters. Channel your inner roast properly.');
      return;
    }
    const mod = moderate(text);
    if (!mod.ok) {
      setError(mod.reason ?? 'Submission rejected by moderation.');
      return;
    }
    const nameMod = name.trim() ? moderate(name) : { ok: true, cleaned: '' };
    if (!nameMod.ok) {
      setError('Display name rejected by moderation.');
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from('complaints').insert({
      display_name: nameMod.cleaned.trim() || null,
      complaint: mod.cleaned.trim(),
      severity,
      reactions: {},
      status: 'Pending Investigation',
    });
    setSubmitting(false);
    if (error) {
      setError('Network error filing complaint. The Bureau is on break. Try again.');
      return;
    }
    setText('');
    setName('');
    setSeverity('Medium');
    setSuccess('Complaint filed. Subject has been notified (he will not read it).');
    beep(880, 0.1);
    load();
  }

  async function react(item: Complaint, key: string) {
    const next = { ...item.reactions, [key]: (item.reactions[key] ?? 0) + 1 };
    setItems((arr) => arr.map((x) => (x.id === item.id ? { ...x, reactions: next } : x)));
    beep(660 + Math.random() * 200, 0.05);
    await supabase.from('complaints').update({ reactions: next }).eq('id', item.id);
  }

  return (
    <section id="board" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        index="04"
        title="COMMUNITY COMPLAINT BOARD"
        subtitle="File your own (fictional, wholesome) complaint against the subject. Live feed, moderated for love and laughs."
        accent="purple"
        icon={<MessageSquarePlus className="h-3.5 w-3.5" />}
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <motion.form
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={submit}
          className="panel p-6 lg:col-span-2"
        >
          <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neon-blue/70">
            <ShieldCheck className="h-3.5 w-3.5" /> File a New Complaint
          </div>

          <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-white/40">
            Display Name (optional)
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            placeholder="Anonymous Agent"
            className="mb-3 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 font-mono text-sm text-white placeholder:text-white/30 focus:border-neon-blue/60 focus:outline-none"
          />

          <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-white/40">
            Funny Complaint
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={240}
            rows={3}
            placeholder="Anna nuvvu '5 minutes' annav ante next day expect chestharu..."
            className="mb-3 w-full resize-none rounded-md border border-white/10 bg-white/5 px-3 py-2 font-mono text-sm text-white placeholder:text-white/30 focus:border-neon-blue/60 focus:outline-none"
          />
          <div className="mb-3 text-right font-mono text-[10px] text-white/30">{text.length}/240</div>

          <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-white/40">
            Severity
          </label>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {SEVERITIES.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setSeverity(s)}
                className={`chip transition-all ${
                  severity === s ? SEV_COLOR[s] : 'border-white/15 text-white/50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3 rounded-md border border-neon-red/40 bg-neon-red/10 p-2 font-mono text-[11px] text-neon-red"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3 rounded-md border border-neon-green/40 bg-neon-green/10 p-2 font-mono text-[11px] text-neon-green"
              >
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          <button type="submit" disabled={submitting} className="btn-neon w-full disabled:opacity-50">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Submit Complaint
          </button>
          <p className="mt-3 font-mono text-[10px] leading-relaxed text-white/30">
            Moderation: no offensive language, no personal info (phone, email, IDs). Keep the roast wholesome.
          </p>
        </motion.form>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="panel flex h-64 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-neon-blue" />
            </div>
          ) : (
            <div className="space-y-3">
              {items.length === 0 && (
                <div className="panel p-6 text-center font-mono text-sm text-white/50">
                  No complaints filed yet. Be the first to roast Jatin officially.
                </div>
              )}
              <AnimatePresence initial={false}>
                {items.map((c) => (
                  <motion.div
                    key={c.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="panel relative p-4"
                  >
                    <div className="absolute -right-2 -top-2 rotate-[-8deg]">
                      <span className="stamp border-neon-red/60 text-neon-red bg-ink-950/60 text-[8px]">
                        Pending Investigation
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-neon-blue/60">
                        {c.display_name ?? 'Anonymous Agent'} · {timeAgo(c.created_at)}
                      </div>
                      <span className={`chip ${SEV_COLOR[c.severity] ?? 'border-white/20 text-white/60'}`}>
                        {c.severity}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/85">{c.complaint}</p>
                    <div className="mt-3 flex items-center gap-2">
                      {REACTIONS.map((r) => {
                        const Icon = r.icon;
                        const count = c.reactions[r.key] ?? 0;
                        return (
                          <button
                            key={r.key}
                            onClick={() => react(c, r.key)}
                            className="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-white/60 transition-all hover:border-neon-blue/40 hover:text-white"
                          >
                            <Icon className={`h-3 w-3 ${r.color}`} /> {count}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
