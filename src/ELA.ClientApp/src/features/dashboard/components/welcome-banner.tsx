import { Button } from '@/components/ui/button';

type WelcomeBannerProps = {
  name: string;
};

export function WelcomeBanner({ name = 'User' }: WelcomeBannerProps) {
  return (
    <section className='bg-linear-to-tr from-sky-300 via-violet-300 to-pink-300 dark:from-cyan-500 dark:via-violet-500 dark:to-fuchsia-400 rounded-lg p-8 shadow-sm'>
      <div className='flex items-center justify-between gap-6'>
        <div>
          <h1 className='text-3xl font-semibold'>Welcome back, {name}!</h1>
          <p className='mt-1 text-slate-600 dark:text-slate-300'>
            AI Suggests: Here’s your learning plan for today.
          </p>
          <div className='mt-6 flex items-center gap-3'>
            <Button>Continue Learning</Button>
            <Button
              variant='link'
              className='text-slate-600 dark:text-slate-300 hover:underline'
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
