import { useAuthStore } from '@/stores/auth-store';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/_auth')({
  validateSearch: z.object({
    redirectTo: z.string().optional().catch(''),
  }),
  beforeLoad: async () => {
    if (useAuthStore.getState().accessToken) {
      throw redirect({ to: '/app/dashboard' });
    }
  },
  component: Outlet,
});