import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, Lightbulb, ScanLine, Sparkles, Disc3, Gamepad2, Star, Gauge, Dices, RotateCw,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { ROASTS, EXCUSES, FUTURE_PREDICTIONS, LIE_DETECTOR_QUESTIONS } from '../../content/data';
import { useSound } from '../SoundManager';

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function Panel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="panel flex flex-col p-5"
    >
      <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neon-blue/70">
        {icon} {title}
      </div>
      {children}
    </motion.div>
  );
}

function RoastGenerator() {
  const [roast, setRoast] = useState(ROASTS[0]);
  const { beep } = useSound();
  return (
    <Panel title="Random Roast Generator" icon={<Flame className="h-3.5 w-3.5" />}>
      <AnimatePresence mode="wait">
        <motion.p
          key={roast}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex-1 text-sm leading-relaxed text-white/85"
        >
          "{roast}"
        </motion.p>
      </AnimatePresence>
      <button
        onClick={() => {
          setRoast(pick(ROASTS));
          beep(660, 0.08);
        }}
        className="btn-neon-red mt-4 self-start"
      >
        <Flame className="h-4 w-4" /> Roast Him Again
      </button>
    </Panel>
  );
}

function ExcuseGenerator() {
  const [excuse, setExcuse] = useState(EXCUSES[0]);
  const { beep } = useSound();
  return (
    <Panel title="Excuse Generator" icon={<Lightbulb className="h-3.5 w-3.5" />}>
      <AnimatePresence mode="wait">
        <motion.p
          key={excuse}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex-1 text-sm leading-relaxed text-neon-amber"
        >
          "{excuse}"
        </motion.p>
      </AnimatePresence>
      <button
        onClick={() => {
          setExcuse(pick(EXCUSES));
          beep(540, 0.08);
        }}
        className="btn-neon mt-4 self-start"
      >
        <Dices className="h-4 w-4" /> New Excuse
      </button>
    </Panel>
  );
}

function LieDetector() {
  const [q, setQ] = useState(LIE_DETECTOR_QUESTIONS[0]);
  const [result, setResult] = useState<'idle' | 'scanning' | 'lie' | 'truth'>('idle');
  const { beep } = useSound();
  function run() {
    setResult('scanning');
    beep(440, 0.05);
    setTimeout(() => {
      const r = Math.random() > 0.2 ? 'lie' : 'truth';
      setResult(r as any);
      beep(r === 'lie' ? 220 : 880, 0.2);
    }, 1600);
  }
  return (
    <Panel title="Lie Detector" icon={<ScanLine className="h-3.5 w-3.5" />}>
      <div className="mb-3 rounded-md border border-white/10 bg-white/5 p-3">
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">Question</div>
        <div className="mt-1 text-sm text-white/85">{q}</div>
      </div>
      <div className="flex flex-wrap gap-2">
        {LIE_DETECTOR_QUESTIONS.slice(0, 4).map((qq) => (
          <button
            key={qq}
            onClick={() => {
              setQ(qq);
              setResult('idle');
            }}
            className="chip border-white/15 text-white/60 hover:border-neon-red/40 hover:text-neon-red"
          >
            {qq.length > 24 ? qq.slice(0, 24) + '…' : qq}
          </button>
        ))}
      </div>
      <div className="mt-3 flex h-16 items-center justify-center rounded-md border border-white/10 bg-ink-950/60">
        {result === 'idle' && <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Awaiting scan</span>}
        {result === 'scanning' && (
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neon-blue">
            <ScanLine className="h-4 w-4 animate-pulse" /> Scanning...
          </span>
        )}
        {result === 'lie' && (
          <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="font-display text-xl font-bold text-neon-red neon-text-red">
            LIE DETECTED
          </motion.span>
        )}
        {result === 'truth' && (
          <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="font-display text-xl font-bold text-neon-green">
            TRUTH (rare)
          </motion.span>
        )}
      </div>
      <button onClick={run} disabled={result === 'scanning'} className="btn-neon-red mt-3 self-start disabled:opacity-50">
        <ScanLine className="h-4 w-4" /> Run Polygraph
      </button>
    </Panel>
  );
}

function FuturePredictor() {
  const [pred, setPred] = useState(FUTURE_PREDICTIONS[0]);
  const { beep } = useSound();
  return (
    <Panel title="Future Predictor" icon={<Sparkles className="h-3.5 w-3.5" />}>
      <AnimatePresence mode="wait">
        <motion.p
          key={pred}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex-1 text-sm leading-relaxed text-neon-purple"
        >
          {pred}
        </motion.p>
      </AnimatePresence>
      <button
        onClick={() => {
          setPred(pick(FUTURE_PREDICTIONS));
          beep(720, 0.08);
        }}
        className="btn-neon mt-4 self-start border-neon-purple/40 text-neon-purple bg-neon-purple/5 hover:bg-neon-purple/15"
      >
        <Sparkles className="h-4 w-4" /> Predict Again
      </button>
    </Panel>
  );
}

function ExcuseWheel() {
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [landed, setLanded] = useState<string | null>(null);
  const { beep } = useSound();
  const slice = 360 / EXCUSES.length;

  function spin() {
    setSpinning(true);
    setLanded(null);
    const turns = 5 + Math.floor(Math.random() * 4);
    const target = angle + turns * 360 + Math.floor(Math.random() * 360);
    setAngle(target);
    beep(660, 0.1);
    setTimeout(() => {
      const norm = ((target % 360) + 360) % 360;
      const idx = Math.floor(((360 - norm) % 360) / slice) % EXCUSES.length;
      setLanded(EXCUSES[idx]);
      setSpinning(false);
      beep(880, 0.15);
    }, 4200);
  }

  return (
    <Panel title="Spin the Excuse Wheel" icon={<Disc3 className="h-3.5 w-3.5" />}>
      <div className="relative mx-auto my-2 h-44 w-44">
        <div className="absolute left-1/2 top-[-6px] z-10 -translate-x-1/2 text-neon-red">
          <div className="h-0 w-0 border-x-8 border-t-[14px] border-x-transparent border-t-neon-red drop-shadow-[0_0_6px_rgba(255,45,85,0.8)]" />
        </div>
        <motion.div
          animate={{ rotate: angle }}
          transition={{ duration: 4, ease: [0.2, 0.8, 0.2, 1] }}
          className="h-full w-full rounded-full border-2 border-neon-blue/40"
          style={{
            background: `conic-gradient(${EXCUSES.slice(0, 8).map((_, i) => {
              const c = ['#00e5ff', '#a855f7', '#ff2d55', '#22ff88', '#ffb020', '#22d3ee', '#ff6ad5', '#7c5cff'][i % 8];
              return `${c} ${(i * slice)}deg ${((i + 1) * slice)}deg`;
            }).join(', ')})`,
          }}
        >
          {EXCUSES.slice(0, 8).map((e, i) => {
            const a = (i * slice + slice / 2) * (Math.PI / 180);
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 origin-left font-mono text-[7px] uppercase text-black/80"
                style={{ transform: `rotate(${i * slice + slice / 2}deg) translateX(40px)` }}
              >
                {e.split(' ')[0]}
              </div>
            );
          })}
        </motion.div>
      </div>
      <AnimatePresence>
        {landed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 rounded-md border border-neon-amber/30 bg-neon-amber/5 p-2 text-center font-mono text-[11px] text-neon-amber"
          >
            Landed on: "{landed}"
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={spin} disabled={spinning} className="btn-neon mt-3 self-start disabled:opacity-50">
        <RotateCw className={`h-4 w-4 ${spinning ? 'animate-spin' : ''}`} /> Spin
      </button>
    </Panel>
  );
}

function CatchJatinGame() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(15);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<number | null>(null);
  const { beep } = useSound();

  function start() {
    setScore(0);
    setTime(15);
    setRunning(true);
    beep(880, 0.1);
    timerRef.current = window.setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          setRunning(false);
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function move() {
    setPos({ x: Math.random() * 80 + 10, y: Math.random() * 70 + 15 });
  }

  function catchHim() {
    if (!running) return;
    setScore((s) => s + 1);
    move();
    beep(990, 0.05);
  }

  return (
    <Panel title="Catch Jatin Game" icon={<Gamepad2 className="h-3.5 w-3.5" />}>
      <div className="relative h-44 w-full overflow-hidden rounded-md border border-white/10 bg-grid-cyan bg-[size:20px_20px]">
        {running && (
          <button
            onMouseEnter={move}
            onClick={catchHim}
            className="absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-neon-red bg-neon-red/20 text-2xl transition-all"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            😴
          </button>
        )}
        {!running && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            {time === 0 && (
              <div className="font-display text-lg font-bold text-neon-blue">
                Caught him {score} times! He still won't reply.
              </div>
            )}
            <button onClick={start} className="btn-neon">
              <Gamepad2 className="h-4 w-4" /> {time === 0 ? 'Play Again' : 'Start'}
            </button>
          </div>
        )}
      </div>
      <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-widest text-white/50">
        <span>Score: <span className="text-neon-blue">{score}</span></span>
        <span>Time: <span className="text-neon-red">{time}s</span></span>
      </div>
      <p className="mt-2 text-xs text-white/40">Hover over Jatin to "catch" him. He will dodge like he dodges your calls.</p>
    </Panel>
  );
}

function RateJatin() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const { beep } = useSound();
  return (
    <Panel title="Rate Jatin" icon={<Star className="h-3.5 w-3.5" />}>
      <div className="flex justify-center gap-2 py-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => {
              setRating(n);
              beep(660 + n * 80, 0.08);
            }}
            className="transition-transform hover:scale-125"
          >
            <Star
              className={`h-8 w-8 ${
                (hover || rating) >= n ? 'fill-neon-amber text-neon-amber' : 'text-white/20'
              }`}
            />
          </button>
        ))}
      </div>
      <div className="text-center font-mono text-xs text-white/60">
        {rating === 0 && 'Click a star to rate (results may be ignored by subject).'}
        {rating === 1 && '1 star — "Phone silent lo undhi."'}
        {rating === 2 && '2 stars — "5 minutes lo vastha."'}
        {rating === 3 && '3 stars — "Just now chusanu bro."'}
        {rating === 4 && '4 stars — "One last match and I will reply."'}
        {rating === 5 && '5 stars — Biryani summon successful. He has arrived.'}
      </div>
    </Panel>
  );
}

function RoastMeter() {
  const [level, setLevel] = useState(50);
  const { beep } = useSound();
  const labels = ['Mild Teasing', 'Friendly Roast', 'Spicy Roast', 'Nuclear Roast', 'Biryani-Level Roast'];
  const idx = Math.min(4, Math.floor(level / 20));
  return (
    <Panel title="Roast Meter" icon={<Gauge className="h-3.5 w-3.5" />}>
      <div className="flex-1">
        <div className="mb-2 text-center font-display text-2xl font-bold text-neon-red neon-text-red">
          {labels[idx]}
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          onMouseUp={() => beep(440 + level * 5, 0.1)}
          className="w-full accent-neon-red"
        />
        <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-white/40">
          <span>Mild</span>
          <span>Nuclear</span>
        </div>
      </div>
    </Panel>
  );
}

export default function GeneratorsSection() {
  return (
    <section id="generators" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        index="11"
        title="INTERACTIVE ROAST TOOLS"
        subtitle="Eight tools to scientifically analyze, roast, and predict the subject."
        accent="red"
        icon={<Flame className="h-3.5 w-3.5" />}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RoastGenerator />
        <ExcuseGenerator />
        <LieDetector />
        <FuturePredictor />
        <ExcuseWheel />
        <CatchJatinGame />
        <RateJatin />
        <RoastMeter />
        <Panel title="Find the Missing Charger" icon={<Sparkles className="h-3.5 w-3.5" />}>
          <p className="flex-1 text-sm text-white/75">
            Three boxes. One contains your charger. The other two contain excuses. Choose wisely — Jatin is watching.
          </p>
          <ChargerGame />
        </Panel>
      </div>
    </section>
  );
}

function ChargerGame() {
  const [boxes, setBoxes] = useState(['?', '?', '?']);
  const [msg, setMsg] = useState('Pick a box.');
  const { beep } = useSound();
  function reset() {
    setBoxes(['?', '?', '?']);
    setMsg('Pick a box.');
  }
  function pick(i: number) {
    const win = Math.floor(Math.random() * 3);
    if (i === win) {
      setBoxes((b) => b.map((v, j) => (j === i ? '🔌' : v)));
      setMsg('You found it! But it is warm. And in a different city now.');
      beep(880, 0.15);
    } else {
      setBoxes((b) => b.map((v, j) => (j === i ? '📵' : v)));
      setMsg("Wrong box. Jatin says 'theekhanga istha.'");
      beep(220, 0.15);
    }
    setTimeout(reset, 2200);
  }
  return (
    <>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {boxes.map((b, i) => (
          <button
            key={i}
            onClick={() => pick(i)}
            className="flex h-16 items-center justify-center rounded-md border border-neon-blue/30 bg-neon-blue/5 text-2xl transition-all hover:border-neon-blue/60 hover:bg-neon-blue/15"
          >
            {b}
          </button>
        ))}
      </div>
      <div className="mt-2 text-center font-mono text-[11px] text-white/60">{msg}</div>
    </>
  );
}
