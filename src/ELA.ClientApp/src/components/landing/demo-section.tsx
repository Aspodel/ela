import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';

type DemoStep = {
  title: string;
  description: string;
  src: string;
};

const DEMO_STEPS: DemoStep[] = [
  {
    title: 'Add vocabulary',
    description:
      'Type, scan, or speak — then tag and save with example sentences.',
    src: 'https://www.pexels.com/download/video/32390680/',
  },
  {
    title: 'Use flashcards',
    description:
      'Quick sessions with audio and spaced repetition for better retention.',
    src: 'https://www.pexels.com/download/video/34699066/',
  },
  {
    title: 'Take quizzes & get feedback',
    description:
      'Adaptive quizzes and AI explanations with a focused study plan.',
    src: 'https://www.pexels.com/download/video/34480255/',
  },
];

export function DemoSection() {
  return (
    <section id='demo' className='bg-white dark:bg-card py-24 scroll-mt-14'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='mx-auto text-center max-w-2xl'>
          <h2 className='text-3xl font-bold'>See it in action</h2>
          <p className='mt-2 text-muted-foreground'>
            Short guided tour of the core flows.
          </p>
        </div>

        <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
          {DEMO_STEPS.map((step) => (
            <Card>
              <CardHeader>
                <CardTitle>{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <video
                  src={step.src}
                  controls
                  className='rounded-md object-cover w-full h-full aspect-video'
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
