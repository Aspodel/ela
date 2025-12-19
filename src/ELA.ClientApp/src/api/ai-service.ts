import { apiClient } from "@/lib/api-client";
import { CreateVocabularyCommand } from "@/features/vocabulary/types";

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

    generateVocabularies: async (topic: string, count: number): Promise<CreateVocabularyCommand[]> => {
        const response = await apiClient.post<CreateVocabularyCommand[]>("/ai/vocabularies", { topic, count });
        return response.data;
    }
};
