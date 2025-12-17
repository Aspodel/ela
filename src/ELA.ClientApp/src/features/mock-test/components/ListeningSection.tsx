
import { useState } from "react";
import type { ListeningQuestion } from "../data/mock-questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListeningSectionProps {
    questions: ListeningQuestion[];
    onComplete: (answers: Record<string, number>) => void;
}

export function ListeningSection({ questions, onComplete }: ListeningSectionProps) {
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
        <div className="max-w-3xl mx-auto space-y-8">
            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="flex flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-4">
                        {currentQuestion.imageUrl && (
                            <img
                                src={currentQuestion.imageUrl}
                                alt="Listening Question"
                                className="max-h-64 object-contain rounded-md shadow-sm"
                            />
                        )}

                        <div className="flex items-center space-x-4 w-full bg-white dark:bg-gray-700 p-4 rounded-full shadow-sm">
                            <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full">
                                <PlayCircle className="h-10 w-10 text-primary" />
                            </Button>
                            <div className="h-2 flex-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                <div className="h-full w-1/3 bg-primary" /> {/* Mock progress */}
                            </div>
                            <span className="text-sm font-medium">0:15 / 0:45</span>
                        </div>
                        <p className="text-sm text-muted-foreground text-center">{currentQuestion.instruction}</p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Select the best answer:</h3>
                        <div className="space-y-3">
                            {currentQuestion.options.map((option, index) => {
                                const isSelected = answers[currentQuestion.id] === index;
                                return (
                                    <div
                                        key={index}
                                        onClick={() => handleOptionSelect(index)}
                                        className={cn(
                                            "flex items-center space-x-3 p-3 border rounded-lg transition-colors cursor-pointer",
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

                    <div className="flex justify-end pt-4">
                        <Button onClick={handleNext} disabled={answers[currentQuestion.id] === undefined}>
                            {isLastQuestion ? "Finish Listening Section" : "Next Question"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
