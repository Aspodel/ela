import {
  LandmarkIcon,
  BotIcon,
  WalletCardsIcon,
  BrainIcon,
  type LucideIcon,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

type FeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

const FEATURES: FeatureItem[] = [
  {
    title: 'Your Personal Vocabulary Bank',
    description:
      'Save words, phrases, and example sentences — AI schedules reviews based on what you forget.',
    icon: LandmarkIcon,
    color: 'indigo',
  },
  {
    title: 'AI-Generated Vocabulary Sets',
    description:
      'Tell the AI your purpose — travel, job interview, or daily chat — and get a ready-made set.',
    icon: BotIcon,
    color: 'purple',
  },
  {
    title: 'Smart Flashcards',
    description:
      'Bite-sized sessions with audio and spaced repetition to lock in long-term recall.',
    icon: WalletCardsIcon,
    color: 'emerald',
  },
  {
    title: 'Quizzes & AI Feedback',
    description:
      'Adaptive quizzes and detailed AI feedback — generate full mock tests for exam practice.',
    icon: BrainIcon,
    color: 'rose',
  },
];

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  color,
}: FeatureItem) => {
  const iconColor = `text-${color}-600`;
  const bgColor = `bg-${color}-50`;

  return (
    <Card className='p-6 border-none'>
      <div
        className={`size-12 rounded-sm flex items-center justify-center ${bgColor}`}
      >
        <Icon className={`size-6 ${iconColor}`} />
      </div>

      <CardContent className='p-0 space-y-3'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export function FeaturesSection() {
  return (
    <section id='features' className='py-24 scroll-mt-14'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='mx-auto text-center max-w-2xl'>
          <h2 className='text-3xl font-bold'>
            Smart tools that actually speed up learning
          </h2>
          <p className='mt-2 text-muted-foreground'>
            Features built to make progress simple and measurable.
          </p>
        </div>

        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
