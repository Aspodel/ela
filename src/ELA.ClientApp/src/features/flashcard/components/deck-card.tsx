import { format } from 'date-fns';
import { Clock4Icon, LayersIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DeckCardDropdown, type DeckListItemDto } from '@/features/flashcard';
import { Link } from '@tanstack/react-router';

type DeckCardProps = React.HTMLAttributes<HTMLDivElement> & {
  deck: DeckListItemDto;
  onEdit: () => void;
  onDelete: () => void;
};

export function DeckCard({ deck, onEdit, onDelete }: DeckCardProps) {
  return (
    <Card className='group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1'>
      <Link
        to='/app/flashcard/$deckId'
        params={{ deckId: String(deck.id) }}
        className='absolute inset-0 z-10'
      >
        <span className='sr-only'>View deck</span>
      </Link>
      <CardHeader className='pb-3'>
        <div className='flex justify-between items-start gap-2'>
          <div className='space-y-1'>
            <CardTitle className='text-xl font-semibold leading-none tracking-tight group-hover:text-primary transition-colors'>
              {deck.name}
            </CardTitle>
            <CardDescription className='line-clamp-2 text-sm'>
              {deck.description || 'No description provided.'}
            </CardDescription>
          </div>
          <div className='relative z-20'>
            <DeckCardDropdown onEdit={onEdit} onDelete={onDelete} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-between text-sm text-muted-foreground'>
          <div className='flex items-center gap-1.5'>
            <Clock4Icon className='size-4' />
            <span>{format(new Date(deck.created), 'MMM d, yyyy')}</span>
          </div>
          <div className='flex items-center gap-1.5 font-medium'>
            <LayersIcon className='size-4' />
            <span>
              {deck.cardCount ?? 0} {deck.cardCount === 1 ? 'card' : 'cards'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
