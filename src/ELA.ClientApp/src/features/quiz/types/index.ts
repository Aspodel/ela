export interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
}

export interface Quiz {
    id: string;
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
    quizId: string;
    date: string; // ISO string
    score: number;
    totalQuestions: number;
    userAnswers: Record<string, number>;
    timeSpent: number; // in seconds
}
