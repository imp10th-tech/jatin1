import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setHidden(true);
      return;
    }
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let active = false;

    const HOVER_SEL = 'a, button, [data-cursor="hover"], input, textarea, select';
    const applyHover = (el: HTMLElement) => {
      const hovering = !!el.closest(HOVER_SEL);
      const ring = ringRef.current;
      if (!ring) return;
      ring.style.borderColor = hovering ? 'rgba(255,45,85,0.9)' : 'rgba(0,229,255,0.6)';
      ring.style.boxShadow = hovering
        ? '0 0 20px rgba(255,45,85,0.6)'
        : '0 0 16px rgba(0,229,255,0.4)';
      ring.style.width = hovering ? '44px' : '36px';
      ring.style.height = hovering ? '44px' : '36px';
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      }
      applyHover(e.target as HTMLElement);
      if (!active) {
        active = true;
        raf = requestAnimationFrame(loop);
      }
    };
    const loop = () => {
      const dx = mx - rx;
      const dy = my - ry;
      rx += dx * 0.18;
      ry += dy * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      }
      // stop the loop when the ring has caught up (idle)
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        active = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-neon-blue"
        style={{ boxShadow: '0 0 10px rgba(0,229,255,0.9)' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-9 w-9 rounded-full border"
        style={{
          borderColor: 'rgba(0,229,255,0.6)',
          boxShadow: '0 0 16px rgba(0,229,255,0.4)',
          width: '36px',
          height: '36px',
        }}
      />
    </>
  );
}
