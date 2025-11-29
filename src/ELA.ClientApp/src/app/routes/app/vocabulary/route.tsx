import React from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';

import { ContentLayout } from '@/components/common/layouts';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  PARTS_OF_SPEECH,
  SectionCards,
  vocabularyApi,
  VocabularyCreateDialog,
  VocabularyList,
  type VocabularyListItemDto,
} from '@/features/vocabulary';

export const Route = createFileRoute('/app/vocabulary')({
  component: RouteComponent,
});

function RouteComponent() {
  const [search, setSearch] = React.useState('');
  const [selectedPos, setSelectedPos] = React.useState<string>('all');
  const vocab = vocabularyApi.useList<PaginatedList<VocabularyListItemDto>>({
    pageSize: 100,
  });

  const filteredVocabulary =
    vocab.data?.items?.filter((item) => {
      const matchesSearch = item.text
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesPos =
        selectedPos === 'all' ||
        item.partsOfSpeech.some((p) => p.name === selectedPos);
      return matchesSearch && matchesPos;
    }) ?? [];

  return (
    <ContentLayout
      title='Vocabulary'
      description='Manage your vocabulary here.'
    >
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4'>
          <SectionCards />
          <div className='px-4 lg:px-6'>{/* <ChartAreaInteractive /> */}</div>
          {/* <DataTable data={data} /> */}
          <div className='flex gap-4 px-4 lg:px-6'>
            <div className='basis-1/2'>{/* <ChartPieDonut /> */}</div>
            <div className='basis-1/2'>{/* <ChartBarMixed /> */}</div>
          </div>

          <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
            <div className='flex flex-1 flex-col gap-2 sm:flex-row'>
              <Input
                className='w-full max-w-xs'
                placeholder='Search vocabulary...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Select value={selectedPos} onValueChange={setSelectedPos}>
                <SelectTrigger className='w-full max-w-[180px]'>
                  <SelectValue placeholder='Part of Speech' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Parts</SelectItem>
                  {PARTS_OF_SPEECH.map((pos) => (
                    <SelectItem key={pos} value={pos}>
                      {pos.charAt(0).toUpperCase() + pos.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <VocabularyCreateDialog />
          </div>
          <VocabularyList items={filteredVocabulary} />
          <Outlet />
        </div>
      </div>
    </ContentLayout>
  );
}
