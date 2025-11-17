import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from '@tanstack/react-router';

export function VocabularySummary() {
  return (
    <Card className='gap-4'>
      <CardHeader className='flex items-center justify-between'>
        <CardTitle className='text-md font-medium'>
          Vocabulary summary
        </CardTitle>
        <CardDescription className='hover:underline cursor-pointer'>
          <Link to='/app/vocabulary'>See all</Link>
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
        {data.map((s) => (
          <div key={s.word} className='flex items-center justify-between'>
            <div>
              <div className='font-medium'>
                {s.word}{' '}
                <span className='text-sm text-muted-foreground/60'>
                  {s.pos}
                </span>
              </div>
              <div className='text-sm text-muted-foreground'>{s.example}</div>
            </div>
            <div className='text-sm text-muted-foreground'>{s.strength}%</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

const data = [
  {
    word: 'itinerary',
    pos: 'noun',
    example: 'I checked the itinerary for tomorrow.',
    strength: 35,
  },
  {
    word: 'boarding',
    pos: 'verb',
    example: 'Boarding begins in 10 minutes.',
    strength: 55,
  },
  {
    word: 'locale',
    pos: 'noun',
    example: 'The locale affects date formatting.',
    strength: 20,
  },
];
