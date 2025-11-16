import { NotFound } from '@/components/common/not-found';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => <Outlet />,

  notFoundComponent: () => {
    return <NotFound />;
  },
});
