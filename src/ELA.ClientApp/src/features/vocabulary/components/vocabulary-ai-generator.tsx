import { useState, useEffect } from 'react';
import { Sparkles, Loader2, Save, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { aiService } from '@/api/ai-service';
import { vocabularyApi } from '../api/vocabulary.api';
import type { CreateVocabularyDto } from '../api/types';

export interface VocabularyAIGeneratorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export const VocabularyAIGenerator = ({
    open,
    onOpenChange,
    onSuccess,
}: VocabularyAIGeneratorProps) => {
    const [topic, setTopic] = useState('');
    const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);
    const [count, setCount] = useState(5);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedVocabularies, setGeneratedVocabularies] = useState<CreateVocabularyDto[]>([]);
    const [step, setStep] = useState<'topic' | 'preview'>('topic');

    const createBulk = vocabularyApi.useCreateBulk({
        onSuccess: () => {
            toast.success('All vocabularies saved successfully!');
            onSuccess?.();
            onOpenChange(false);
            reset();
        },
        onError: (error: any) => {
            toast.error('Failed to save vocabularies');
            console.error(error);
        }
    });

    useEffect(() => {
        if (open && suggestedTopics.length === 0) {
            loadTopics();
        }
    }, [open]);

    const loadTopics = async () => {
        try {
            const topics = await aiService.getSuggestedTopics();
            setSuggestedTopics(topics);
        } catch (error) {
            console.error('Failed to load topics', error);
        }
    };

    const handleGenerate = async () => {
        if (!topic.trim()) {
            toast.error('Please enter or select a topic');
            return;
        }

        setIsGenerating(true);
        try {
            const result = await aiService.generateVocabularies(topic, count);
            // Cast since the DTOs match exactly what we need for bulk create
            setGeneratedVocabularies(result as any);
            setStep('preview');
            toast.success(`Generated ${result.length} vocabularies!`);
        } catch (error) {
            toast.error('Failed to generate vocabularies');
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSaveAll = async () => {
        createBulk.mutate({ vocabularies: generatedVocabularies });
    };

    const reset = () => {
        setStep('topic');
        setGeneratedVocabularies([]);
        setTopic('');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary fill-primary/10" />
                        Create with AI
                    </DialogTitle>
                    <DialogDescription>
                        {step === 'topic'
                            ? 'Choose a topic and let AI generate vocabularies for you.'
                            : `Review the ${generatedVocabularies.length} generated items before saving.`}
                    </DialogDescription>
                </DialogHeader>

                {step === 'topic' ? (
                    <div className="space-y-6 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Topic</label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="e.g. Travel, Technology, Cooking..."
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                                />
                                <Button variant="outline" size="icon" onClick={loadTopics} title="Refresh topics">
                                    <RefreshCw className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {suggestedTopics.map((t) => (
                                    <Badge
                                        key={t}
                                        variant={topic === t ? 'default' : 'secondary'}
                                        className="cursor-pointer hover:bg-primary/20 transition-colors"
                                        onClick={() => setTopic(t)}
                                    >
                                        {t}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Number of words: {count}</label>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                value={count}
                                onChange={(e) => setCount(parseInt(e.target.value))}
                                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>1</span>
                                <span>10</span>
                                <span>20</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <ScrollArea className="flex-1 -mx-6 px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                            {generatedVocabularies.map((vocab, index) => (
                                <div key={index} className="opacity-90 grayscale-[0.5] hover:grayscale-0 transition-all">
                                    <div className="p-4 border rounded-lg bg-card h-full">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-lg">{vocab.text}</h4>
                                            {vocab.ipa && <span className="text-sm text-muted-foreground">/{vocab.ipa}/</span>}
                                        </div>
                                        {vocab.definitions?.map((def, di) => (
                                            <div key={di} className="text-sm space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="text-[10px] uppercase">
                                                        {def.partOfSpeech}
                                                    </Badge>
                                                    <span className="font-medium">{def.meaning}</span>
                                                </div>
                                                {def.translation && (
                                                    <p className="text-muted-foreground italic">{def.translation}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                )}

                <DialogFooter className="gap-2 sm:gap-0">
                    {step === 'topic' ? (
                        <Button onClick={handleGenerate} disabled={isGenerating} className="w-full sm:w-auto">
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Generate
                                </>
                            )}
                        </Button>
                    ) : (
                        <>
                            <Button variant="outline" onClick={() => setStep('topic')} disabled={createBulk.isPending}>
                                Back
                            </Button>
                            <Button onClick={handleSaveAll} disabled={createBulk.isPending}>
                                {createBulk.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save All
                                    </>
                                )}
                            </Button>
                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
