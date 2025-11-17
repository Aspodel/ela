import { Card, CardDescription, CardTitle } from '@/components/ui/card';

export function QuickActions() {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4'>
      {data.map((action) => (
        <Card
          key={action.id}
          className='p-4 flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform'
        >
          <CardTitle className='text-2xl'>{action.icon}</CardTitle>
          <CardDescription>{action.title}</CardDescription>
        </Card>
      ))}
    </div>
  );
}

const data = [
  { id: 'add', title: 'Add Vocabulary', icon: '➕' },
  { id: 'flash', title: 'Start Flashcards', icon: '🃏' },
  { id: 'quiz', title: 'Take a Quiz', icon: '📝' },
  { id: 'gen', title: 'Generate AI Set', icon: '🤖' },
  { id: 'mock', title: 'Start Mock Test', icon: '🎯' },
];
