
import { useState } from "react";
import type { WritingQuestion } from "../data/mock-questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface WritingSectionProps {
    questions: WritingQuestion[];
    onComplete: (essays: Record<string, string>) => void;
}

export function WritingSection({ questions, onComplete }: WritingSectionProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [essays, setEssays] = useState<Record<string, string>>({});

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

                    <div className="flex justify-between items-center pt-6">
                        <div className="text-sm text-muted-foreground">
                            {currentQuestion.minWords && wordCount < currentQuestion.minWords && (
                                <span className="text-amber-600">Please reach the minimum word count.</span>
                            )}
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
