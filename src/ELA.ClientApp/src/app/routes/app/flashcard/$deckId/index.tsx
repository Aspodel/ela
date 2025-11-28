import { ArrowLeftIcon } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { FlashcardList } from '@/features/flashcard';
import { cardApi, deckApi } from '@/features/flashcard';

export const Route = createFileRoute('/app/flashcard/$deckId/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { deckId } = Route.useParams();
  const { data: deck, isLoading: isDeckLoading } = deckApi.useGet({
    id: Number(deckId),
  });
  const { data, isLoading: isCardsLoading } = cardApi.useList<PaginatedList<Card>>({
    deckId: Number(deckId),
  });

  if (isDeckLoading) {
    return <div className='p-8'>Loading deck details...</div>;
  }

  if (!deck) {
    return <div className='p-8'>Deck not found</div>;
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <Button variant='ghost' className='w-fit -ml-2' asChild>
          <Link to='/app/flashcard'>
            <ArrowLeftIcon className='mr-2 size-4' />
            Back
          </Link>
        </Button>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>{deck.name}</h1>
          <p className='text-muted-foreground'>{deck.description}</p>
        </div>
      </div>

      {isCardsLoading ? (
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5'>
          {[...Array(8)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>
                  <Skeleton className='h-4 w-32' />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className='h-3 w-full' />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : data?.items.length ? (
        <FlashcardList cards={data.items} />
      ) : (
        <FlashcardList cards={[]} />
      )}
    </div>
  );
}
