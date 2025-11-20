import { createFileRoute } from '@tanstack/react-router';

import {
  DemoSection,
  FeaturesSection,
  Footer,
  Header,
  HeroSection,
  PricingSection,
  TestimonialsSection,
} from '@/components/landing';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <main
      className='min-h-screen bg-gray-50 dark:bg-transparent antialiased'
      aria-live='polite'
    >
      <Header />
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </main>
  );
}
