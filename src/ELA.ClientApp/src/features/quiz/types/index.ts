export interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
}

export interface Quiz {
    id: number;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    questionsCount: number;
    timeEstimate: string;
    timeLimit: number; // in seconds
    points: number;
    tags: string[];
    questions: Question[];
}

export interface QuizAttempt {
    id: string;
    quizId: number;
    date: string; // ISO string
    score: number;
    totalQuestions: number;
    userAnswers: Record<number, number>;
    timeSpent: number; // in seconds
}
