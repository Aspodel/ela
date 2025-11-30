import { createCrudApi } from '@/lib/api-factory';

export interface CardParams {
  deckId: number;
  page?: number;
  pageSize?: number;
}

export const cardApi = createCrudApi<Card, Partial<Card>, CardParams>({
  resource: 'cards',
  baseUrl: (p) => `/decks/${p.deckId}/cards`,
}).extend((base) => ({
  // GET /decks/:deckId/cards/due
  useDue: (params: { deckId: number }) =>
    base.customQuery<Card[]>({
      key: ['cards', 'due', params.deckId],
      url: `/decks/${params.deckId}/cards/due`,
    }),

  // POST /decks/:deckId/cards/bulk
  useBulkCreate: () =>
    base.customMutation<{ deckId: number; cards: Partial<Card>[] }, Card[]>({
      url: ({ deckId }) => `/decks/${deckId}/cards/bulk`,
      method: 'post',
    }),

  // POST /decks/:deckId/cards/:id/review
  useReview: () =>
    base.customMutation<
      {
        deckId: number;
        cardId: number;
        qualityRating: number;
        reviewDate: string;
      },
      void
    >({
      url: ({ deckId, cardId }) => `/decks/${deckId}/cards/${cardId}/review`,
      method: 'post',
    }),
}));