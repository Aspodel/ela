import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

export const useApiMutation = <T, U>(
  mutationFn: (data: U) => Promise<T>,
  options?: Omit<UseMutationOptions<T, Error, U>, 'mutationFn'>
) => {
  return useMutation<T, Error, U>({
    mutationFn,
    ...options,
  });
};