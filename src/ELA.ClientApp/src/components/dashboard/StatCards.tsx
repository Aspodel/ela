import React from 'react';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';

const stats = [
  { id: 'words', title: 'Total Words Learned', value: '1,420', change: '+6%' },
  { id: 'flash', title: 'Flashcard Completion', value: '78%', change: '+4%' },
  { id: 'streak', title: 'Study Streak', value: '14 days', change: '+2 days' },
  { id: 'ai', title: 'Last AI Assessment', value: '87 / 100', change: '' },
  { id: 'minutes', title: 'Weekly Minutes', value: '225 min', change: '+7%' },
];

export function StatCards() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6'>
      {stats.map((s) => (
        <Card key={s.id} className='p-4'>
          <div className='flex items-start justify-between'>
            <div>
              <div className='text-xs text-slate-400'>{s.title}</div>
              <div className='mt-1 text-xl font-semibold'>{s.value}</div>
            </div>
            <div className='text-sm text-green-500'>{s.change}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
