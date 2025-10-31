import { ThemeProvider } from 'styled-components';
import { Hero } from './components/Hero';
import { DealCollection } from './components/DealCollection';
import { SmartComparison } from './components/SmartComparison';
import { RealTimeBenefits } from './components/RealTimeBenefits';
import { PersonalizedRecommendations } from './components/PersonalizedRecommendations';
import { Footer } from './components/Footer';
import { lightTheme } from '@/styles/theme';

export default function IntroPage() {
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
