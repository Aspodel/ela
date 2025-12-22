
import { useState } from "react";
import type { ReadingQuestion } from "../data/mock-questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ReadingSectionProps {
    questions: ReadingQuestion[];
    onComplete: (answers: Record<string, number>) => void;
}

export function ReadingSection({ questions, onComplete }: ReadingSectionProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleOptionSelect = (index: number) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: index
        }));
    };

    const handleNext = () => {
        if (isLastQuestion) {
            onComplete(answers);
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    return (
        <div className="h-[calc(100vh-140px)] grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Passage Panel */}
            <Card className="h-full overflow-hidden flex flex-col">
                <div className="p-4 bg-muted/50 border-b">
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Reading Passage</h3>
                </div>
                <ScrollArea className="flex-1 p-6">
                    <div className="prose dark:prose-invert max-w-none">
                        {currentQuestion.passage.split('\n').map((paragraph, i) => (
                            <p key={i} className="mb-4 leading-relaxed text-gray-800 dark:text-gray-200">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </ScrollArea>
            </Card>

            {/* Questions Panel */}
            <Card className="h-full flex flex-col">
                <div className="p-4 bg-muted/50 border-b">
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</h3>
                </div>
                <CardContent className="flex-1 p-6 flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-500">{currentQuestion.instruction}</p>
                            <h2 className="text-xl font-semibold">{currentQuestion.questionText}</h2>
                        </div>

                        <div className="space-y-3">
                            {currentQuestion.options.map((option, index) => {
                                const isSelected = answers[currentQuestion.id] === index;
                                return (
                                    <div
                                        key={index}
                                        onClick={() => handleOptionSelect(index)}
                                        className={cn(
                                            "flex items-center space-x-3 p-4 border rounded-lg transition-colors cursor-pointer",
                                            isSelected ? "bg-primary/10 border-primary" : "hover:bg-gray-50 dark:hover:bg-gray-800"
                                        )}
                                    >
                                        <div className={cn(
                                            "h-4 w-4 rounded-full border border-primary flex items-center justify-center",
                                            isSelected ? "bg-primary" : "bg-transparent"
                                        )}>
                                            {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                                        </div>
                                        <Label className="flex-1 cursor-pointer font-normal text-base">
                                            {option}
                                        </Label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex justify-end pt-8">
                        <Button
                            onClick={handleNext}
                            disabled={answers[currentQuestion.id] === undefined}
                            className="w-full sm:w-auto"
                        >
                            {isLastQuestion ? "Finish Reading Section" : "Next Question"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
