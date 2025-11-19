import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from '@tanstack/react-query';

export const useApiQuery = <T>(
  queryKey: QueryKey,
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T, Error, T, QueryKey>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<T>({
    queryKey,
    queryFn,
    ...options,
  });
};