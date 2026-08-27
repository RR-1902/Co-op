import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface ProgressMetricCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNegative?: boolean;
  };
  periodOptions?: Array<'7d' | '30d' | '90d' | '1y'>;
  defaultPeriod?: '7d' | '30d' | '90d' | '1y';
  onPeriodChange?: (period: string) => void;
  subDetail?: string;
  statsSummary?: {
    peak?: string | number;
    low?: string | number;
    avg?: string | number;
  };
  chartData?: number[];
  chartColor?: 'amber' | 'emerald' | 'rose' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isEmpty?: boolean;
  className?: string;
}

export const ProgressMetricCard: React.FC<ProgressMetricCardProps> = ({
  title,
  value,
  trend,
  periodOptions = ['7d', '30d', '90d'],
  defaultPeriod = '7d',
  onPeriodChange,
  subDetail,
  statsSummary,
  chartData = [14, 18, 16, 22, 26, 21, 30, 28, 34, 32, 40],
  chartColor = 'amber',
  size = 'md',
  isLoading = false,
  isEmpty = false,
  className = '',
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);

  const handlePeriodSelect = (period: '7d' | '30d' | '90d' | '1y') => {
    setSelectedPeriod(period);
    if (onPeriodChange) onPeriodChange(period);
  };

  // Color mappings
  const colorMap = {
    amber: {
      stroke: '#E8934A',
      fill: 'rgba(232, 147, 74, 0.15)',
      gradientId: 'gradient-amber',
    },
    emerald: {
      stroke: '#4ADE80',
      fill: 'rgba(74, 222, 128, 0.15)',
      gradientId: 'gradient-emerald',
    },
    rose: {
      stroke: '#F87171',
      fill: 'rgba(248, 113, 113, 0.15)',
      gradientId: 'gradient-rose',
    },
    neutral: {
      stroke: '#9B9B9F',
      fill: 'rgba(155, 155, 159, 0.12)',
      gradientId: 'gradient-neutral',
    },
  };

  const activeColor = colorMap[chartColor] || colorMap.amber;

  // Generate SVG path for chart
  const renderSparkline = (data: number[]) => {
    if (!data || data.length === 0) return null;
    const width = 160;
    const height = 55;
    const padding = 6;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - padding * 2) - padding;
      return { x, y };
    });

    // Smooth Bezier Curve Path
    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      const cpX = (curr.x + next.x) / 2;
      pathD += ` C ${cpX} ${curr.y}, ${cpX} ${next.y}, ${next.x} ${next.y}`;
    }

    const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        <defs>
          {/* Subtle Dot Grid Pattern */}
          <pattern id="dot-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.8" fill="#2A2A2E" opacity="0.6" />
          </pattern>
          {/* Chart Gradient Fill */}
          <linearGradient id={activeColor.gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={activeColor.stroke} stopOpacity="0.25" />
            <stop offset="100%" stopColor={activeColor.stroke} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Dot Grid Background */}
        <rect width={width} height={height} fill="url(#dot-grid)" />

        {/* Area Fill */}
        <path d={areaD} fill={`url(#${activeColor.gradientId})`} />

        {/* Line Stroke */}
        <path
          d={pathD}
          fill="none"
          stroke={activeColor.stroke}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  // SKELETON LOADING STATE
  if (isLoading) {
    return (
      <div className={`p-6 bg-[#1C1C1F] border border-[#2A2A2E] rounded-[28px] shadow-lg animate-pulse ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-[#2A2A2E] rounded-md w-1/3" />
          <div className="h-5 bg-[#2A2A2E] rounded-full w-16" />
        </div>
        <div className="grid grid-cols-2 gap-4 items-center mb-6">
          <div className="h-9 bg-[#2A2A2E] rounded-lg w-3/4" />
          <div className="h-14 bg-[#2A2A2E] rounded-xl w-full" />
        </div>
        <div className="pt-4 border-t border-[#2A2A2E] flex justify-between">
          <div className="h-3 bg-[#2A2A2E] rounded-md w-1/4" />
          <div className="h-3 bg-[#2A2A2E] rounded-md w-1/3" />
        </div>
      </div>
    );
  }

  // EMPTY STATE
  if (isEmpty) {
    return (
      <div className={`p-6 bg-[#1C1C1F] border border-[#2A2A2E] rounded-[28px] shadow-lg flex flex-col justify-between ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9B9B9F]">{title}</p>
        </div>
        <div className="py-6 text-center">
          <p className="text-sm font-semibold text-[#F5F5F4]">No data yet</p>
          <p className="text-xs text-[#9B9B9F] mt-1">Metrics will appear once data is available.</p>
        </div>
        <div className="pt-4 border-t border-[#2A2A2E] text-xs text-[#9B9B9F]">
          <span>Awaiting system activity</span>
        </div>
      </div>
    );
  }

  const paddingClass = size === 'sm' ? 'p-4' : size === 'lg' ? 'p-8' : 'p-6';
  const valueTextClass = size === 'sm' ? 'text-2xl font-extrabold' : size === 'lg' ? 'text-4xl sm:text-5xl font-extrabold' : 'text-3xl sm:text-4xl font-extrabold';
  const sparklineHeightClass = size === 'sm' ? 'h-10' : size === 'lg' ? 'h-24' : 'h-14';

  return (
    <div
      className={`${paddingClass} bg-[#1C1C1F] border border-[#2A2A2E] rounded-[28px] shadow-lg hover:border-[#2A2A2E]/90 transition-all duration-300 flex flex-col justify-between select-none ${className}`}
    >
      {/* 1. HEADER */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#9B9B9F] truncate">{title}</p>

        <div className="flex items-center gap-2 shrink-0">
          {/* Trend Tag */}
          {trend && (
            <div
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                trend.isPositive
                  ? 'bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]/20'
                  : trend.isNegative
                  ? 'bg-[#F87171]/10 text-[#F87171] border-[#F87171]/20'
                  : 'bg-[#2A2A2E]/60 text-[#9B9B9F] border-[#2A2A2E]'
              }`}
            >
              {trend.isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : trend.isNegative ? (
                <TrendingDown className="w-3 h-3" />
              ) : (
                <Minus className="w-3 h-3" />
              )}
              <span>{trend.value}</span>
            </div>
          )}

          {/* Period Selector Pills */}
          {periodOptions.length > 0 && (
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#141416] border border-[#2A2A2E]">
              {periodOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handlePeriodSelect(opt)}
                  className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md transition-colors ${
                    selectedPeriod === opt
                      ? 'bg-[#E8934A] text-[#0A0A0B]'
                      : 'text-[#9B9B9F] hover:text-[#F5F5F4]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. MAIN METRIC VALUE & EMBEDDED GRAPH */}
      <div className="grid grid-cols-12 gap-3 items-center my-2">
        {/* Large Tabular Metric Value */}
        <div className="col-span-6 sm:col-span-5 min-w-0">
          <p className={`${valueTextClass} font-heading tracking-tight text-[#F5F5F4] tabular-nums truncate`}>
            {value}
          </p>
        </div>

        {/* Right Sparkline Chart Area with Dot Grid */}
        <div className={`col-span-6 sm:col-span-7 ${sparklineHeightClass} relative rounded-xl overflow-hidden bg-[#141416]/40 border border-[#2A2A2E]/40 p-1`}>
          {renderSparkline(chartData)}
        </div>
      </div>

      {/* 3. BOTTOM DATA STRIP / FOOTER */}
      <div className="pt-3 mt-2 border-t border-[#2A2A2E] flex items-center justify-between text-xs text-[#9B9B9F]">
        <div className="font-medium truncate">
          {subDetail ? <span>{subDetail}</span> : <span className="text-[#9B9B9F]/70">Updated real-time</span>}
        </div>

        {statsSummary && (
          <div className="flex items-center gap-2 font-mono text-[11px] shrink-0">
            {statsSummary.peak && (
              <span>
                peak <strong className="text-[#F5F5F4] font-semibold">{statsSummary.peak}</strong>
              </span>
            )}
            {statsSummary.low && (
              <>
                <span className="text-[#2A2A2E]">•</span>
                <span>
                  low <strong className="text-[#F5F5F4] font-semibold">{statsSummary.low}</strong>
                </span>
              </>
            )}
            {statsSummary.avg && (
              <>
                <span className="text-[#2A2A2E]">•</span>
                <span>
                  avg <strong className="text-[#F5F5F4] font-semibold">{statsSummary.avg}</strong>
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
