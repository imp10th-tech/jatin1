import { motion } from 'framer-motion';
import { Image, FileText, Trophy, Mail, Phone, MapPin, Briefcase, GraduationCap, Quote } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { MEME_GALLERY, FAKE_RESUME, ACHIEVEMENTS, BADGES } from '../../content/data';

function MemeCard({ caption, tag, i }: { caption: string; tag: string; i: number }) {
  const gradients = [
    'from-neon-blue/20 to-neon-purple/20',
    'from-neon-red/20 to-neon-amber/20',
    'from-neon-purple/20 to-neon-blue/20',
    'from-neon-amber/20 to-neon-red/20',
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.04 }}
      className={`panel relative overflow-hidden p-4 bg-gradient-to-br ${gradients[i % gradients.length]}`}
    >
      <div className="mb-3 flex h-40 items-center justify-center rounded-md border border-white/10 bg-ink-950/60 p-3 text-center">
        {/* TODO: Replace with actual meme image */}
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          [ Meme Placeholder ]
        </span>
      </div>
      <p className="text-sm font-medium leading-snug text-white/90">{caption}</p>
      <div className="mt-2">
        <span className="chip border-neon-red/40 text-neon-red">#{tag}</span>
      </div>
    </motion.div>
  );
}

function MemeGallery() {
  return (
    <section id="memes" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        index="13"
        title="MEME GALLERY"
        subtitle="Certified content farmed by the Bureau's elite meme unit."
        accent="purple"
        icon={<Image className="h-3.5 w-3.5" />}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MEME_GALLERY.map((m, i) => (
          <MemeCard key={i} {...m} i={i} />
        ))}
      </div>
    </section>
  );
}

function ResumeSection() {
  return (
    <section id="resume" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        index="14"
        title="FAKE RESUME"
        subtitle="A professional summary of the subject's most questionable qualifications."
        accent="amber"
        icon={<FileText className="h-3.5 w-3.5" />}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="panel p-6 lg:p-8"
      >
        <div className="border-b border-white/10 pb-4">
          <h3 className="font-display text-2xl font-bold text-white">{FAKE_RESUME.name}</h3>
          <p className="text-sm text-neon-blue">{FAKE_RESUME.title}</p>
          <div className="mt-2 flex flex-wrap gap-4 font-mono text-[11px] text-white/50">
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {FAKE_RESUME.contact}</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-neon-amber/70">Objective</div>
          <p className="mt-1 text-sm leading-relaxed text-white/75">{FAKE_RESUME.objective}</p>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neon-amber/70">
            <Briefcase className="h-3.5 w-3.5" /> Experience
          </div>
          <div className="space-y-4">
            {FAKE_RESUME.experience.map((x) => (
              <div key={x.role} className="border-l-2 border-neon-amber/40 pl-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-display text-base font-semibold text-white">{x.role}</h4>
                  <span className="font-mono text-[10px] text-white/40">{x.period}</span>
                </div>
                <div className="font-mono text-[11px] text-neon-blue/80">{x.org}</div>
                <ul className="mt-1 list-disc pl-5 text-sm text-white/70">
                  {x.points.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neon-amber/70">Skills</div>
            <div className="flex flex-wrap gap-1.5">
              {FAKE_RESUME.skills.map((s) => (
                <span key={s} className="chip border-neon-blue/40 text-neon-blue">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-neon-amber/70">
              <GraduationCap className="h-3.5 w-3.5" /> Education
            </div>
            {FAKE_RESUME.education.map((e) => (
              <div key={e.degree} className="border-l-2 border-neon-amber/40 pl-4">
                <div className="font-display text-base font-semibold text-white">{e.degree}</div>
                <div className="font-mono text-[11px] text-neon-blue/80">{e.org} · {e.period}</div>
                <div className="text-xs text-white/60">{e.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-md border border-neon-red/30 bg-neon-red/5 p-3 font-mono text-[11px] text-neon-red/90">
          References: {FAKE_RESUME.references}
        </div>
      </motion.div>
    </section>
  );
}

function AchievementsSection() {
  return (
    <section id="achievements" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        index="15"
        title="ACHIEVEMENTS & BADGES"
        subtitle="Unlocked through years of dedication to the craft of being Jatin."
        accent="green"
        icon={<Trophy className="h-3.5 w-3.5" />}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ scale: 1.04, rotate: 1 }}
            className="panel relative flex flex-col items-center p-5 text-center"
          >
            <div className="mb-2 text-4xl">{a.icon}</div>
            <div className="font-display text-sm font-semibold text-white">{a.name}</div>
            <div className="mt-1 text-[11px] leading-relaxed text-white/60">{a.desc}</div>
            <div className="absolute right-2 top-2 rotate-[8deg]">
              <span className="stamp border-neon-amber/60 text-neon-amber text-[7px] bg-ink-950/60">UNLOCKED</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neon-amber/70">
          <Trophy className="h-3.5 w-3.5" /> Official Bureau Badges
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BADGES.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="panel flex items-start gap-3 p-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-neon-amber/50 bg-neon-amber/10">
                <Trophy className="h-6 w-6 text-neon-amber" />
              </div>
              <div>
                <div className="font-display text-sm font-semibold text-white">{b.name}</div>
                <div className="text-[11px] leading-relaxed text-white/60">{b.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { MemeGallery, ResumeSection, AchievementsSection };
