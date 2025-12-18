import { useState } from "react";
import { aiService } from "@/api/ai-service";

export function useGemini() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<string | null>(null);

    const generateFeedback = async (prompt: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await aiService.generateResponse(prompt);
            setData(response.content);
            return response.content;
        } catch (err: any) {
            const errorMessage = err.response?.data || err.message || "Failed to generate AI feedback";
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        generateFeedback,
        isLoading,
        error,
        data,
        setData,
    };
}
