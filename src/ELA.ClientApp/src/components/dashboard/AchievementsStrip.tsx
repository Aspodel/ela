import React from 'react';
import { Card } from '../ui/card';

export function AchievementsStrip() {
  const badges = ['14-day streak', '500 words', 'Level 3'];
  return (
    <Card className='p-4'>
      <div className='flex items-center gap-3 overflow-x-auto'>
        {badges.map((b) => (
          <div
            key={b}
            className='px-4 py-2 bg-linear-to-r from-cyan-400 to-violet-600 text-white rounded-lg whitespace-nowrap'
          >
            {b}
          </div>
        ))}
      </div>
    </Card>
  );
}
