import { ShieldAlert, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-950/80 py-12">
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <div className="tape flex w-[200%] animate-marquee py-1 font-mono text-[9px] uppercase tracking-[0.4em] text-black">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="px-3">Parody · Satire · Friend Eyes Only · Not Real · </span>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-neon-red animate-flicker" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/70">
              Friend Bureau of Investigation
            </span>
          </div>
          <div className="mx-auto max-w-3xl rounded-lg border border-neon-amber/30 bg-neon-amber/5 p-4 text-xs leading-relaxed text-white/70">
            <strong className="text-neon-amber">Disclaimer:</strong> This website is a fictional parody
            created for entertainment among friends. All complaints, investigations, achievements,
            reports, statistics, and case files are fictional and exaggerated for comedy. Nothing on
            this website should be interpreted as factual. The subject is a beloved friend, and this
            entire site is a love letter disguised as a roast. No chargers were harmed in the making
            of this site (most were returned warm).
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-white/40">
            Built with <Heart className="h-3 w-3 fill-neon-red text-neon-red" /> and a lot of biryani ·
            Case {`FBI-2026-0720-BANDIREDDI`} ·
            <span className="text-neon-blue">Classified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
