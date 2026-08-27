import type { FC } from 'react';

export type StatusType =
  | 'Pending'
  | 'In review'
  | 'Approved'
  | 'Rejected'
  | 'Scheduled'
  | 'Accepted'
  | 'In progress'
  | 'Completed'
  | 'Available'
  | 'Unavailable'
  | 'Offline';

interface BadgeProps {
  status: StatusType;
  size?: 'sm' | 'md';
}

const statusConfig: Record<StatusType, { bg: string; text: string; border: string; dot: string }> = {
  Pending: {
    bg: 'bg-[#FBBF24]/10',
    text: 'text-[#FBBF24]',
    border: 'border-[#FBBF24]/20',
    dot: 'bg-[#FBBF24]',
  },
  'In review': {
    bg: 'bg-[#FBBF24]/10',
    text: 'text-[#FBBF24]',
    border: 'border-[#FBBF24]/20',
    dot: 'bg-[#FBBF24]',
  },
  Approved: {
    bg: 'bg-[#4ADE80]/10',
    text: 'text-[#4ADE80]',
    border: 'border-[#4ADE80]/20',
    dot: 'bg-[#4ADE80]',
  },
  Rejected: {
    bg: 'bg-[#F87171]/10',
    text: 'text-[#F87171]',
    border: 'border-[#F87171]/20',
    dot: 'bg-[#F87171]',
  },
  Scheduled: {
    bg: 'bg-[#2A2A2E]/60',
    text: 'text-[#F5F5F4]',
    border: 'border-[#2A2A2E]',
    dot: 'bg-[#9B9B9F]',
  },
  Accepted: {
    bg: 'bg-[#2A2A2E]/60',
    text: 'text-[#F5F5F4]',
    border: 'border-[#2A2A2E]',
    dot: 'bg-[#9B9B9F]',
  },
  'In progress': {
    bg: 'bg-[#E8934A]/12',
    text: 'text-[#E8934A]',
    border: 'border-[#E8934A]/20',
    dot: 'bg-[#E8934A] animate-pulse',
  },
  Completed: {
    bg: 'bg-[#4ADE80]/10',
    text: 'text-[#4ADE80]',
    border: 'border-[#4ADE80]/20',
    dot: 'bg-[#4ADE80]',
  },
  Available: {
    bg: 'bg-[#4ADE80]/10',
    text: 'text-[#4ADE80]',
    border: 'border-[#4ADE80]/20',
    dot: 'bg-[#4ADE80]',
  },
  Unavailable: {
    bg: 'bg-[#2A2A2E]/60',
    text: 'text-[#9B9B9F]',
    border: 'border-[#2A2A2E]',
    dot: 'bg-[#9B9B9F]',
  },
  Offline: {
    bg: 'bg-[#2A2A2E]/60',
    text: 'text-[#9B9B9F]',
    border: 'border-[#2A2A2E]',
    dot: 'bg-[#9B9B9F]',
  },
};

export const Badge: FC<BadgeProps> = ({ status, size = 'md' }) => {
  const config = statusConfig[status] ?? statusConfig.Pending;
  const padding = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium tracking-wide backdrop-blur-sm transition-colors ${config.bg} ${config.text} ${config.border} ${padding}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
};
