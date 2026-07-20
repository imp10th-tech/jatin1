import { motion } from 'framer-motion';
import { User, FileText, UserCircle, MapPin, Phone, Clock } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { ABOUT, BIO, SUBJECT } from '../../content/data';
import jatinPhoto from '../../assets/jatin.jpg';

export default function AboutSection() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        index="01"
        title={ABOUT.title}
        subtitle="A behavioral dossier compiled from witness testimony, snack forensics, and 14,600 snoozed alarms."
        accent="blue"
        icon={<User className="h-3.5 w-3.5" />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 panel p-6"
        >
          <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neon-blue/70">
            <FileText className="h-3.5 w-3.5" /> {BIO.title}
          </div>
          <div className="space-y-4">
            {BIO.paragraphs.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-white/75 sm:text-base">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-6 space-y-3">
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-white/60">
                {p}
              </p>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="panel relative overflow-hidden p-6"
        >
          {/* Subject card */}
          <div className="relative mx-auto mb-4 h-44 w-36 overflow-hidden rounded-md border-2 border-white/20 bg-gradient-to-b from-ink-700 to-ink-900">
  <img
    src={jatinPhoto}
    alt="Jatin Naga Sai Bandireddi"
    className="h-full w-full object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

  <div className="absolute top-2 right-2 rotate-12 rounded border border-red-700 bg-red-600 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-wider text-white">
    WANTED
  </div>

  <div className="absolute bottom-0 left-0 right-0 bg-neon-red/80 py-0.5 text-center font-mono text-[8px] uppercase tracking-widest text-black">
    Classified
  </div>
</div>

          <dl className="space-y-2 font-mono text-xs">
            {[
              { k: 'Name', v: SUBJECT.shortName, i: <User className="h-3 w-3" /> },
              { k: 'Aliases', v: SUBJECT.aliases.join(', '), i: <UserCircle className="h-3 w-3" /> },
              { k: 'Last Seen', v: SUBJECT.lastSeen, i: <MapPin className="h-3 w-3" /> },
              { k: 'Contact', v: 'Usually on silent', i: <Phone className="h-3 w-3" /> },
              { k: 'Response Time', v: '3-5 business weeks', i: <Clock className="h-3 w-3" /> },
            ].map((row) => (
              <div key={row.k} className="flex items-start justify-between gap-3 border-b border-white/5 pb-2">
                <dt className="flex items-center gap-1.5 text-white/40">{row.i} {row.k}</dt>
                <dd className="text-right text-white/80">{row.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-4 rounded-md border border-neon-amber/30 bg-neon-amber/5 p-3 font-mono text-[10px] text-neon-amber/90">
            REWARD: {SUBJECT.reward}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
