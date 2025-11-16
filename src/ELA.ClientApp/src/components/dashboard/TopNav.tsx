import React from 'react';
import { Button } from '../ui/button';
import { Avatar } from '../ui/avatar';
import { Badge } from '../ui/badge';

export function TopNav() {
  return (
    <header className='flex items-center justify-between py-4 px-6 bg-transparent sticky top-0 z-30'>
      <div className='flex items-center gap-4'>
        <a className='flex items-center gap-2' href='/'>
          <div className='w-9 h-9 rounded-lg bg-linear-to-r from-cyan-400 to-violet-600 flex items-center justify-center text-white font-semibold'>
            ELA
          </div>
          <span className='text-lg font-semibold'>English Learning App</span>
        </a>
        <nav className='hidden md:flex items-center gap-3 text-sm text-slate-600'>
          <a
            className='px-3 py-2 rounded-md hover:bg-slate-100'
            href='/app/dashboard'
          >
            Dashboard
          </a>
          <a
            className='px-3 py-2 rounded-md hover:bg-slate-100'
            href='/app/vocabulary'
          >
            Vocabulary
          </a>
          <a
            className='px-3 py-2 rounded-md hover:bg-slate-100'
            href='/app/flashcards'
          >
            Flashcards
          </a>
          <a
            className='px-3 py-2 rounded-md hover:bg-slate-100'
            href='/app/quizzes'
          >
            Quizzes
          </a>
          <a className='px-3 py-2 rounded-md hover:bg-slate-100' href='/app/ai'>
            AI Feedback
          </a>
        </nav>
      </div>

      <div className='flex items-center gap-4'>
        <button
          aria-label='Search'
          className='hidden sm:inline-flex px-3 py-2 rounded-md bg-slate-50'
        >
          Search
        </button>
        <button
          aria-label='Notifications'
          className='px-3 py-2 rounded-md hover:bg-slate-100'
        >
          <span className='sr-only'>Notifications</span>
          🔔
          <Badge className='ml-2'>3</Badge>
        </button>
        <Button variant='ghost' size='sm'>
          +
        </Button>
        <div className='flex items-center gap-2'>
          <Avatar className='w-9 h-9' />
          <div className='hidden sm:block text-sm'>
            <div className='font-medium'>Jane Cooper</div>
            <div className='text-xs text-slate-400'>Student</div>
          </div>
        </div>
      </div>
    </header>
  );
}
