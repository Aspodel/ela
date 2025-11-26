import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuizNavigationProps {
    totalQuestions: number;
    currentQuestionIndex: number;
    userAnswers: Record<number, number>;
    onNavigate: (index: number) => void;
}

export function QuizNavigation({
    totalQuestions,
    currentQuestionIndex,
    userAnswers,
    onNavigate,
}: QuizNavigationProps) {
    return (
        <div className='grid grid-cols-5 gap-2'>
            {Array.from({ length: totalQuestions }).map((_, index) => {
                const isAnswered = userAnswers[index] !== undefined;
                const isCurrent = currentQuestionIndex === index;

                return (
                    <Button
                        key={index}
                        variant={isCurrent ? 'default' : isAnswered ? 'secondary' : 'outline'}
                        className={cn(
                            'size-8 font-medium',
                            isCurrent && 'ring-2 ring-primary ring-offset-2'
                        )}
                        onClick={() => onNavigate(index)}
                    >
                        {index + 1}
                    </Button>
                );
            })}
        </div>
    );
}
