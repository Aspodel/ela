import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, XCircle, RotateCcw, AlertCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import type { Question } from '../types';

interface QuizResultsProps {
    questions: Question[];
    userAnswers: Record<string, number>;
    onRetry: () => void;
}

export function QuizResults({ questions, userAnswers, onRetry }: QuizResultsProps) {
    const calculateScore = () => {
        let correct = 0;
        questions.forEach((q) => {
            const userAnswer = userAnswers[q.id];
            if (userAnswer === q.correctAnswer) {
                correct++;
            }
        });
        return correct;
    };

    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    let feedbackMessage = '';
    let feedbackColor = '';

    if (percentage >= 80) {
        feedbackMessage = 'Excellent work! You have a strong grasp of these concepts.';
        feedbackColor = 'text-green-600';
    } else if (percentage >= 60) {
        feedbackMessage = 'Good job! Review the questions you missed to improve further.';
        feedbackColor = 'text-yellow-600';
    } else {
        feedbackMessage = 'Keep practicing. Review the explanations below to understand the correct answers.';
        feedbackColor = 'text-red-600';
    }

    return (
        <div className='max-w-4xl mx-auto p-6 space-y-6'>
            <Card className='text-center p-8'>
                <CardHeader>
                    <CardTitle className='text-3xl font-bold mb-2'>Quiz Analysis</CardTitle>
                    <p className={`text-lg font-medium ${feedbackColor}`}>{feedbackMessage}</p>
                </CardHeader>
                <CardContent>
                    <div className='flex justify-center items-center gap-4 mb-8'>
                        <div className='text-center'>
                            <div className='text-5xl font-bold text-primary mb-1'>{percentage}%</div>
                            <div className='text-sm text-muted-foreground'>Total Score</div>
                        </div>
                        <div className='h-12 w-px bg-border mx-4' />
                        <div className='text-center'>
                            <div className='text-5xl font-bold text-primary mb-1'>
                                {score}/{questions.length}
                            </div>
                            <div className='text-sm text-muted-foreground'>Correct Answers</div>
                        </div>
                    </div>

                    <div className='text-left space-y-6'>
                        <h3 className='text-xl font-semibold border-b pb-2'>Detailed Review</h3>
                        <ScrollArea type='always' className='h-[500px] pr-0'>
                            <div className='space-y-6 pr-4'>
                                {questions.map((q, index) => {
                                    const userAnswer = userAnswers[q.id];
                                    const isCorrect = userAnswer === q.correctAnswer;

                                    return (
                                        <div key={q.id} className='border rounded-lg p-4 bg-card'>
                                            <div className='flex items-start gap-3 mb-3'>
                                                {isCorrect ? (
                                                    <CheckCircle2 className='w-6 h-6 text-green-500 shrink-0 mt-0.5' />
                                                ) : (
                                                    <XCircle className='w-6 h-6 text-red-500 shrink-0 mt-0.5' />
                                                )}
                                                <div>
                                                    <div className='font-medium mb-1'>
                                                        <span className='text-muted-foreground mr-2'>Q{index + 1}.</span>
                                                        {q.question}
                                                    </div>
                                                    <div className='flex gap-2 mt-2'>
                                                        {!isCorrect && (
                                                            <Badge
                                                                variant='destructive'
                                                                className='bg-red-100 text-red-800 hover:bg-red-100 border-red-200'
                                                            >
                                                                Your Answer: {userAnswer !== undefined ? q.options[userAnswer] : 'Skipped'}
                                                            </Badge>
                                                        )}
                                                        <Badge
                                                            variant='outline'
                                                            className='bg-green-100 text-green-800 hover:bg-green-100 border-green-200'
                                                        >
                                                            Correct Answer: {q.options[q.correctAnswer]}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='ml-9 bg-muted/50 p-3 rounded-md text-sm'>
                                                <div className='flex items-center gap-2 font-medium text-muted-foreground mb-1'>
                                                    <AlertCircle className='w-4 h-4' />
                                                    Explanation
                                                </div>
                                                {q.explanation}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </ScrollArea>
                    </div>
                </CardContent>
                <CardFooter className='flex justify-center gap-4 mt-6 pt-6 border-t'>
                    <Button variant='outline' onClick={onRetry}>
                        <RotateCcw className='size-4' />
                        Retry Quiz
                    </Button>
                    <Button asChild>
                        <Link to='/app/quiz'>Back to Quizzes</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
