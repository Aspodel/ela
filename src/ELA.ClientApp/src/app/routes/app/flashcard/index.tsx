import { createFileRoute } from '@tanstack/react-router';

import { ContentLayout } from '@/components/common/layouts';
import { deckApi, DeckCreateDialog, DeckList } from '@/features/flashcard';

export const Route = createFileRoute('/app/flashcard/')({
  component: RouteComponent,
});

function RouteComponent() {
  const deck = deckApi.useSearch({});

  return (
    <ContentLayout
      title='Decks'
      description='Browse and manage your flashcard decks'
      toolbar={<DeckCreateDialog />}
    >
      <div className='flex flex-col h-full gap-4'>
        <DeckList items={deck.data.items} />
      </div>
    </ContentLayout>
  );
}
