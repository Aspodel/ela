import { useState } from 'react';
import { ArrowLeftIcon, PlayIcon } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card as UiCard, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { FlashcardList, ReviewMode } from '@/features/flashcard';
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
  const { data: dueCards } = cardApi.useDue({ deckId: Number(deckId) });
  const [isReviewMode, setIsReviewMode] = useState(false);

  if (isDeckLoading) {
    return <div className='p-8'>Loading deck details...</div>;
  }

  if (!deck) {
    return <div className='p-8'>Deck not found</div>;
  }

  console.log(dueCards);
  if (isReviewMode && dueCards && dueCards.length > 0) {
    return (
      <ReviewMode
        deckId={Number(deckId)}
        cards={dueCards}
        onComplete={() => setIsReviewMode(false)}
        onCancel={() => setIsReviewMode(false)}
      />
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <Button variant='ghost' className='w-fit -ml-2' asChild>
          <Link to='/app/flashcard'>
            Back
          </Link>
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>{deck.name}</h1>
            <p className='text-muted-foreground'>{deck.description}</p>
          </div>
          {dueCards && dueCards.length > 0 && (
            <Button onClick={() => setIsReviewMode(true)}>
              <PlayIcon className="size-4" />
              Review Now
              <span className='bg-white text-primary rounded-full size-5 font-medium flex items-center justify-center'>
                {dueCards.length}
              </span> 
            </Button>
          )}
        </div>
      </div>

      {isCardsLoading ? (
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5'>
          {[...Array(8)].map((_, i) => (
            <UiCard key={i}>
              <CardHeader>
                <CardTitle>
                  <Skeleton className='h-4 w-32' />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className='h-3 w-full' />
              </CardContent>
            </UiCard>
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
