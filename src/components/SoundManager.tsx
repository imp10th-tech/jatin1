import { createContext, useContext, useEffect, useRef, useState } from 'react';

type SoundCtx = {
  enabled: boolean;
  toggle: () => void;
  beep: (freq?: number, dur?: number, type?: OscillatorType) => void;
  alarm: () => void;
  stopAlarm: () => void;
};

const Ctx = createContext<SoundCtx | null>(null);

export function useSound() {
  const c = useContext(Ctx);
  if (!c) throw new Error('SoundManager missing');
  return c;
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const alarmRef = useRef<{ osc: OscillatorNode; gain: GainNode } | null>(null);

  useEffect(() => {
    const onFirst = () => {
      if (!audioRef.current) {
        audioRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    window.addEventListener('pointerdown', onFirst, { once: true });
    return () => window.removeEventListener('pointerdown', onFirst);
  }, []);

  const beep: SoundCtx['beep'] = (freq = 660, dur = 0.08, type = 'square') => {
    if (!enabled) return;
    const ac = audioRef.current;
    if (!ac) return;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = 0.0001;
    osc.connect(gain).connect(ac.destination);
    const t = ac.currentTime;
    gain.gain.exponentialRampToValueAtTime(0.06, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  };

  const alarm = () => {
    if (!enabled) return;
    const ac = audioRef.current;
    if (!ac || alarmRef.current) return;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 440;
    gain.gain.value = 0.04;
    osc.connect(gain).connect(ac.destination);
    osc.start();
    let toggle = false;
    const iv = setInterval(() => {
      osc.frequency.value = toggle ? 440 : 220;
      toggle = !toggle;
    }, 350);
    alarmRef.current = { osc, gain };
    (alarmRef.current as any).iv = iv;
  };

  const stopAlarm = () => {
    if (alarmRef.current) {
      const { osc } = alarmRef.current;
      const iv = (alarmRef.current as any).iv as number;
      if (iv) clearInterval(iv);
      try { osc.stop(); } catch {}
      alarmRef.current = null;
    }
  };

  const toggle = () => {
    setEnabled((e) => {
      const next = !e;
      if (next) beep(880, 0.12);
      else stopAlarm();
      return next;
    });
  };

  return (
    <Ctx.Provider value={{ enabled, toggle, beep, alarm, stopAlarm }}>{children}</Ctx.Provider>
  );
}
