import { useState } from 'react';
import { motion } from 'motion/react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type FlashcardCardProps = React.HTMLAttributes<HTMLDivElement> & {
  card: Card;
};

export const FlashcardCard: React.FC<FlashcardCardProps> = ({
  card,
  className,
  ...props
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  return (
    <div
      className={cn('h-64 w-full perspective-[1000px] cursor-pointer', className)}
      onClick={handleFlip}
      {...props}
    >
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
