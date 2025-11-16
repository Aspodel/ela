import React from 'react';
import { Button } from '../ui/button';

const actions = [
  { id: 'add', title: 'Add Vocabulary', icon: '➕' },
  { id: 'flash', title: 'Start Flashcards', icon: '🃏' },
  { id: 'quiz', title: 'Take a Quiz', icon: '📝' },
  { id: 'gen', title: 'Generate AI Set', icon: '🤖' },
  { id: 'mock', title: 'Start Mock Test', icon: '🎯' },
];

export function QuickActions() {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6'>
      {actions.map((a) => (
        <button
          key={a.id}
          className='rounded-lg bg-white p-3 shadow-sm flex flex-col items-center gap-2 hover:scale-102 transition-transform'
        >
          <div className='text-2xl'>{a.icon}</div>
          <div className='text-xs font-medium'>{a.title}</div>
        </button>
      ))}
    </div>
  );
}
