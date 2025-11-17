import { TrendingUp } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FlashcardRetentionChart,
  LearningProgressChart,
  SkillValuationChart,
} from '@/features/dashboard';

const chartData = [
  { day: 'Nov 10', words: 18 },
  { day: 'Nov 11', words: 25 },
  { day: 'Nov 12', words: 24 },
  { day: 'Nov 13', words: 22 },
  { day: 'Nov 14', words: 30 },
  { day: 'Nov 15', words: 28 },
  { day: 'Nov 16', words: 32 },
];

const chartData2 = [
  { skill: 'Grammar', score: 80 },
  { skill: 'Listening', score: 45 },
  { skill: 'Speaking', score: 50 },
  { skill: 'Reading', score: 75 },
  { skill: 'Writing', score: 60 },
];

const chartData3 = [
  { month: 'January', percentage: 56 },
  { month: 'February', percentage: 65 },
  { month: 'March', percentage: 35 },
  { month: 'April', percentage: 73 },
  { month: 'May', percentage: 95 },
  { month: 'June', percentage: 74 },
];

export function ChartsGrid() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
          <CardDescription>
            Showing your progress over the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LearningProgressChart data={chartData} />
        </CardContent>
        <CardFooter className='flex-col gap-2 pt-4 text-sm'>
          <div className='flex items-center gap-2 leading-none font-medium'>
            Trending up by 5.2% this week <TrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground flex items-center gap-2 leading-none'>
            From November 10 to November 16, 2025
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className='items-center'>
          <CardTitle>Skill Valuation</CardTitle>
          <CardDescription>
            Based on your recent quiz performances
          </CardDescription>
        </CardHeader>
        <CardContent className='w-full lg:w-[80%] xl:w-2/3 mx-auto'>
          <SkillValuationChart data={chartData2} />
        </CardContent>
        <CardFooter className='flex-col gap-2 text-sm'>
          <div className='flex items-center gap-2 leading-none font-medium'>
            Trending up by 15% this month <TrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground flex items-center gap-2 leading-none'>
            January - June 2024
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Flashcard Retention</CardTitle>
          <CardDescription>
            Percentage of flashcards retained over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FlashcardRetentionChart data={chartData3} />
        </CardContent>
        <CardFooter className='flex-col gap-2 pt-4 text-sm'>
          <div className='flex items-center gap-2 leading-none font-medium'>
            Trending up by 2% this month <TrendingUp className='size-4' />
          </div>
          <div className='text-muted-foreground flex items-center gap-2 leading-none'>
            January - June 2024
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
