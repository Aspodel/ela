import { toast } from 'sonner';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { cardApi, FlashcardForm, type FlashcardFormValues } from '@/features/flashcard';

type FlashcardEditDialogProps = {
    card: Card | null;
    onClose: () => void;
};

export function FlashcardEditDialog({ card, onClose }: FlashcardEditDialogProps) {
    const updateMutation = cardApi.useUpdate();

    const handleSubmit = (values: FlashcardFormValues) => {
        if (!card) return;

        updateMutation.mutate(
            {
                ...values,
                id: card.id,
            },
            {
                onSuccess: () => {
                    onClose();
                    toast.success('Flashcard updated successfully');
                },
            }
        );
    };

    return (
        <Dialog open={!!card} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Flashcard</DialogTitle>
                    <DialogDescription>
                        Make changes to your flashcard here.
                    </DialogDescription>
                </DialogHeader>
                {card && (
                    <FlashcardForm
                        defaultValues={{
                            front: card.front,
                            back: card.back,
                        }}
                        onSubmit={handleSubmit}
                        isPending={updateMutation.isPending}
                        onCancel={onClose}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
