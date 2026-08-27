import type { FC, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  detail: string;
  action?: ReactNode;
}

export const EmptyState: FC<EmptyStateProps> = ({ icon: Icon, title, detail, action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 text-amber-400 mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h4 className="text-base font-heading font-semibold text-white mb-1">{title}</h4>
      <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-5">{detail}</p>
      {action}
    </div>
  );
};
