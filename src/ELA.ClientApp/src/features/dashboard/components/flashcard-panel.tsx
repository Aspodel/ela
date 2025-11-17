import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DueCardChart } from '@/features/dashboard';

export function FlashcardPanel() {
  return (
    <Card className='gap-4'>
      <CardHeader className='flex items-center justify-between'>
        <div>
          <CardDescription>Flashcards Due</CardDescription>
          <CardTitle className='text-xl font-semibold tabular-nums'>
            18 cards due today
          </CardTitle>
        </div>
        <Button>Start Review</Button>
      </CardHeader>
      <CardContent>
        <DueCardChart
          data={[
            { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
          ]}
        />
      </CardContent>
    </Card>
  );
}
