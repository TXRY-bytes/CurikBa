import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'soft' | 'bad' | 'ghost' | 'onsky';
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', block = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 border-0 rounded-xl font-black tracking-wide uppercase transition-transform transition-shadow duration-75',
          'active:translate-y-1 active:shadow-none disabled:translate-y-0',
          'disabled:bg-[#EDF3F9] disabled:text-[#8AA0B4] disabled:shadow-none disabled:cursor-not-allowed',
          {
            'bg-[#5DB8F5] text-[#08263F] shadow-[0_4px_0_#2E8FD6] hover:brightness-105': variant === 'primary',
            'bg-white text-[#1273BC] border-2 border-[#DAE5EF] shadow-[0_4px_0_#DAE5EF]': variant === 'soft',
            'bg-[#EF6B63] text-[#2A0A0A] shadow-[0_4px_0_#C74B44]': variant === 'bad',
            'bg-transparent text-[#56708A] border-2 border-[#DAE5EF] shadow-[0_4px_0_#DAE5EF]': variant === 'ghost',
            'bg-white/30 text-[#08263F] border-2 border-[#08263F]/25 shadow-[0_4px_0_rgba(8,38,63,.2)]': variant === 'onsky',
          },
          {
            'px-3 py-2 text-xs': size === 'sm',
            'px-5 py-3 text-sm': size === 'md',
            'px-7 py-4 text-base': size === 'lg',
          },
          block && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

