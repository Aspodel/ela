import { createFileRoute } from '@tanstack/react-router';
import { StatCards } from '@/components/dashboard/StatCards';
// import { ChartsGrid } from '@/components/dashboard/ChartsGrid';
import { RecommendationsCarousel } from '@/components/dashboard/RecommendationsCarousel';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { VocabularySummary } from '@/components/dashboard/VocabularySummary';
import { FlashcardPanel } from '@/components/dashboard/FlashcardPanel';
import { RecentQuizzes } from '@/components/dashboard/RecentQuizzes';
import { AchievementsStrip } from '@/components/dashboard/AchievementsStrip';
import { WelcomeBanner } from '@/features/dashboard';
import { ChartsGrid } from '@/features/dashboard';

export const Route = createFileRoute('/app/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <WelcomeBanner name='Jane' />

      <main>
        <StatCards />
        <ChartsGrid />

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6'>
          <div className='lg:col-span-2'>
            <RecommendationsCarousel />
            <QuickActions />
          </div>
          <div className='lg:col-span-1 space-y-4'>
            <VocabularySummary />
            <FlashcardPanel />
            <RecentQuizzes />
          </div>
        </div>

        <AchievementsStrip />
      </main>
    </>
  );
}
