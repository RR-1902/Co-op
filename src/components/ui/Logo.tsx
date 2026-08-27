import type { FC } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
}

export const Logo: FC<LogoProps> = ({
  size = 'md',
  variant = 'auto',
  showSubtitle = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const textColors = {
    light: 'text-white',
    dark: 'text-slate-950',
    auto: 'text-slate-900 dark:text-white',
  };

  const subtitleColors = {
    light: 'text-amber-200/80',
    dark: 'text-slate-500',
    auto: 'text-slate-500 dark:text-slate-400',
  };

  return (
    <div className="flex items-center gap-3 select-none">
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg viewBox="0 0 40 40" fill="none" className="w-full h-full drop-shadow-md">
          <rect width="40" height="40" rx="10" fill="#14251E" />
          <path d="M12 27L20 12L28 27L20 22Z" fill="url(#logoGrad)" opacity="0.25" />
          <line x1="12" y1="27" x2="20" y2="12" stroke="#D98E3B" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="12" x2="28" y2="27" stroke="#D98E3B" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="27" x2="28" y2="27" stroke="#D98E3B" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="12" x2="20" y2="27" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2 2" />
          
          {/* Top Node: Cooperative */}
          <circle cx="20" cy="12" r="4" fill="#D98E3B" stroke="#FDE68A" strokeWidth="1.5" />
          <circle cx="20" cy="12" r="1.5" fill="#FFFFFF" />
          
          {/* Left Node: Worker */}
          <circle cx="12" cy="27" r="3.5" fill="#10B981" stroke="#A7F3D0" strokeWidth="1.5" />
          <circle cx="12" cy="27" r="1.2" fill="#FFFFFF" />
          
          {/* Right Node: Customer */}
          <circle cx="28" cy="27" r="3.5" fill="#3B82F6" stroke="#93C5FD" strokeWidth="1.5" />
          <circle cx="28" cy="27" r="1.2" fill="#FFFFFF" />

          <defs>
            <linearGradient id="logoGrad" x1="20" y1="12" x2="20" y2="27" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D98E3B" />
              <stop offset="1" stopColor="#14251E" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div>
        <span className={`font-heading font-extrabold tracking-tight ${textSizes[size]} ${textColors[variant]}`}>
          CO-OP
        </span>
        {showSubtitle && (
          <p className={`text-[11px] font-medium tracking-wide uppercase ${subtitleColors[variant]}`}>
            Labour Cooperative Platform
          </p>
        )}
      </div>
    </div>
  );
};
