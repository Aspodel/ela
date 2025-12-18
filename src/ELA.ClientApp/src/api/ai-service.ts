import { apiClient } from "@/lib/api-client";

export interface AIResponse {
    content: string;
}

export const aiService = {
    generateResponse: async (prompt: string): Promise<AIResponse> => {
        const response = await apiClient.post<AIResponse>("/ai/generate", { prompt });
        return response.data;
    },
};
