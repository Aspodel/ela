import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function HeroSection() {
  const scrollToSection = React.useCallback((id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section
      id='hero'
      className='bg-white dark:bg-card min-h-[calc(100vh-65px)] flex items-center scroll-mt-20'
    >
      <div className='max-w-7xl mx-auto px-6 py-16 lg:py-24 w-full'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
          <div className='lg:col-span-6'>
            <Badge className='bg-indigo-50 text-indigo-600 text-sm px-3 py-1'>
              New • AI-powered
            </Badge>
            <h1 className='mt-6 text-4xl sm:text-5xl font-extrabold leading-tight'>
              Learn Languages Your Way — With Guidance from AI
            </h1>
            <p className='mt-4 text-lg text-muted-foreground'>
              Personalized vocabulary, smart flashcards, and adaptive quizzes
              that turn daily practice into lasting progress.
            </p>

            <div className='mt-8 flex flex-col sm:flex-row gap-3'>
              <Button
                size='lg'
                className='bg-linear-to-r from-indigo-500 to-violet-500 text-md rounded-full shadow-lg hover:scale-[.995] px-6 py-3 h-full'
                aria-label='Sign Up Now - Start free trial'
                onClick={() => scrollToSection('pricing')}
              >
                Sign Up Now
              </Button>

              <Button
                size='lg'
                variant='outline'
                className='text-md rounded-full px-6 py-3 h-full'
                aria-label='Explore the App'
                onClick={() => scrollToSection('demo')}
              >
                Explore the App
              </Button>
            </div>

            <p className='mt-4 text-sm text-muted-foreground'>
              Get started for free — no credit card required.
            </p>
          </div>

          <div className='lg:col-span-6'>
            <div className='relative'>
              <div className='w-full h-72 sm:h-96 rounded-2xl bg-linear-to-tr from-indigo-100 via-pink-100 to-violet-100 border-2 border-white shadow-lg flex items-center justify-center'>
                {/* Simple mockup placeholder */}
                <div className='w-64 sm:w-72 md:w-80 bg-white rounded-xl shadow-md p-4'>
                  <div className='h-10 flex items-center justify-between'>
                    <div className='w-28 h-8 bg-slate-100 rounded-full' />
                    <div className='w-10 h-4 bg-slate-200 rounded' />
                  </div>
                  <div className='mt-3'>
                    <div className='h-36 bg-linear-to-b from-slate-50 to-white rounded-lg border border-slate-200 p-3'>
                      <div className='flex items-center justify-between'>
                        <div>
                          <p className='text-xs text-slate-400'>Vocabulary</p>
                          <h3 className='mt-1 font-semibold dark:text-background'>
                            Travel — Spain
                          </h3>
                        </div>
                        <div className='text-xs text-slate-500'>274</div>
                      </div>
                      <ul className='mt-3 space-y-2 text-sm text-slate-600'>
                        <li>hola — hello</li>
                        <li>gracias — thank you</li>
                        <li>¿Dónde está...? — Where is...?</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className='absolute -bottom-6 left-6 text-sm dark:text-background bg-white rounded-xl px-4 py-2 shadow'>
                AI suggestions: +12
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
