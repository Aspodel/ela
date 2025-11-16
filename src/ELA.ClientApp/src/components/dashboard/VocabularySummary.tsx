import { Card } from '../ui/card';

const sample = [
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

export function VocabularySummary() {
  return (
    <Card className='p-4'>
      <div className='flex items-center justify-between mb-3'>
        <h4 className='text-md font-medium'>Vocabulary Summary</h4>
        <a className='text-sm text-slate-500 hover:underline' href='#'>
          View all
        </a>
      </div>
      <div className='space-y-3'>
        {sample.map((s) => (
          <div key={s.word} className='flex items-center justify-between'>
            <div>
              <div className='font-medium'>
                {s.word} <span className='text-xs text-slate-400'>{s.pos}</span>
              </div>
              <div className='text-xs text-slate-500'>{s.example}</div>
            </div>
            <div className='text-sm text-slate-600'>{s.strength}%</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
