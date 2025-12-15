import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Question } from '../types';

interface QuizNavigationProps {
    totalQuestions: number;
    currentQuestionIndex: number;
    userAnswers: Record<string, number>;
    questions: Question[];
    onNavigate: (index: number) => void;
}

export function QuizNavigation({
    totalQuestions,
    currentQuestionIndex,
    userAnswers,
    questions,
    onNavigate,
}: QuizNavigationProps) {
    return (
        <div className='grid grid-cols-5 gap-2'>
            {Array.from({ length: totalQuestions }).map((_, index) => {
                const questionId = questions[index]?.id;
                const isAnswered = questionId ? userAnswers[questionId] !== undefined : false;
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
