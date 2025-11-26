import type { QuizAttempt } from '../types';

const STORAGE_KEY = 'ela_quiz_history';

export const historyService = {
    getAttempts(quizId: number): QuizAttempt[] {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return [];
            const allAttempts: QuizAttempt[] = JSON.parse(stored);
            return allAttempts
                .filter((a) => a.quizId === quizId)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } catch (error) {
            console.error('Failed to load quiz history:', error);
            return [];
        }
    },

    getAllAttempts(): QuizAttempt[] {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return [];
            const allAttempts: QuizAttempt[] = JSON.parse(stored);
            return allAttempts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } catch (error) {
            console.error('Failed to load all quiz history:', error);
            return [];
        }
    },

    saveAttempt(attempt: Omit<QuizAttempt, 'id'>) {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            const allAttempts: QuizAttempt[] = stored ? JSON.parse(stored) : [];

            const newAttempt: QuizAttempt = {
                ...attempt,
                id: crypto.randomUUID(),
            };

            allAttempts.push(newAttempt);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(allAttempts));
            return newAttempt;
        } catch (error) {
            console.error('Failed to save quiz attempt:', error);
            return null;
        }
    },
};
