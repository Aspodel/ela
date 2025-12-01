import { motion } from 'motion/react';
import { Book, Volume2 } from 'lucide-react';

import {
  PartOfSpeechBadge,
  VocabularyCardDropdown,
  type VocabularyListItemDto,
} from '@/features/vocabulary';
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';

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
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Item
        variant='outline'
        className='group relative h-full cursor-pointer overflow-hidden border-transparent bg-white/50 shadow-sm transition-all hover:border-primary/20 hover:shadow-md dark:bg-zinc-900/50'
      >
        <div className='absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100' />

        <ItemContent className='gap-4 z-10' onClick={() => onSelect(vocabulary.id)}>
          <div className='flex flex-col gap-2'>
            <ItemTitle className='text-2xl font-semibold tracking-tight'>{vocabulary.text}</ItemTitle>

            <div className='flex flex-wrap gap-1'>
              {vocabulary.partsOfSpeech.map((part, index) => (
                <PartOfSpeechBadge key={index} part={part.name} />
              ))}
            </div>
          </div>

          {vocabulary.ipa && (
            <ItemDescription className='flex items-center gap-2 font-mono pl-0.5'>
              <Volume2 className='size-4' />
              /{vocabulary.ipa}/
            </ItemDescription>
          )}

          <ItemDescription className='flex items-center gap-2'>
            <Book className='size-4' />
            <span>
              {vocabulary.definitionCount}{' '}
              {vocabulary.definitionCount === 1 ? 'definition' : 'definitions'}
            </span>
          </ItemDescription>
        </ItemContent>

        <VocabularyCardDropdown
          onDelete={() => onDelete(vocabulary.id)}
          onEdit={() => onEdit(vocabulary.id)}
        />
      </Item>
    </motion.div>
  );
}
