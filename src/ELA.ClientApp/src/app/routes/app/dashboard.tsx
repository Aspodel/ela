import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  FlashcardPanel,
  QuickActions,
  QuizSummary,
  SpeakingOrb,
  StatCards,
  SuggestedActions,
  VocabularySummary,
  WelcomeBanner,
} from '@/features/dashboard';
import { ChartsGrid } from '@/features/dashboard';

export const Route = createFileRoute('/app/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  return (
    <>
      <div className='space-y-8'>
        <WelcomeBanner name='Aspodel' />

        {/* Speaking Orb Component */}
        {/* <SpeakingOrb
          isListening={isListening}
          isSpeaking={isSpeaking}
          onToggleListening={() => setIsListening(!isListening)}
          onToggleSpeaking={() => setIsSpeaking(!isSpeaking)}
        /> */}

        <ChartsGrid />
        <StatCards />

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          <div className='lg:col-span-2 space-y-8'>
            <SuggestedActions />
            <QuickActions />
          </div>
          <div className='lg:col-span-1 space-y-4'>
            <FlashcardPanel />
            <QuizSummary />
            <VocabularySummary />
          </div>
        </div>
      </div>
    </>
  );
}
