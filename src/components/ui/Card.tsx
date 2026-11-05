import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat';
}

export default function Card({ className, variant = 'default', children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl',
        variant === 'default' && 'border-2 border-[#DAE5EF] p-5',
        variant === 'flat' && 'border border-[#DAE5EF] p-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

