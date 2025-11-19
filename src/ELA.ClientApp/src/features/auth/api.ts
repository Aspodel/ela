import z from 'zod';

import { apiClient } from '@/lib/api-client';

const authCredentialsSchema = z.object({
  username: z.string().min(1, 'Required'),
  password: z.string().min(6, 'Required'),
});

type AuthCredentials = z.infer<typeof authCredentialsSchema>;

const signUpCredentialsSchema = z.object({
  username: z.string().min(1, 'Required'),
  password: z.string().min(6, 'Required'),
  email: z.string().min(1, 'Required').optional(),
  firstName: z.string().min(1, 'Required').optional(),
  lastName: z.string().min(1, 'Required').optional(),
});

type SignUpCredentials = z.infer<typeof signUpCredentialsSchema>;

const getUser = async (): Promise<User> => {
  const { data } = await apiClient.get('/users/me');
  return data;
};

const loginRequest = async (data: AuthCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/login', data);
  return response.data;
};

const registerRequest = async (
  data: SignUpCredentials
): Promise<SignUpResponse> => {
  const response = await apiClient.post('/auth/register', data);
  return response.data;
};

const logoutRequest = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
};

export {
  getUser,
  loginRequest,
  registerRequest,
  logoutRequest,
  type AuthCredentials,
  type SignUpCredentials,
};
