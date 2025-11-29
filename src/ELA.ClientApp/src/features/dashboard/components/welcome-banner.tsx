import { Button } from '@/components/ui/button';

type WelcomeBannerProps = {
  name: string;
};

export function WelcomeBanner({ name = 'User' }: WelcomeBannerProps) {
  return (
    <section className='relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 shadow-lg'>
      <div className='absolute inset-0 bg-white/10 backdrop-blur-3xl' />
      <div className='relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>
        <div className='space-y-2'>
          <h1 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>
            Welcome back, {name}!
          </h1>
          <p className='text-indigo-100 text-lg max-w-xl'>
            Ready to continue your language journey? Here's your personalized
            learning plan for today.
          </p>
          <div className='flex flex-wrap items-center gap-3 pt-4'>
            <Button
              size='lg'
              className='bg-white text-indigo-600 hover:bg-indigo-50 border-none shadow-md font-semibold'
            >
              Continue Learning
            </Button>
            <Button
              variant='outline'
              size='lg'
              className='bg-white/10 text-white border-white/20 dark:bg-white/10 dark:text-white dark:border-white/20 hover:bg-white/20 hover:text-white dark:hover:bg-white/20 dark:hover:text-white dark:hover:border-white/20 backdrop-blur-md'
            >
              Resume Last Session
            </Button>
          </div>
        </div>
        {/* <div className='ml-auto hidden sm:flex items-center gap-4'>
          <div className='text-sm text-slate-600'>
            <div className='text-xs'>Daily goal</div>
            <div className='font-medium'>30 min • 20/30 min</div>
          </div>
          <div className='w-32 h-12 bg-white rounded-lg shadow-inner flex items-center justify-center'>
            AI Plan
          </div>
        </div> */}
      </div>
    </section>
  );
}
