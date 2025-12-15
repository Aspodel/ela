import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
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
import { Clock, Pause, Play, ArrowLeft } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { MOCK_QUIZZES } from '../data/mock-data';
import { QuizQuestion } from './quiz-question';
import { QuizResults } from './quiz-results';
import { QuizNavigation } from './quiz-navigation';

export function QuizSession({ quizId }: { quizId: string }) {
    const navigate = useNavigate();
    const quiz = MOCK_QUIZZES.find((q) => q.id === quizId);

    if (!quiz) {
        return <div>Quiz not found</div>;
    }

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
    const [showResults, setShowResults] = useState(false);
    const [timeLeft, setTimeLeft] = useState(quiz.timeLimit);
    const [isPaused, setIsPaused] = useState(false);

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const answeredCount = Object.keys(userAnswers).length;
    const progress = (answeredCount / quiz.questions.length) * 100;

    useEffect(() => {
        if (showResults || isPaused) return;

        const timer = setInterval(() => {
            setTimeLeft((prev: number) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setShowResults(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [showResults, isPaused]);

    // Save attempt when quiz finishes
    useEffect(() => {
        if (showResults) {
            import('../services/history-service').then(({ historyService }) => {
                const score = quiz.questions.reduce((acc, q) => {
                    const answer = userAnswers[q.id];
                    return acc + (q.correctAnswer === answer ? 1 : 0);
                }, 0);

                historyService.saveAttempt({
                    quizId: quiz.id,
                    date: new Date().toISOString(),
                    score,
                    totalQuestions: quiz.questions.length,
                    userAnswers,
                    timeSpent: quiz.timeLimit - timeLeft,
                });
            });
        }
    }, [showResults, quiz.id, quiz.questions, quiz.timeLimit, timeLeft, userAnswers]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleAnswerSelect = (index: number) => {
        setSelectedAnswer(index);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer !== null) {
            // Save answer
            const newUserAnswers = {
                ...userAnswers,
                [currentQuestion.id]: selectedAnswer,
            };
            setUserAnswers(newUserAnswers);
        }

        if (currentQuestionIndex < quiz.questions.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);

            // Check if next question is already answered
            const nextQuestionId = quiz.questions[nextIndex].id;
            const nextAnswer = userAnswers[nextQuestionId];
            setSelectedAnswer(nextAnswer !== undefined ? nextAnswer : null);
        } else {
            setShowResults(true);
        }
    };

    const handleNavigate = (index: number) => {
        // Save current answer before navigating if selected
        if (selectedAnswer !== null) {
            setUserAnswers((prev) => ({
                ...prev,
                [currentQuestion.id]: selectedAnswer,
            }));
        }

        setCurrentQuestionIndex(index);
        const targetQuestionId = quiz.questions[index].id;
        const existingAnswer = userAnswers[targetQuestionId];
        setSelectedAnswer(existingAnswer !== undefined ? existingAnswer : null);
    };

    const handleRetry = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setUserAnswers({});
        setShowResults(false);
        setTimeLeft(quiz.timeLimit);
        setIsPaused(false);
    };

    if (showResults) {
        return (
            <QuizResults
                questions={quiz.questions}
                userAnswers={userAnswers}
                onRetry={handleRetry}
            />
        );
    }

    return (
        <div className='max-w-4xl mx-auto p-6 space-y-6'>
            {/* Header */}
            <div className='flex items-center justify-between'>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant='ghost' size='sm' className='text-muted-foreground'>
                            <ArrowLeft className='w-4 h-4 mr-2' />
                            Back
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to leave?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Your progress will be lost if you leave the quiz now.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => navigate({ to: '/app/quiz' } as any)}>
                                Leave Quiz
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <div className='flex items-center gap-4'>
                    <div
                        className={`flex items-center font-medium ${timeLeft < 60 ? 'text-red-500' : 'text-muted-foreground'
                            }`}
                    >
                        <Clock className='w-4 h-4 mr-2' />
                        {formatTime(timeLeft)}
                    </div>
                    <Button
                        variant='outline'
                        size='icon'
                        onClick={() => setIsPaused(!isPaused)}
                    >
                        {isPaused ? <Play className='w-4 h-4' /> : <Pause className='w-4 h-4' />}
                    </Button>
                </div>
            </div>

            <Progress value={progress} className='h-2' />

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Main Content */}
                <div className='lg:col-span-2'>
                    {isPaused ? (
                        <div className='h-[400px] flex flex-col items-center justify-center border rounded-lg bg-muted/10'>
                            <Pause className='w-12 h-12 text-muted-foreground mb-4' />
                            <h3 className='text-xl font-semibold mb-2'>Quiz Paused</h3>
                            <p className='text-muted-foreground mb-6'>
                                Take a break! Your timer is paused.
                            </p>
                            <Button onClick={() => setIsPaused(false)}>Resume Quiz</Button>
                        </div>
                    ) : (
                        <QuizQuestion
                            question={currentQuestion}
                            currentQuestionIndex={currentQuestionIndex}
                            totalQuestions={quiz.questions.length}
                            selectedAnswer={selectedAnswer}
                            onSelectAnswer={handleAnswerSelect}
                            onNextQuestion={handleNextQuestion}
                        />
                    )}
                </div>

                {/* Sidebar / Navigation */}
                <div className='space-y-6'>
                    <div className='border rounded-lg p-4'>
                        <h3 className='font-semibold mb-4'>Questions</h3>
                        <QuizNavigation
                            totalQuestions={quiz.questions.length}
                            currentQuestionIndex={currentQuestionIndex}
                            userAnswers={userAnswers}
                            questions={quiz.questions}
                            onNavigate={handleNavigate}
                        />
                    </div>

                    <div className='border rounded-lg p-4 space-y-2 text-sm text-muted-foreground'>
                        <div className='flex items-center gap-2'>
                            <div className='w-3 h-3 rounded-full bg-primary' />
                            <span>Current</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='w-3 h-3 rounded-full bg-secondary' />
                            <span>Answered</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='w-3 h-3 rounded-full border' />
                            <span>Unanswered</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
