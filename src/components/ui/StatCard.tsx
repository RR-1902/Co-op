import type { FC } from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  detail?: string;
  icon: LucideIcon;
  tone?: 'slate' | 'emerald' | 'amber' | 'rose';
  trend?: string;
}

const toneStyles = {
  emerald: {
    bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    glow: 'group-hover:border-emerald-500/30',
  },
  amber: {
    bg: 'bg-[#E8934A]/12 text-[#E8934A] border-[#E8934A]/30',
    glow: 'group-hover:border-[#E8934A]/40',
  },
  rose: {
    bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    glow: 'group-hover:border-rose-500/30',
  },
  slate: {
    bg: 'bg-[#2A2A2E]/60 text-[#F5F5F4] border-[#2A2A2E]',
    glow: 'group-hover:border-[#2A2A2E]',
  },
};

export const StatCard: FC<StatCardProps> = ({
  label,
  value,
  detail,
  icon: Icon,
  tone = 'slate',
  trend,
}) => {
  const currentTone = toneStyles[tone];

  return (
    <div className={`group relative p-5 bg-[#1C1C1F] border border-[#2A2A2E] hover:border-[#2A2A2E] rounded-2xl shadow-lg transition-all duration-200 overflow-hidden ${currentTone.glow}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[#9B9B9F]">{label}</p>
          <p className="mt-2 text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-[#F5F5F4]">
            {value}
          </p>
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${currentTone.bg}`}>
          <Icon className="h-5.5 w-5.5" />
        </div>
      </div>
      {(detail || trend) && (
        <div className="mt-3 flex items-center justify-between text-xs text-[#9B9B9F] border-t border-[#2A2A2E] pt-3">
          <span>{detail}</span>
          {trend && <span className="font-semibold text-[#E8934A]">{trend}</span>}
        </div>
      )}
    </div>
  );
};
