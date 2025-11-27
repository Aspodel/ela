import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useParams } from '@tanstack/react-router';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { cardApi } from '@/features/flashcard';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type FlashcardCardProps = React.HTMLAttributes<HTMLDivElement> & {
  card: Card;
  isRevealed?: boolean;
};

export const FlashcardCard: React.FC<FlashcardCardProps> = ({
  card,
  className,
  isRevealed = false,
  ...props
}) => {
  const { deckId } = useParams({ from: '/app/flashcard/$deckId/' });
  const [isFlipped, setIsFlipped] = useState(isRevealed);
  const [isAnimating, setIsAnimating] = useState(false);
  const deleteMutation = cardApi.useDelete();

  useEffect(() => {
    setIsFlipped(isRevealed);
  }, [isRevealed]);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteMutation.mutate(
      { id: card.id, deckId: Number(deckId) },
      {
        onSuccess: () => {
          toast.success('Card deleted');
        },
      }
    );
  };

  return (
    <div
      className={cn('min-h-48 w-full perspective-[1000px] cursor-pointer group relative', className)}
      onClick={handleFlip}
      {...props}
    >
      <div className='absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity'>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              className='h-8 w-8'
              onClick={(e) => e.stopPropagation()}
            >
              <TrashIcon className='h-4 w-4' />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent onClick={(e) => e.stopPropagation()}>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Flashcard</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this card? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onAnimationComplete={() => setIsAnimating(false)}
        className='relative h-full w-full transform-3d'
      >
        {/* Front */}
        <Card className='absolute h-full w-full backface-hidden flex items-center justify-center p-6 text-center'>
          <CardContent className='flex items-center justify-center h-full w-full p-0'>
            <p className='text-xl font-medium'>{card.front}</p>
          </CardContent>
        </Card>

        {/* Back */}
        <Card
          className='absolute h-full w-full backface-hidden flex items-center justify-center p-6 text-center'
          style={{ transform: 'rotateY(180deg)' }}
        >
          <CardContent className='flex items-center justify-center h-full w-full p-0'>
            <p className='text-xl font-medium'>{card.back}</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
