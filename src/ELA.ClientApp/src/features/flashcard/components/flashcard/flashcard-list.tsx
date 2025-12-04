import React from 'react';
import { SearchIcon, BookOpenIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { Link, useParams } from '@tanstack/react-router';

import { EmptyComponent } from '@/components/empty-component';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { FlashcardCard, FlashcardCreateDialog } from '@/features/flashcard';

type FlashcardListProps = {
  cards: Card[];
};

export const FlashcardList: React.FC<FlashcardListProps> = ({ cards }) => {
  const { deckId } = useParams({ from: '/app/flashcard/$deckId/' });
  const [search, setSearch] = React.useState('');
  const [showAll, setShowAll] = React.useState(false);

  const filteredCards = React.useMemo(() => {
    if (!search) return cards;
    const lowerSearch = search.toLowerCase();
    return cards.filter(
      (card) =>
        card.front.toLowerCase().includes(lowerSearch) ||
        card.back.toLowerCase().includes(lowerSearch)
    );
  }, [cards, search]);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-lg border shadow-sm'>
        <div className='relative w-full sm:w-72'>
          <SearchIcon className='absolute left-2 top-2.5 size-4 text-muted-foreground' />
          <Input
            placeholder='Search cards...'
            className='pl-8'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className='flex items-center gap-2 w-full sm:w-auto'>
          <Toggle
            pressed={showAll}
            onPressedChange={setShowAll}
            variant='outline'
            aria-label='Toggle show all'
          >
            {showAll ? (
              <>
                <EyeIcon className='size-4' />
                Hide Answers
              </>
            ) : (
              <>
                <EyeOffIcon className='size-4' />
                Show Answers
              </>
            )}
          </Toggle>

          <Button variant='outline' asChild>
            <Link to='/app/flashcard/$deckId/study' params={{ deckId: deckId }}>
              <BookOpenIcon className='size-4' />
              Study
            </Link>
          </Button>

          <FlashcardCreateDialog />
        </div>
      </div>

      {filteredCards.length === 0 ? (
        <EmptyComponent
          title='No flashcards found.'
          description={
            search
              ? 'Try adjusting your search query.'
              : 'You can add flashcards to your deck to get started.'
          }
          icon='🃏'
        />
      ) : (
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5'>
          {filteredCards.map((card) => (
            <FlashcardCard key={card.id} card={card} isRevealed={showAll} />
          ))}
        </div>
      )}
    </div>
  );
};
