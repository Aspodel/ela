import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { Question } from '../types';

interface QuizQuestionProps {
    question: Question;
    currentQuestionIndex: number;
    totalQuestions: number;
    selectedAnswer: number | null;
    onSelectAnswer: (index: number) => void;
    onNextQuestion: () => void;
}

export function QuizQuestion({
    question,
    currentQuestionIndex,
    totalQuestions,
    selectedAnswer,
    onSelectAnswer,
    onNextQuestion,
}: QuizQuestionProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-xl'>{question.question}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
                {question.options.map((option, index) => {
                    let buttonVariant = 'outline';

                    if (selectedAnswer === index) {
                        buttonVariant = 'default';
                    }

                    return (
                        <Button
                            key={index}
                            variant={buttonVariant as any}
                            className={`w-full justify-start text-left h-auto py-4 text-base`}
                            onClick={() => onSelectAnswer(index)}
                        >
                            <span className='mr-4 shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs'>
                                {String.fromCharCode(65 + index)}
                            </span>
                            {option}
                        </Button>
                    );
                })}
            </CardContent>
            <CardFooter className='flex justify-end pt-6'>
                <Button onClick={onNextQuestion} disabled={selectedAnswer === null}>
                    {currentQuestionIndex < totalQuestions - 1 ? (
                        <>
                            Next Question <ArrowRight className='w-4 h-4 ml-2' />
                        </>
                    ) : (
                        'Finish Quiz'
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
