import React from 'react';

import { Head } from '@/components/common/head';

type AuthLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <>
      <Head title={title} />
      <div className='min-h-screen flex justify-center items-center'>
        {children}
      </div>
    </>
  );
}
