import { useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { Hero } from './components/Hero';
import { DealCollection } from './components/DealCollection';
import { SmartComparison } from './components/SmartComparison';
import { RealTimeBenefits } from './components/RealTimeBenefits';
import { PersonalizedRecommendations } from './components/PersonalizedRecommendations';
import { Footer } from './components/Footer';
import { lightTheme } from '@/styles/theme';
import { useAtomValue } from 'jotai';
import { themeAtom } from '@/store/theme';

export default function IntroPage() {
  const theme = useAtomValue(themeAtom);
  const latestThemeRef = useRef(theme);
  const previousThemeRef = useRef<string | null>(null);

  useEffect(() => {
    latestThemeRef.current = theme;

    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    previousThemeRef.current = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', 'light');

    return () => {
      const restoreTheme = latestThemeRef.current ?? previousThemeRef.current ?? 'light';
      document.documentElement.setAttribute('data-theme', restoreTheme);
    };
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <main className="min-h-screen w-full overflow-x-hidden">
        <Hero />
        <DealCollection />
        <SmartComparison />
        <RealTimeBenefits />
        <PersonalizedRecommendations />
        <Footer />
      </main>
    </ThemeProvider>
  );
}
