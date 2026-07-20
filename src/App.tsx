import { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SoundProvider, useSound } from './components/SoundManager';
import BootScreen from './components/BootScreen';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/sections/AboutSection';
import DashboardSection from './components/sections/DashboardSection';
import ComplaintDatabaseSection from './components/sections/ComplaintDatabaseSection';
import CommunityBoardSection from './components/sections/CommunityBoardSection';
import { ROASTS } from './content/data';

const ThreeBackground = lazy(() => import('./components/ThreeBackground'));
const CaseFilesSection = lazy(() => import('./components/sections/CaseFilesSection'));
const WantedSection = lazy(() => import('./components/sections/WantedSection'));
const TimelineSection = lazy(() => import('./components/sections/TimelineSection'));
const WitnessReportsSection = lazy(() => import('./components/sections/WitnessReportsSection'));
const JarvisSection = lazy(() => import('./components/sections/JarvisSection'));
const GeneratorsSection = lazy(() => import('./components/sections/GeneratorsSection'));
const StatsSection = lazy(() => import('./components/sections/StatsSection'));
const Footer = lazy(() => import('./components/Footer'));
const EasterEggs = lazy(() => import('./components/EasterEggs'));
const HiddenPages = lazy(() => import('./components/HiddenPages'));
import { MemeGallery, ResumeSection, AchievementsSection } from './components/sections/MemeResumeAchievementsSection';
import { NoticesSection, ClassifiedSection, VerdictSection } from './components/sections/NoticesClassifiedVerdictSection';

function RoastToast({ roast, onClose }: { roast: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: 40, x: '-50%' }}
      className="fixed bottom-6 left-1/2 z-[95] max-w-md rounded-xl border border-neon-red/40 bg-ink-900/95 p-4 text-center shadow-neon-red"
    >
      <div className="font-mono text-[10px] uppercase tracking-widest text-neon-red/80">Random Roast</div>
      <p className="mt-1 text-sm text-white/90">"{roast}"</p>
    </motion.div>
  );
}

function Shell() {
  const [booted, setBooted] = useState(false);
  const [roast, setRoast] = useState<string | null>(null);
  const { beep } = useSound();

  function onRoast() {
    const r = ROASTS[Math.floor(Math.random() * ROASTS.length)];
    setRoast(r);
    beep(660, 0.1);
    const ach = (window as any).__unlockEgg;
    if (ach) ach('roast');
  }

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink-950 text-white">
      <AnimatePresence>
        {!booted && <BootScreen onDone={() => setBooted(true)} />}
      </AnimatePresence>

      {booted && (
        <>
          <Suspense fallback={null}>
            <ThreeBackground />
          </Suspense>
          <ParticleBackground />
          <CustomCursor />
          <Navbar />
          <main className="relative z-10">
            <Hero onRoast={onRoast} />
            <AboutSection />
            <DashboardSection />
            <ComplaintDatabaseSection />
            <CommunityBoardSection />
            <Suspense fallback={null}>
              <CaseFilesSection />
              <WantedSection />
              <TimelineSection />
              <WitnessReportsSection />
              <JarvisSection onMount={() => {
                const ach = (window as any).__unlockEgg;
                if (ach) ach('jarvis');
              }} />
              <GeneratorsSection />
              <StatsSection />
              <MemeGallery />
              <ResumeSection />
              <AchievementsSection />
              <NoticesSection />
              <ClassifiedSection />
              <VerdictSection />
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
            <EasterEggs />
            <HiddenPages />
          </Suspense>
          <AnimatePresence>
            {roast && <RoastToast roast={roast} onClose={() => setRoast(null)} />}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <SoundProvider>
      <Shell />
    </SoundProvider>
  );
}
