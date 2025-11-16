import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export function FlashcardPanel() {
  return (
    <Card className='p-4'>
      <div className='flex items-center justify-between'>
        <div>
          <div className='text-sm text-slate-400'>Flashcards Due</div>
          <div className='text-xl font-semibold'>18 cards due today</div>
        </div>
        <div className='flex items-center gap-3'>
          <div className='w-16 h-16 rounded-full bg-linear-to-r from-cyan-400 to-violet-600 flex items-center justify-center text-white'>
            78%
          </div>
          <Button>Start Review</Button>
        </div>
      </div>
    </Card>
  );
}
