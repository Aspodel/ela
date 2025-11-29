import { motion } from 'motion/react';
import { Book, MoreVertical, Volume2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  PartOfSpeechBadge,
  type VocabularyListItemDto,
} from '@/features/vocabulary';

type VocabularyCardProps = React.HTMLAttributes<HTMLDivElement> & {
  vocabulary: VocabularyListItemDto;
  onSelect: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export function VocabularyCard({
  vocabulary,
  onSelect,
  onEdit,
  onDelete,
}: VocabularyCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className='group relative h-full cursor-pointer overflow-hidden border-transparent bg-white/50 shadow-sm transition-all hover:border-primary/20 hover:shadow-md dark:bg-zinc-900/50'
        onClick={() => onSelect(vocabulary.id)}
      >
        <div className='absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100' />

        <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-2'>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-2'>
              <h3 className='text-2xl font-bold tracking-tight text-foreground'>
                {vocabulary.text}
              </h3>
              {vocabulary.ipa && (
                <span className='font-mono text-sm text-muted-foreground'>
                  /{vocabulary.ipa}/
                </span>
              )}
            </div>
            <div className='flex flex-wrap gap-1'>
              {vocabulary.partsOfSpeech.map((part, index) => (
                <PartOfSpeechBadge key={index} part={part.name} />
              ))}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='z-10 -mr-2 -mt-2 h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100'
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className='h-4 w-4' />
                <span className='sr-only'>Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => onEdit(vocabulary.id)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-destructive focus:text-destructive'
                onClick={() => onDelete(vocabulary.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <Book className='h-4 w-4' />
            <span>
              {vocabulary.definitionCount}{' '}
              {vocabulary.definitionCount === 1 ? 'definition' : 'definitions'}
            </span>
          </div>
        </CardContent>

        <CardFooter className='pt-0'>
          <Button
            variant='ghost'
            size='sm'
            className='h-8 w-full justify-start px-2 text-muted-foreground hover:text-primary'
            onClick={(e) => {
              e.stopPropagation();
              // Handle audio playback here if available
            }}
          >
            <Volume2 className='mr-2 h-4 w-4' />
            Listen
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
