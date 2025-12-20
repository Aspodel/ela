import type { CreateVocabularyDto } from "@/features/vocabulary";
import { apiClient } from "@/lib/api-client";

export interface AIResponse {
    content: string;
}

export interface GenerateVocabulariesRequest {
    topic: string;
    count: number;
}

export const aiService = {
    generateResponse: async (prompt: string): Promise<AIResponse> => {
        const response = await apiClient.post<AIResponse>("/ai/generate", { prompt });
        return response.data;
    },

    getSuggestedTopics: async (): Promise<string[]> => {
        const response = await apiClient.get<string[]>("/ai/topics");
        return response.data;
    },

    generateVocabularies: async (topic: string, count: number): Promise<CreateVocabularyDto[]> => {
        const response = await apiClient.post<CreateVocabularyDto[]>("/ai/vocabularies", { topic, count });
        return response.data;
    },

    generateMockTestQuestions: async <T>(type: string, count: number): Promise<T[]> => {
        const response = await apiClient.post<T[]>("/ai/mock-test", { type, count });
        return response.data;
    }
};
