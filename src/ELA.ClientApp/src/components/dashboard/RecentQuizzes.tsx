import React from 'react';
import { Card } from '../ui/card';

const quizzes = [
  {
    id: 1,
    date: 'Nov 15',
    title: 'Travel Vocabulary',
    score: 82,
    time: '12m',
    feedback: 'Confused with synonyms; review collocations.',
  },
  {
    id: 2,
    date: 'Nov 13',
    title: 'Listening Short Dialogues',
    score: 70,
    time: '18m',
    feedback: 'Work on reduced forms.',
  },
];

export function RecentQuizzes() {
  return (
    <Card className='p-4'>
      <div className='flex items-center justify-between mb-3'>
        <h4 className='text-md font-medium'>Recent Quizzes</h4>
        <a className='text-sm text-slate-500 hover:underline' href='#'>
          See all
        </a>
      </div>
      <div className='space-y-3'>
        {quizzes.map((q) => (
          <div key={q.id} className='flex items-center justify-between'>
            <div>
              <div className='font-medium'>
                {q.title}{' '}
                <span className='text-xs text-slate-400'>• {q.date}</span>
              </div>
              <div className='text-xs text-slate-500'>{q.feedback}</div>
            </div>
            <div className='text-sm text-slate-600'>
              {q.score}% • {q.time}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
