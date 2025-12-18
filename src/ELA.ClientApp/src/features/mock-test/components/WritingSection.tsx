
import { useState } from "react";
import type { WritingQuestion } from "../data/mock-questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useGemini } from "@/hooks/use-gemini";
import { Loader2, Sparkles } from "lucide-react";

interface WritingSectionProps {
    questions: WritingQuestion[];
    onComplete: (essays: Record<string, string>) => void;
}

export function WritingSection({ questions, onComplete }: WritingSectionProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [essays, setEssays] = useState<Record<string, string>>({});
    const { generateFeedback, isLoading, data: aiFeedback, setData: setAiFeedback } = useGemini();

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const currentEssay = essays[currentQuestion.id] || "";
    const wordCount = currentEssay.trim() === "" ? 0 : currentEssay.trim().split(/\s+/).length;

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEssays(prev => ({
            ...prev,
            [currentQuestion.id]: e.target.value
        }));
    };

    const handleNext = () => {
        if (isLastQuestion) {
            onComplete(essays);
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
            setAiFeedback(null);
        }
    };

    const handleGetFeedback = async () => {
        if (!currentEssay.trim()) return;

        const prompt = `
            You are an IELTS/English writing examiner. 
            Evaluate the following essay based on:
            1. Task Response
            2. Coherence and Cohesion
            3. Lexical Resource
            4. Grammatical Range and Accuracy
            
            Instruction: ${currentQuestion.instruction}
            Prompt: ${currentQuestion.prompt}
            
            Essay:
            ${currentEssay}
            
            Provide a concise critique and suggest improvements.
        `;

        try {
            await generateFeedback(prompt);
        } catch (error) {
            console.error("AI feedback failed:", error);
        }
    };

    return (
        <div className="h-[calc(100vh-140px)] grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Prompt Panel */}
            <Card className="h-full overflow-hidden flex flex-col">
                <div className="p-4 bg-muted/50 border-b">
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Task Info</h3>
                </div>
                <div className="p-6 space-y-6 overflow-auto">
                    <div className="space-y-4">
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-500">{currentQuestion.instruction}</p>

                        {currentQuestion.imageUrl && (
                            <img
                                src={currentQuestion.imageUrl}
                                alt="Writing Prompt"
                                className="w-full max-h-64 object-contain rounded-md border"
                            />
                        )}

                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-l-4 border-l-primary">
                            <p className="font-medium text-lg leading-relaxed">{currentQuestion.prompt}</p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Writing Panel */}
            <Card className="h-full flex flex-col">
                <div className="p-4 bg-muted/50 border-b flex justify-between items-center">
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Your Response</h3>
                    <span className="text-xs font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded border">
                        {wordCount} words {currentQuestion.minWords ? `/ min ${currentQuestion.minWords}` : ''}
                    </span>
                </div>
                <CardContent className="flex-1 p-6 flex flex-col">
                    <Textarea
                        value={currentEssay}
                        onChange={handleTextChange}
                        placeholder="Start typing your response here..."
                        className="flex-1 resize-none p-4 text-base leading-relaxed font-serif"
                    />

                    {aiFeedback && (
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg animate-in fade-in slide-in-from-bottom-2">
                            <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-400">
                                <Sparkles className="h-4 w-4" />
                                <span className="text-sm font-semibold uppercase tracking-wider">AI feedback</span>
                            </div>
                            <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
                                {aiFeedback}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between items-center pt-6">
                        <div className="flex gap-2 items-center">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleGetFeedback}
                                disabled={isLoading || !currentEssay.trim()}
                                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                ) : (
                                    <Sparkles className="h-4 w-4 mr-2" />
                                )}
                                Get AI Feedback
                            </Button>
                            <div className="text-sm text-muted-foreground">
                                {currentQuestion.minWords && wordCount < currentQuestion.minWords && (
                                    <span className="text-amber-600">Please reach the minimum word count.</span>
                                )}
                            </div>
                        </div>
                        <Button onClick={handleNext}>
                            {isLastQuestion ? "Finish Writing Section" : "Next Task"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
