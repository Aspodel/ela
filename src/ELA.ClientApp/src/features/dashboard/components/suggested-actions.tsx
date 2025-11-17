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
      <CardHeader className='flex items-center justify-between mb-3'>
        <CardTitle>Personalized recommendations</CardTitle>
        <a className='text-sm text-muted-foreground hover:underline' href='#'>
          See all
        </a>
      </CardHeader>

      <CardContent>
        <ScrollArea className='w-full whitespace-nowrap'>
          <div className='flex w-max space-x-4 pb-4'>
            {data.map((r) => (
              <Card key={r.id} className='min-w-[220px] gap-2 p-2'>
                <CardHeader className='p-2'>
                  <CardTitle className='truncate'>{r.title}</CardTitle>
                  <CardDescription className=''>{r.reason}</CardDescription>
                </CardHeader>
                <CardFooter className='flex items-center justify-between p-2'>
                  <div className='text-sm text-slate-400'>{r.time}</div>
                  <Button size='sm'>Start</Button>
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
