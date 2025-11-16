import { createFileRoute, Outlet } from '@tanstack/react-router';

import { AppLayout } from '@/components/common/layouts';

export const Route = createFileRoute('/app')({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});
