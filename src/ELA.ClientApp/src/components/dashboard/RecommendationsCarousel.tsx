import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

const recs = [
  {
    id: 1,
    title: 'Travel Vocabulary',
    reason: 'Missed 60% last quiz',
    time: '15 min',
  },
  {
    id: 2,
    title: 'Short Listening Drills',
    reason: 'Listening trend down',
    time: '10 min',
  },
  {
    id: 3,
    title: 'Mock Test: 12 words',
    reason: 'Prepare for next level',
    time: '12 min',
  },
];

export function RecommendationsCarousel() {
  return (
    <div className='mb-6'>
      <div className='flex items-center justify-between mb-3'>
        <h3 className='text-lg font-medium'>Personalized AI Recommendations</h3>
        <a className='text-sm text-slate-500 hover:underline' href='#'>
          See all
        </a>
      </div>
      <div className='flex gap-4 overflow-x-auto pb-2'>
        {recs.map((r) => (
          <Card key={r.id} className='min-w-[220px] p-4'>
            <div className='text-sm font-semibold'>{r.title}</div>
            <div className='text-xs text-slate-500 mt-1'>{r.reason}</div>
            <div className='mt-3 flex items-center justify-between'>
              <div className='text-xs text-slate-400'>{r.time}</div>
              <Button size='sm'>Start</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
