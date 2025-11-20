import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';
import React from 'react';

export function PricingSection() {
  const scrollToSection = React.useCallback((id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section id='pricing' className='pb-24'>
      <div className='max-w-4xl mx-auto px-6 text-center bg-linear-to-r from-indigo-600 to-violet-600 rounded-3xl text-white py-12 shadow-lg'>
        <h3 className='text-2xl font-bold'>
          Learn languages your way — start seeing results faster
        </h3>
        <p className='mt-2 text-indigo-100 tracking-wide'>
          Free to use &nbsp;•&nbsp; No subscription required &nbsp;•&nbsp;
          Privacy guaranteed
        </p>
        <div className='mt-6 flex justify-center gap-3'>
          <Button
            size='lg'
            className='bg-white text-indigo-600 text-md rounded-full hover:bg-white hover:scale-[.99] px-6 py-3 h-full'
            aria-label='Sign Up Now - Start free trial'
            asChild
          >
            <Link to='/signup'> Start Learning Your Way!</Link>
          </Button>

          <Button
            size='lg'
            variant='link'
            className='bg-transparent text-white text-md border border-white rounded-full px-6 py-3 h-full hover:scale-[.99] hover:no-underline'
            aria-label='Explore the App'
            onClick={() => scrollToSection('demo')}
          >
            Explore the App
          </Button>
        </div>
      </div>
    </section>
  );
}
