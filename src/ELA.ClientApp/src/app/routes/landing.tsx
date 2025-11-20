import { createFileRoute } from '@tanstack/react-router';

import LandingPage from '../../components/common/landing-page';

export const Route = createFileRoute('/landing')({
  component: RouteComponent,
});

function RouteComponent() {
  return <LandingPage />;
}
