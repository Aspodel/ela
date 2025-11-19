import { createFileRoute } from '@tanstack/react-router';

import { AuthLayout } from '@/components/common/layouts/auth-layout';
import SigninForm from '@/features/auth/components/signin-form';

export const Route = createFileRoute('/_auth/signin')({
  component: SignIn,
});

function SignIn() {
  return (
    <AuthLayout title='Sign In'>
      <SigninForm />
    </AuthLayout>
  );
}
