import { apiClient } from '@/lib/api-client';
import type { QuizAttempt } from '../types';

export const historyService = {
    async getAttempts(quizId: string): Promise<QuizAttempt[]> {
        try {
            // Fetch all history and filter locally, or we could add a backend filter.
            // For now, consistent with previous behavior.
            const { data } = await apiClient.get<QuizAttempt[]>('/quizzes/history');
            return data
                .filter((a) => a.quizId === quizId)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } catch (error) {
            console.error('Failed to load quiz history:', error);
            return [];
        }
    },

    async getAllAttempts(): Promise<QuizAttempt[]> {
        try {
            const { data } = await apiClient.get<QuizAttempt[]>('/quizzes/history');
            return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } catch (error) {
            console.error('Failed to load all quiz history:', error);
            return [];
        }
    },

    async saveAttempt(attempt: Omit<QuizAttempt, 'id'>): Promise<QuizAttempt | null> {
        try {
            const payload = {
                quizId: attempt.quizId,
                score: attempt.score,
                totalQuestions: attempt.totalQuestions,
                timeSpent: attempt.timeSpent,
                userAnswers: attempt.userAnswers
            };

            const { data: newId } = await apiClient.post<string>(`/quizzes/${attempt.quizId}/submit`, payload);

            return {
                ...attempt,
                id: newId,
            };
        } catch (error) {
            console.error('Failed to save quiz attempt:', error);
            return null;
        }
    },
};
