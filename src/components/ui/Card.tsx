import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'interactive';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variantStyles = {
    default:
      'bg-[#1C1C1F] border border-[#2A2A2E] shadow-lg shadow-black/40 text-[#F5F5F4] rounded-2xl',
    glass:
      'glass-panel text-[#F5F5F4] rounded-2xl shadow-xl',
    interactive:
      'bg-[#1C1C1F] border border-[#2A2A2E] hover:border-[#E8934A]/40 shadow-lg hover:shadow-black/60 transition-all duration-300 cursor-pointer text-[#F5F5F4] rounded-2xl',
  };

  return (
    <div className={`${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`p-5 sm:p-6 border-b border-[#2A2A2E] ${className}`}>{children}</div>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`p-5 sm:p-6 ${className}`}>{children}</div>;

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`p-4 sm:p-5 border-t border-[#2A2A2E] bg-[#141416] rounded-b-2xl ${className}`}>
    {children}
  </div>
);
