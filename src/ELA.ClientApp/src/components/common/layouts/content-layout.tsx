import React from 'react';

import { Head } from '@/components/common/head';

type ContentLayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  toolbar?: React.ReactNode;
};

export const ContentLayout: React.FC<ContentLayoutProps> = ({
  title,
  description,
  toolbar,
  children,
}) => (
  <>
    <Head title={title} />
    <div>
      <div className='flex justify-between items-center mb-6'>
        <div>
          {title && <h1 className='text-4xl font-bold'>{title}</h1>}
          {description && (
            <p className='text-muted-foreground'>{description}</p>
          )}
        </div>
        <div>{toolbar}</div>
      </div>
    </div>
    <div className='flex-1 flex flex-col'>{children}</div>
  </>
);