import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function SuggestedActions() {
  return (
    <Card className='gap-4'>
      <CardHeader className='flex items-center justify-between'>
        <CardTitle>Personalized recommendations</CardTitle>
        <a className='text-sm text-muted-foreground hover:underline' href='#'>
          See all
        </a>
      </CardHeader>

      <CardContent>
        <ScrollArea type='always' className='w-full whitespace-nowrap'>
          <div className='flex w-max space-x-4 pb-6 pt-2'>
            {data.map((r) => (
              <Card
                key={r.id}
                className='w-[240px] gap-2 p-1 hover:shadow-md transition-all hover:-translate-y-0.5'
              >
                <CardHeader className='p-3 pb-0'>
                  <CardTitle className='truncate text-base font-medium'>
                    {r.title}
                  </CardTitle>
                  <CardDescription className='text-xs line-clamp-1'>
                    {r.reason}
                  </CardDescription>
                </CardHeader>
                <CardFooter className='flex items-center justify-between p-3 pt-4'>
                  <div className='text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1'>
                    <span className='inline-block w-1.5 h-1.5 rounded-full bg-indigo-500'></span>
                    {r.time}
                  </div>
                  <Button size='sm' className='h-7 px-3 text-xs shadow-sm'>
                    Start
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

const data = [
  {
    id: 1,
    title: 'Travel Vocabulary',
    reason: 'Missed 60% last quiz',
    time: '15 min',
  },
  {
    id: 2,
    title: 'Short Listening Drills',
    reason: 'Listening trend down',
    time: '10 min',
  },
  {
    id: 3,
    title: 'Mock Test: 12 words',
    reason: 'Prepare for next level',
    time: '12 min',
  },
  {
    id: 4,
    title: 'Grammar Practice: Past Tense',
    reason: 'Common mistakes detected',
    time: '8 min',
  },
  {
    id: 5,
    title: 'Travel Vocabulary',
    reason: 'Missed 60% last quiz',
    time: '15 min',
  },
];
