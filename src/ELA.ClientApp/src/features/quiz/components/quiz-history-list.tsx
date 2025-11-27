import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { historyService } from '../services/history-service';
import { MOCK_QUIZZES } from '../data/mock-data';
import { QuizResults } from './quiz-results';
import type { QuizAttempt } from '../types';
import { format } from 'date-fns';
import { Calendar, Clock, Trophy } from 'lucide-react';

export function QuizHistoryList() {
    const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
    const [selectedAttempt, setSelectedAttempt] = useState<QuizAttempt | null>(null);

    useEffect(() => {
        setAttempts(historyService.getAllAttempts());
    }, []);

    const getQuizTitle = (quizId: number) => {
        return MOCK_QUIZZES.find((q) => q.id === quizId)?.title || 'Unknown Quiz';
    };

    const getQuizQuestions = (quizId: number) => {
        return MOCK_QUIZZES.find((q) => q.id === quizId)?.questions || [];
    };

    const formatTimeSpent = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    const getScoreColor = (score: number, total: number) => {
        const percentage = (score / total) * 100;
        if (percentage >= 80) return 'default'; // Green-ish usually
        if (percentage >= 60) return 'secondary'; // Yellow-ish usually
        return 'destructive'; // Red
    };

    return (
        <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {attempts.length === 0 ? (
                    <div className='col-span-full text-center py-12 text-muted-foreground border rounded-lg border-dashed'>
                        <p>No quiz attempts found.</p>
                        <p className='text-sm'>Complete a quiz to see your history here.</p>
                    </div>
                ) : (
                    attempts.map((attempt) => (
                        <Card
                            key={attempt.id}
                            className='cursor-pointer hover:bg-muted/50 transition-colors'
                            onClick={() => setSelectedAttempt(attempt)}
                        >
                            <CardHeader className='pb-2'>
                                <div className='flex justify-between items-start'>
                                    <CardTitle className='text-base font-semibold line-clamp-1'>
                                        {getQuizTitle(attempt.quizId)}
                                    </CardTitle>
                                    <Badge variant={getScoreColor(attempt.score, attempt.totalQuestions)}>
                                        {Math.round((attempt.score / attempt.totalQuestions) * 100)}%
                                    </Badge>
                                </div>
                                <div className='text-xs text-muted-foreground flex items-center gap-1'>
                                    <Calendar className='w-3 h-3' />
                                    {format(new Date(attempt.date), "MMM d, yyyy 'at' HH:mm")}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className='flex items-center gap-4 text-sm'>
                                    <div className='flex items-center gap-1.5'>
                                        <Trophy className='w-4 h-4 text-yellow-500' />
                                        <span className='font-medium'>
                                            {attempt.score}/{attempt.totalQuestions}
                                        </span>
                                    </div>
                                    <div className='flex items-center gap-1.5'>
                                        <Clock className='w-4 h-4 text-blue-500' />
                                        <span>{formatTimeSpent(attempt.timeSpent)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <Dialog open={!!selectedAttempt} onOpenChange={(open) => !open && setSelectedAttempt(null)}>
                <DialogContent className='min-w-4xl max-h-[90vh] flex flex-col'>
                    <DialogHeader>
                        <DialogTitle>
                            Review: {selectedAttempt && getQuizTitle(selectedAttempt.quizId)}
                        </DialogTitle>
                    </DialogHeader>
                    <div className='flex-1 overflow-hidden'>
                        <ScrollArea className='max-h-[70vh] pr-4'>
                            {selectedAttempt && (
                                <QuizResults
                                    questions={getQuizQuestions(selectedAttempt.quizId)}
                                    userAnswers={selectedAttempt.userAnswers}
                                    onRetry={() => setSelectedAttempt(null)}
                                />
                            )}
                        </ScrollArea>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
