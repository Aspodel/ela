import { useState } from 'react';
import { MOCK_QUIZZES } from '../data/mock-data';
import { QuizCard } from './quiz-card';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { QuizHistoryList } from './quiz-history-list';
import { History } from 'lucide-react';

export function QuizList() {
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    return (
        <div className='space-y-6 p-6'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-3xl font-bold tracking-tight'>Quizzes</h1>
                    <p className='text-muted-foreground'>
                        Challenge yourself and track your progress with our curated quizzes.
                    </p>
                </div>
                <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
                    <DialogTrigger asChild>
                        <Button variant='outline'>
                            <History className='w-4 h-4' />
                            View History
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='min-w-4xl max-h-[80vh] gap-8 overflow-y-auto'>
                        <DialogHeader>
                            <DialogTitle>Quiz History</DialogTitle>
                        </DialogHeader>
                        <QuizHistoryList />
                    </DialogContent>
                </Dialog>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {MOCK_QUIZZES.map((quiz) => (
                    <QuizCard key={quiz.id} {...quiz} />
                ))}
            </div>
        </div>
    );
}
