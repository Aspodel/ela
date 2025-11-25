import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

import {
  getUser,
  loginRequest,
  registerRequest,
  logoutRequest,
} from '@/features/auth/api';
import { useAuthStore } from '@/stores/auth-store';

const authKey = ['auth', 'user'] as QueryKey;

const useUser = (
  options?: Omit<
    UseQueryOptions<User, Error, User, QueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  const token = useAuthStore((s) => s.accessToken);

  return useQuery({
    queryKey: authKey,
    queryFn: getUser,
    enabled: !!token, 
    retry: false,
    ...options,
  });
};

const useSignIn = (
  options?: Omit<
    UseMutationOptions<AuthResponse, Error, AuthCredentials>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: async (data, variables, context, _mutation) => {
      useAuthStore.getState().setAccessToken(data.accessToken);

      var user = await getUser();
      queryClient.setQueryData(authKey, user);

      const search = router.state.location.search
      const redirectTo = search?.redirectTo || '/app/dashboard';

      router.navigate({ to: redirectTo });

      options?.onSuccess?.(data, variables, context, _mutation);
    },
    onError: (error, variables, context, _mutation) => {
      useAuthStore.getState().clearAuth();
      queryClient.removeQueries({ queryKey: authKey });

      options?.onError?.(error, variables, context, _mutation);
    },
    ...options,
  });
};

const useSignUp = (
  options?: Omit<
    UseMutationOptions<SignUpResponse, Error, SignUpCredentials>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: registerRequest,
    onSuccess: async (data, variables, context, _mutation) => {
      useAuthStore.getState().setAccessToken(data.accessToken);

      var user = await getUser();
      queryClient.setQueryData(authKey, user);

      router.navigate({ to: '/app/dashboard' } as any);

      options?.onSuccess?.(data, variables, context, _mutation);
    },
    onError: (error, variables, context, _mutation) => {
      useAuthStore.getState().clearAuth();
      queryClient.removeQueries({ queryKey: authKey });

      options?.onError?.(error, variables, context, _mutation);
    },
    ...options,
  });
};

const useSignOut = (
  options?: Omit<UseMutationOptions<void, Error, void>, 'mutationFn'>
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: async (data, variables, context, _mutation) => {
      useAuthStore.getState().clearAuth();
      queryClient.clear();

      router.navigate({
        to: '/signin',
        search: {
          redirectTo: window.location.pathname,
        },
      } as any);

      options?.onSuccess?.(data, variables, context, _mutation);
    },
    onSettled: () => {
      useAuthStore.getState().setAccessToken(null);
      queryClient.clear();
    },
    ...options,
  });
};

export { useUser, useSignIn, useSignUp, useSignOut };
