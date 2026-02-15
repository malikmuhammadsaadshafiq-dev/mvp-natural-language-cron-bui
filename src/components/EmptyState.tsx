'use client';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="bg-[#141414] rounded-[20px] border border-white/[0.08] p-12 text-center">
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#a78bfa]/10 flex items-center justify-center text-[#a78bfa] text-2xl">
        {icon}
      </div>
      <h3 className="text-white font-medium mb-1">{title}</h3>
      <p className="text-zinc-400 text-sm mb-4 max-w-sm mx-auto">{description}</p>
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="h-8 px-4 bg-white text-black font-medium text-sm rounded-full hover:bg-gray-200 active:scale-95 transition-all cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}