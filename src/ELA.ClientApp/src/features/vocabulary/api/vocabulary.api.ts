import { createCrudApi } from '@/lib/api-factory';
import type { CreateVocabularyDto } from './types';

export const vocabularyApi = createCrudApi<Vocabulary, Partial<Vocabulary>>({
  resource: 'vocabularies',
}).extend(({ customMutation }) => ({
  useCreateBulk: (options?: any) =>
    customMutation<{ vocabularies: CreateVocabularyDto[] }>({
      url: '/vocabularies/bulk',
      options,
    }),
}));
