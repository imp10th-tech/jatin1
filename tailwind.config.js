/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#03040a',
          900: '#060814',
          800: '#0a0e1f',
          700: '#11162b',
          600: '#1a2040',
        },
        neon: {
          blue: '#00e5ff',
          cyan: '#22d3ee',
          red: '#ff2d55',
          purple: '#a855f7',
          green: '#22ff88',
          amber: '#ffb020',
        },
        classified: {
          paper: '#f3ecc8',
          ink: '#1a1407',
          red: '#b00',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 20px rgba(0,229,255,0.35), 0 0 60px rgba(168,85,247,0.18)',
        'neon-red': '0 0 20px rgba(255,45,85,0.45), 0 0 60px rgba(255,45,85,0.18)',
        glass: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.45)',
      },
      backgroundImage: {
        'grid-cyan':
          'linear-gradient(rgba(0,229,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.06) 1px, transparent 1px)',
        'scanline':
          'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '45%': { opacity: '0.86' },
          '50%': { opacity: '0.6' },
          '55%': { opacity: '0.9' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,45,85,0.5)' },
          '50%': { boxShadow: '0 0 0 18px rgba(255,45,85,0)' },
        },
      },
      animation: {
        flicker: 'flicker 4s infinite',
        scan: 'scan 6s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        spinSlow: 'spinSlow 18s linear infinite',
        pulseGlow: 'pulseGlow 2.4s ease-out infinite',
      },
    },
  },
  plugins: [],
};
