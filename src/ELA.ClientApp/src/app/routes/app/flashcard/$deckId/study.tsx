import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, RotateCcw, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cardApi } from '@/features/flashcard';
import { EmptyComponent } from '@/components/empty-component';

export const Route = createFileRoute('/app/flashcard/$deckId/study')({
    component: StudyRoute,
});

function StudyRoute() {
    const { deckId } = Route.useParams();
    const { data: cards, isLoading } = cardApi.useList<PaginatedList<Card>>({
        deckId: Number(deckId),
    });

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isFlipped, setIsFlipped] = React.useState(false);
    const [direction, setDirection] = React.useState(0);

    const currentCard = cards?.items[currentIndex];
    const progress = cards?.items.length
        ? ((currentIndex + 1) / cards.items.length) * 100
        : 0;

    const handleNext = () => {
        if (cards && currentIndex < cards.items.length - 1) {
            setDirection(1);
            setIsFlipped(false);
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setIsFlipped(false);
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setIsFlipped(false);
        setDirection(0);
    };

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                handleNext();
            } else if (e.key === 'ArrowLeft') {
                handlePrev();
            } else if (e.key === 'Enter' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                handleFlip();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, cards]);

    if (isLoading) {
        return <div className='p-8 text-center'>Loading cards...</div>;
    }

    if (!cards?.items.length) {
        return (
            <div className='flex flex-col items-center justify-center h-full gap-4'>
                <EmptyComponent
                    title='No cards to study'
                    description='Add some cards to this deck to start studying.'
                    icon='📚'
                />
                <Button asChild>
                    <Link to='/app/flashcard/$deckId' params={{ deckId }}>
                        Go Back
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className='flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 gap-6'>
            <div className='flex items-center justify-between'>
                <Button variant='ghost' size='icon' asChild>
                    <Link to='/app/flashcard/$deckId' params={{ deckId }}>
                        <X className='h-6 w-6' />
                    </Link>
                </Button>
                <div className='flex-1 mx-8'>
                    <div className='flex justify-between text-sm text-muted-foreground mb-2'>
                        <span>
                            Card {currentIndex + 1} of {cards.items.length}
                        </span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className='h-2' />
                </div>
                <Button variant='ghost' size='icon' onClick={handleRestart}>
                    <RotateCcw className='h-6 w-6' />
                </Button>
            </div>

            <div className='flex-1 flex items-center justify-center relative perspective-[1000px]'>
                <AnimatePresence initial={false} custom={direction} mode='wait'>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        initial={{ opacity: 0, x: direction * 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -100 }}
                        transition={{ duration: 0.3 }}
                        className='w-full max-w-2xl aspect-3/2 cursor-pointer'
                        onClick={handleFlip}
                    >
                        <motion.div
                            initial={false}
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.6 }}
                            className='relative w-full h-full transform-3d'
                        >
                            {/* Front */}
                            <Card className='absolute inset-0 backface-hidden flex items-center justify-center p-8 text-center shadow-xl'>
                                <CardContent className='text-3xl font-medium'>
                                    {currentCard?.front}
                                </CardContent>
                                <div className='absolute bottom-4 text-sm text-muted-foreground uppercase tracking-widest'>
                                    Front
                                </div>
                            </Card>

                            {/* Back */}
                            <Card
                                className='absolute inset-0 backface-hidden flex items-center justify-center p-8 text-center shadow-xl bg-muted/30'
                                style={{ transform: 'rotateY(180deg)' }}
                            >
                                <CardContent className='text-3xl font-medium'>
                                    {currentCard?.back}
                                </CardContent>
                                <div className='absolute bottom-4 text-sm text-muted-foreground uppercase tracking-widest'>
                                    Back
                                </div>
                            </Card>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className='flex items-center justify-center gap-8 pb-8'>
                <Button
                    variant='outline'
                    size='lg'
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className='w-32'
                >
                    <ChevronLeft className='mr-2 h-4 w-4' />
                    Previous
                </Button>
                <Button
                    size='lg'
                    onClick={handleFlip}
                    className='w-32 min-w-[120px]'
                    variant='secondary'
                >
                    {isFlipped ? 'Show Front' : 'Show Back'}
                </Button>
                <Button
                    variant='default'
                    size='lg'
                    onClick={handleNext}
                    disabled={currentIndex === cards.items.length - 1}
                    className='w-32'
                >
                    Next
                    <ChevronRight className='ml-2 h-4 w-4' />
                </Button>
            </div>
        </div>
    );
}
