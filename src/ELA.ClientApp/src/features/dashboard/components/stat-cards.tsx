import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TrendingUpIcon } from 'lucide-react';

export function StatCards() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {data.map((stat) => (
        <Card key={stat.id} className='@container/card'>
          <CardHeader className='relative'>
            <CardDescription>{stat.title}</CardDescription>
            <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
              {stat.value}
            </CardTitle>
            <div className='absolute right-4 top-0'>
              <Badge
                variant='outline'
                className='flex gap-1 rounded-lg text-xs'
              >
                <TrendingUpIcon className='size-3' />
                {stat.change}
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className='flex-col items-start gap-1 text-sm'>
            <div className='line-clamp-1 flex gap-2 font-medium'>
              Trending {stat.trend} this month{' '}
              <TrendingUpIcon className='size-4' />
            </div>
            <div className='text-muted-foreground'>{stat.description}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

const data = [
  {
    id: 'total-vocabulary',
    title: 'Total Vocabulary',
    description: 'Visitors for the last 6 months',
    value: 123,
    change: '+12.5%',
    trend: 'up',
  },
  {
    id: 'new-words',
    title: 'New Words',
    description: 'Acquisition needs attention',
    value: 45,
    change: '-3.2%',
    trend: 'down',
  },
  {
    id: 'flashcard-completion',
    title: 'Flashcard Completion',
    description: 'Keep up the good work',
    value: 75,
    change: '+8.1%',
    trend: 'up',
  },
  {
    id: 'study-streak',
    title: 'Study Streak',
    description: 'Longest streak this month',
    value: 10,
    change: '+5%',
    trend: 'up',
  },
];
