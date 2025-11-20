import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import { NotFound } from '@/components/common/not-found';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => <Outlet />,
  notFoundComponent: () => {
    return <NotFound />;
  },
});