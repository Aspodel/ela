import React from 'react';
import { toast } from 'sonner';
import { PlusIcon } from 'lucide-react';
import { useParams } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { cardApi, FlashcardForm, type FlashcardFormValues } from '@/features/flashcard';

export function FlashcardCreateDialog() {
    const [open, setOpen] = React.useState(false);
    const { deckId } = useParams({ from: '/app/flashcard/$deckId/' });

    const createMutation = cardApi.useCreate();

    const handleSubmit = (values: FlashcardFormValues) => {
        createMutation.mutate(
            {
                ...values,
                deckId: Number(deckId),
            },
            {
                onSuccess: () => {
                    setOpen(false);
                    toast.success('Flashcard created successfully');
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className='size-4' />
                    Add Card
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Flashcard</DialogTitle>
                    <DialogDescription>
                        Create a new flashcard for this deck.
                    </DialogDescription>
                </DialogHeader>
                <FlashcardForm
                    onSubmit={handleSubmit}
                    isPending={createMutation.isPending}
                    onCancel={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
