import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Search, AlertTriangle, FileWarning } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { CASE_FILES } from '../../content/data';

const FUNNY_COMPLAINTS = [
  {
    caseNo: 'FBI-CC-001',
    title: 'Says "5 minutes" while still at home',
    severity: 'Critical',
    victims: 14,
    status: 'Under Investigation',
    date: '2025-02-14',
    detail:
      'Subject repeatedly deploys the phrase "5 minutes lo vastha" while physically located in bed, wearing pajamas, with no shoes on. Bureau analysts confirm this is not a measurement of time but a state of mind.',
  },
  {
    caseNo: 'FBI-CC-002',
    title: 'Borrows chargers forever',
    severity: 'High',
    victims: 9,
    status: 'Cold Case',
    date: '2024-11-03',
    detail:
      'Chargers borrowed by the subject enter a one-way portal. Returned chargers are warm, slow, and confused. One charger was last seen in a different city, in the possession of a cousin. The Bureau has stopped asking.',
  },
  {
    caseNo: 'FBI-CC-003',
    title: 'Eats everyone\'s snacks',
    severity: 'High',
    victims: 21,
    status: 'Pending Investigation',
    date: '2025-06-09',
    detail:
      'Aloo Bhujia, Kurkure, biscuits — nothing is safe. Subject claims "nenu em tinalenu" while actively chewing. Snack forensics have confirmed a 92% correlation between subject presence and snack absence.',
  },
  {
    caseNo: 'FBI-CC-004',
    title: '"One Last Match" lasts 3 hours',
    severity: 'Critical',
    victims: 6,
    status: 'Ongoing',
    date: '2025-07-19',
    detail:
      'The phrase "ok, ok, last match" has been reclassified as a Class-A deception. Average match session length: 4 hours 43 minutes. Subject\'s sleep schedule is now considered an endangered species.',
  },
  {
    caseNo: 'FBI-CC-005',
    title: 'Leaves messages on read',
    severity: 'Catastrophic',
    victims: 47,
    status: 'Active',
    date: '2025-07-20',
    detail:
      'Blue ticks observed. Reply not forthcoming. Subject was simultaneously posting on his story. The Bureau has ruled "I didn\'t see it" as statistically impossible.',
  },
  {
    caseNo: 'FBI-CC-006',
    title: 'Disappears during group projects',
    severity: 'High',
    victims: 5,
    status: 'Reopened',
    date: '2024-09-21',
    detail:
      'Subject was assigned the conclusion section. Subject went offline for 6 days. Subject returned and asked "em cheyali?" Subject still believes he contributed. He did not.',
  },
  {
    caseNo: 'FBI-CC-007',
    title: 'Professional procrastinator',
    severity: 'Medium',
    victims: 3,
    status: 'Chronic',
    date: '2025-01-12',
    detail:
      'Subject has elevated procrastination to an art form. Tasks scheduled for "tomorrow" have been rescheduled for tomorrow for 47 consecutive days. Tomorrow, allegedly, never comes.',
  },
];

const SEV_COLOR: Record<string, string> = {
  Low: 'text-neon-green border-neon-green/40',
  Medium: 'text-neon-amber border-neon-amber/40',
  High: 'text-neon-red border-neon-red/40',
  Critical: 'text-neon-red border-neon-red/60 bg-neon-red/10',
  Catastrophic: 'text-white border-neon-red bg-neon-red/30 animate-pulse',
};

export default function ComplaintDatabaseSection() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<(typeof FUNNY_COMPLAINTS)[number] | null>(null);

  const filtered = FUNNY_COMPLAINTS.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.caseNo.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section id="complaints" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        index="03"
        title="GOVERNMENT COMPLAINT DATABASE"
        subtitle="Officially filed complaints against the subject. All fictional. All too real."
        accent="red"
        icon={<Database className="h-3.5 w-3.5" />}
      />

      <div className="mb-6 flex items-center gap-2">
        <div className="panel flex flex-1 items-center gap-2 px-3 py-2">
          <Search className="h-4 w-4 text-neon-blue/60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search case number or complaint..."
            className="w-full bg-transparent font-mono text-sm text-white placeholder:text-white/30 focus:outline-none"
          />
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          {filtered.length} records
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((c, i) => (
          <motion.button
            key={c.caseNo}
            onClick={() => setSelected(c)}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="panel group p-4 text-left transition-all hover:border-neon-red/40 hover:shadow-neon-red"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-neon-blue/60">
                  {c.caseNo} · Filed {c.date}
                </div>
                <h3 className="mt-1 font-display text-base font-semibold text-white group-hover:text-neon-red">
                  {c.title}
                </h3>
              </div>
              <span className={`chip ${SEV_COLOR[c.severity]}`}>{c.severity}</span>
            </div>
            <div className="mt-3 flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-white/50">
              <span className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> Victims: {c.victims}
              </span>
              <span className="flex items-center gap-1">
                <FileWarning className="h-3 w-3" /> {c.status}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="panel max-w-lg p-6"
            >
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neon-red/80">
                {selected.caseNo} · {selected.date}
              </div>
              <h3 className="font-display text-xl font-bold text-white">{selected.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className={`chip ${SEV_COLOR[selected.severity]}`}>Severity: {selected.severity}</span>
                <span className="chip border-white/20 text-white/70">Victims: {selected.victims}</span>
                <span className="chip border-neon-amber/40 text-neon-amber">{selected.status}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/75">{selected.detail}</p>
              <div className="mt-5 flex justify-end">
                <button onClick={() => setSelected(null)} className="btn-neon">
                  Close File
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
