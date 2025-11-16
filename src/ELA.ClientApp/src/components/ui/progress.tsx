import * as React from 'react';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

export function Progress({
  value = 0,
  className = '',
  ...props
}: ProgressProps) {
  const percent = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div className={`w-full bg-muted rounded-full h-2 ${className}`} {...props}>
      <div
        className='h-2 rounded-full transition-all'
        style={{
          width: `${percent}%`,
          background: 'linear-gradient(90deg, #7c3aed 0%, #06b6d4 100%)',
        }}
        role='progressbar'
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}

export default Progress;
