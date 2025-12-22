
import { useState, useEffect } from "react";
import type { SpeakingQuestion } from "../data/mock-questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpeakingSectionProps {
    questions: SpeakingQuestion[];
    onComplete: (recordings: Record<string, boolean>) => void;
}

export function SpeakingSection({ questions, onComplete }: SpeakingSectionProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [status, setStatus] = useState<'preparation' | 'recording' | 'completed'>('preparation');
    const [timer, setTimer] = useState(0);
    const [recorded, setRecorded] = useState<Record<string, boolean>>({});

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    useEffect(() => {
        // Reset state for new question
        setStatus('preparation');
        setTimer(currentQuestion.preparationTimeSeconds);
    }, [currentQuestionIndex, currentQuestion]);

    useEffect(() => {
        if (timer <= 0) {
            if (status === 'preparation') {
                setStatus('recording');
                setTimer(currentQuestion.responseTimeSeconds);
            } else if (status === 'recording') {
                handleStopRecording();
            }
            return;
        }

        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, status, currentQuestion]);

    const handleStopRecording = () => {
        setRecorded(prev => ({
            ...prev,
            [currentQuestion.id]: true
        }));
        setStatus('completed');
    };

    const handleNext = () => {
        if (isLastQuestion) {
            onComplete(recorded);
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <Card>
                <CardContent className="p-8 space-y-8">
                    <div className="flex flex-col items-center space-y-4">
                        <div className={cn(
                            "px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider",
                            status === 'preparation' ? "bg-amber-100 text-amber-800" :
                                status === 'recording' ? "bg-rose-100 text-rose-800" :
                                    "bg-green-100 text-green-800"
                        )}>
                            {status === 'preparation' && "Preparation Time"}
                            {status === 'recording' && "Recording Time"}
                            {status === 'completed' && "Completed"}
                        </div>

                        <div className="text-6xl font-mono font-bold tabular-nums">
                            00:{timer < 10 ? `0${timer}` : timer}
                        </div>

                        {status === 'recording' && (
                            <div className="flex items-center space-x-2 text-rose-600 animate-pulse">
                                <span className="w-3 h-3 rounded-full bg-rose-600" />
                                <span className="text-sm font-medium">Recording...</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                            <h3 className="text-lg font-medium mb-4 text-center">{currentQuestion.instruction}</h3>
                            {currentQuestion.imageUrl && (
                                <div className="flex justify-center mb-6">
                                    <img
                                        src={currentQuestion.imageUrl}
                                        alt="Speaking Prompt"
                                        className="max-h-64 object-contain rounded-md shadow-sm"
                                    />
                                </div>
                            )}
                            <p className="text-xl text-center leading-relaxed font-serif">
                                {currentQuestion.prompt}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center pt-4">
                        {status === 'recording' ? (
                            <Button size="lg" variant="destructive" onClick={handleStopRecording} className="w-48">
                                <Square className="mr-2 h-5 w-5 fill-current" /> Stop Recording
                            </Button>
                        ) : status === 'completed' ? (
                            <Button size="lg" onClick={handleNext} className="w-48">
                                {isLastQuestion ? "Finish Speaking Section" : "Next Question"}
                            </Button>
                        ) : (
                            <Button size="lg" variant="outline" disabled className="w-48 opacity-50">
                                <Mic className="mr-2 h-5 w-5" /> Get Ready...
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
