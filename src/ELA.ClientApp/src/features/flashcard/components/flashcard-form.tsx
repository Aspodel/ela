import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
    front: z.string().min(1, 'Front text is required'),
    back: z.string().min(1, 'Back text is required'),
});

export type FlashcardFormValues = z.infer<typeof formSchema>;

type FlashcardFormProps = {
    defaultValues?: Partial<FlashcardFormValues>;
    onSubmit: (values: FlashcardFormValues) => void;
    isPending?: boolean;
    onCancel?: () => void;
};

export function FlashcardForm({
    defaultValues,
    onSubmit,
    isPending,
    onCancel,
}: FlashcardFormProps) {
    const form = useForm<FlashcardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            front: '',
            back: '',
            ...defaultValues,
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='front'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Front</FormLabel>
                            <FormControl>
                                <Input placeholder='Term or Question' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='back'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Back</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Definition or Answer'
                                    className='resize-none min-h-[100px]'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex justify-end gap-2 pt-2'>
                    {onCancel && (
                        <Button type='button' variant='outline' onClick={onCancel}>
                            Cancel
                        </Button>
                    )}
                    <Button type='submit' disabled={isPending}>
                        {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                        Save Card
                    </Button>
                </div>
            </form>
        </Form>
    );
}
