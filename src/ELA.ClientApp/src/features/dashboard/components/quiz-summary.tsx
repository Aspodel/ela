import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from '@tanstack/react-router';

export function QuizSummary() {
  return (
    <Card className='gap-4'>
      <CardHeader className='flex items-center justify-between'>
        <CardTitle className='text-md font-medium'>Recent quizzes</CardTitle>
        <CardDescription className='hover:underline cursor-pointer'>
          <Link to='/app/quiz'>See all</Link>
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        {data.map((s) => (
          <div key={s.id} className='flex items-center justify-between gap-2'>
            <div>
              <div className='font-medium'>
                {s.title}{' '}
                <span className='text-sm text-muted-foreground/60'>
                  {s.date}
                </span>
              </div>
              <div className='text-sm text-muted-foreground'>{s.feedback}</div>
            </div>
            <div className='text-sm text-muted-foreground'>{s.score}% • {s.time}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

const data = [
  {
    id: 1,
    date: 'Nov 15',
    title: 'Travel Vocabulary',
    score: 82,
    time: '12m',
    feedback: 'Confused with synonyms; review collocations.',
  },
  {
    id: 2,
    date: 'Nov 13',
    title: 'Listening Short Dialogues',
    score: 70,
    time: '18m',
    feedback: 'Work on reduced forms.',
  },
  {
    id: 3,
    date: 'Nov 10',
    title: 'Grammar: Past Tense',
    score: 75,
    time: '15m',
    feedback: 'Need to practice irregular verbs.',
  }
];
