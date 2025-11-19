// import { z } from 'zod';
// import {
//   useQueryClient,
//   type QueryKey,
//   type UseMutationOptions,
//   type UseQueryOptions,
// } from '@tanstack/react-query';
// import { apiClient } from '@/lib/api-client';
// import { useAuthStore } from '@/stores/auth-store';
// import { useApiQuery } from '@/hooks/useApiQuery';
// import { useApiMutation } from '@/hooks/useApiMutation';

// const authKey = ['auth', 'user'] as QueryKey;

// // Validation schemas
// const authCredentialsSchema = z.object({
//   username: z.string().min(1, 'Required'),
//   password: z.string().min(6, 'Required'),
// });
// type AuthCredentials = z.infer<typeof authCredentialsSchema>;

// const signUpCredentialsSchema = z.object({
//   username: z.string().min(1, 'Required'),
//   password: z.string().min(6, 'Required'),
//   email: z.string().min(1, 'Required').optional(),
//   firstName: z.string().min(1, 'Required').optional(),
//   lastName: z.string().min(1, 'Required').optional(),
// });
// type SignUpCredentials = z.infer<typeof signUpCredentialsSchema>;

// const getUser = async (): Promise<User> => {
//   const { data } = await apiClient.get('/users/me');
//   return data;
// };

// const loginRequest = async (data: AuthCredentials): Promise<AuthResponse> => {
//   const response = await apiClient.post('/auth/login', data);
//   useAuthStore.getState().setAccessToken(response.data.accessToken);
//   return response.data;
// };

// const registerRequest = async (
//   data: SignUpCredentials
// ): Promise<SignUpResponse> => {
//   const response = await apiClient.post('/auth/register', data);
//   useAuthStore.getState().setAccessToken(response.data.accessToken);
//   return response.data;
// };

// const logoutRequest = async (): Promise<void> => {
//   await apiClient.post('/auth/logout');
// };

// // Auth hooks
// const useUser = (
//   options?: Omit<
//     UseQueryOptions<User, Error, User, QueryKey>,
//     'queryKey' | 'queryFn'
//   >
// ) =>
//   useApiQuery(authKey, getUser, {
//     retry: false,
//     ...options,
//   });
// useUser.getQueryKey = () => authKey;

// const useSignIn = (
//   options?: Omit<
//     UseMutationOptions<AuthResponse, Error, AuthCredentials>,
//     'mutationFn'
//   >
// ) => useApiMutation<AuthResponse, AuthCredentials>(loginRequest, options);

// const useSignUp = (
//   options?: Omit<
//     UseMutationOptions<SignUpResponse, Error, SignUpCredentials>,
//     'mutationFn'
//   >
// ) =>
//   useApiMutation<SignUpResponse, SignUpCredentials>(registerRequest, options);

// const useSignOut = (
//   options?: Omit<UseMutationOptions<void, Error, void>, 'mutationFn'>
// ) => {
//   const queryClient = useQueryClient();

//   return useApiMutation<void, void>(logoutRequest, {
//     ...options,
//     onSuccess: (data, variables, context, _mutation) => {
//       queryClient.clear();
//       useAuthStore.getState().setAccessToken(null);

//       if (options?.onSuccess) {
//         options.onSuccess(data, variables, context, _mutation);
//       }
//     },
//   });
// };

// export { useUser, useSignIn, useSignUp, useSignOut };
