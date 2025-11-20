import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { useAuthStore } from '@/stores/auth-store';
import { AppLayout } from '@/components/common/layouts';

export const Route = createFileRoute('/app')({
  beforeLoad: async ({ location }) => {
    if (!useAuthStore.getState().accessToken) {
      throw redirect({
        to: '/signin',
        search: { redirectTo: location.pathname },
      });
    }
  },
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});