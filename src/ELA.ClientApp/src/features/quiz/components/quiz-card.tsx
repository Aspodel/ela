import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Trophy } from 'lucide-react';
import { Link } from '@tanstack/react-router';

interface QuizCardProps {
    id: number;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    questionsCount: number;
    timeEstimate: string;
    points: number;
    tags: string[];
}

export function QuizCard({
    id,
    title,
    description,
    difficulty,
    questionsCount,
    timeEstimate,
    points,
    tags,
}: QuizCardProps) {
    const difficultyColor = {
        Easy: 'bg-green-100 text-green-800 hover:bg-green-100/80',
        Medium: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80',
        Hard: 'bg-red-100 text-red-800 hover:bg-red-100/80',
    };

    return (
        <Card className='flex flex-col h-full hover:shadow-md transition-shadow'>
            <CardHeader>
                <div className='flex justify-between items-start mb-2'>
                    <Badge variant='secondary' className={difficultyColor[difficulty]}>
                        {difficulty}
                    </Badge>
                    <div className='flex items-center text-sm text-muted-foreground'>
                        <Trophy className='w-4 h-4 mr-1 text-yellow-500' />
                        {points} pts
                    </div>
                </div>
                <CardTitle className='text-xl mb-1'>{title}</CardTitle>
                <CardDescription className='line-clamp-2'>{description}</CardDescription>
            </CardHeader>
            <CardContent className='grow'>
                <div className='flex flex-wrap gap-2 mb-4'>
                    {tags.map((tag) => (
                        <Badge key={tag} variant='outline' className='text-xs'>
                            {tag}
                        </Badge>
                    ))}
                </div>
                <div className='flex items-center text-sm text-muted-foreground gap-4'>
                    <div className='flex items-center'>
                        <Clock className='w-4 h-4 mr-1' />
                        {timeEstimate}
                    </div>
                    <div>{questionsCount} Questions</div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className='w-full' asChild>
                    <Link to='/app/quiz/$quizId' params={{ quizId: id.toString() }}>
                        Start Quiz
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
