import { useState } from 'react';
import { CheckIcon, XIcon, ClockIcon, ThumbsUpIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card as UICard, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cardApi } from '../../api/card.api';

interface ReviewModeProps {
    deckId: number;
    cards: Card[];
    onComplete: () => void;
    onCancel: () => void;
}

export function ReviewMode({ deckId, cards, onComplete, onCancel }: ReviewModeProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const reviewMutation = cardApi.useReview();

    const currentCard = cards[currentIndex];
    const progress = ((currentIndex) / cards.length) * 100;

    const handleRate = async (rating: number) => {
        if (!currentCard) return;

        await reviewMutation.mutateAsync({
            deckId,
            cardId: currentCard.id,
            qualityRating: rating,
            reviewDate: new Date().toISOString(),
        });

        if (currentIndex < cards.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setIsFlipped(false);
        } else {
            onComplete();
        }
    };

    if (!currentCard) {
        return null;
    }

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full py-8">
            <div className="flex items-center justify-between gap-4">
                <Button variant="ghost" onClick={onCancel}>
                    Exit Review
                </Button>
                <div className="flex-1 max-w-xs">
                    <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{currentIndex + 1} / {cards.length}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>
            </div>

            <div className="perspective-1000 min-h-[400px] relative">
                <UICard className="w-full h-full min-h-[400px] flex flex-col justify-center items-center text-center p-8 cursor-pointer transition-all duration-300"
                    onClick={() => !isFlipped && setIsFlipped(true)}
                >
                    <CardContent className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                Front
                            </h3>
                            <div className="text-2xl font-semibold">
                                {currentCard.front}
                            </div>
                        </div>

                        {isFlipped && (
                            <div className="space-y-4 pt-8 border-t animate-in fade-in slide-in-from-bottom-4">
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                    Back
                                </h3>
                                <div className="text-2xl font-semibold">
                                    {currentCard.back}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </UICard>
            </div>

            <div className="flex justify-center gap-4 min-h-[60px]">
                {!isFlipped ? (
                    <Button
                        size="lg"
                        className="w-full max-w-sm"
                        onClick={() => setIsFlipped(true)}
                    >
                        Show Answer
                    </Button>
                ) : (
                    <div className="grid grid-cols-4 gap-2 w-full">
                        <Button
                            variant="outline"
                            className="flex flex-col gap-1 h-auto py-3 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                            onClick={() => handleRate(1)}
                            disabled={reviewMutation.isPending}
                        >
                            <XIcon className="size-4" />
                            <span className="text-xs font-semibold">Again</span>
                        </Button>

                        <Button
                            variant="outline"
                            className="flex flex-col gap-1 h-auto py-3 border-orange-200 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300"
                            onClick={() => handleRate(3)}
                            disabled={reviewMutation.isPending}
                        >
                            <ClockIcon className="size-4" />
                            <span className="text-xs font-semibold">Hard</span>
                        </Button>

                        <Button
                            variant="outline"
                            className="flex flex-col gap-1 h-auto py-3 border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                            onClick={() => handleRate(4)}
                            disabled={reviewMutation.isPending}
                        >
                            <ThumbsUpIcon className="size-4" />
                            <span className="text-xs font-semibold">Good</span>
                        </Button>

                        <Button
                            variant="outline"
                            className="flex flex-col gap-1 h-auto py-3 border-green-200 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                            onClick={() => handleRate(5)}
                            disabled={reviewMutation.isPending}
                        >
                            <CheckIcon className="size-4" />
                            <span className="text-xs font-semibold">Easy</span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
