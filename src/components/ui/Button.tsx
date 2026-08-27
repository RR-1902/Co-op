import React, { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'emerald';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      icon: Icon,
      iconPosition = 'left',
      isLoading = false,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none rounded-xl active:scale-[0.98] select-none';

    const variants = {
      primary:
        'bg-[#E8934A] hover:bg-[#F5A662] text-[#0A0A0B] font-bold shadow-md shadow-[#E8934A]/20 focus:ring-[#E8934A] border border-[#E8934A]/40',
      secondary:
        'bg-[#2A2A2E] hover:bg-[#333338] text-[#F5F5F4] border border-[#2A2A2E] shadow-sm focus:ring-[#E8934A]',
      outline:
        'border border-[#2A2A2E] hover:border-[#E8934A]/50 bg-[#1C1C1F] hover:bg-[#2A2A2E]/60 text-[#F5F5F4] focus:ring-[#E8934A]',
      ghost:
        'text-[#9B9B9F] hover:text-[#F5F5F4] hover:bg-[#2A2A2E]/60 focus:ring-[#E8934A]',
      destructive:
        'bg-[#F87171]/20 hover:bg-[#F87171]/30 text-[#F87171] border border-[#F87171]/30 focus:ring-[#F87171]',
      emerald:
        'bg-[#4ADE80]/20 hover:bg-[#4ADE80]/30 text-[#4ADE80] border border-[#4ADE80]/30 focus:ring-[#4ADE80]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-4 py-2 text-sm gap-2',
      lg: 'px-5 py-2.5 text-base gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
        ) : Icon && iconPosition === 'left' ? (
          <Icon className="w-4 h-4 shrink-0" />
        ) : null}
        <span>{children}</span>
        {!isLoading && Icon && iconPosition === 'right' && (
          <Icon className="w-4 h-4 shrink-0" />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
