import { Button } from '@/components/ui/button';

type WelcomeBannerProps = {
  name: string;
};

export function WelcomeBanner({ name = 'User' }: WelcomeBannerProps) {
  return (
    <section className='bg-linear-to-tr from-purple-100 via-pink-100 to-indigo-100 dark:from-purple-400 dark:via-pink-400 dark:to-indigo-400 rounded-lg p-6 mb-6 shadow-sm'>
      <div className='flex items-center justify-between gap-6'>
        <div>
          <h1 className='text-2xl font-semibold'>Welcome back, {name}!</h1>
          <p className='mt-1 text-sm text-slate-500'>
            AI Suggests: Here’s your learning plan for today.
          </p>
          <div className='mt-3 flex items-center gap-3'>
            <Button>Continue Learning</Button>
            <a className='text-sm text-slate-500 hover:underline' href='#'>
              Resume Last Session
            </a>
          </div>
        </div>
        <div className='ml-auto hidden sm:flex items-center gap-4'>
          <div className='text-sm text-slate-600'>
            <div className='text-xs'>Daily goal</div>
            <div className='font-medium'>30 min • 20/30 min</div>
          </div>
          <div className='w-32 h-12 bg-white rounded-lg shadow-inner flex items-center justify-center'>
            AI Plan
          </div>
        </div>
      </div>
    </section>
  );
}
