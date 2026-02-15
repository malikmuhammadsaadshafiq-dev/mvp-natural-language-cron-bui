'use client';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function StatsCard({ title, value, subtitle, trend, className = '' }: StatsCardProps) {
  return (
    <div className={`bg-[#141414] rounded-[20px] border border-white/[0.08] p-6 flex flex-col justify-between ${className}`}>
      <div>
        <span className="text-zinc-400 text-sm font-medium">{title}</span>
        <div className="text-3xl font-semibold text-white mt-2">{value}</div>
      </div>
      {subtitle && (
        <div className="mt-4 text-sm text-zinc-400">
          {subtitle}
        </div>
      )}
    </div>
  );
}