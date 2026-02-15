export default function SkeletonCard() {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 animate-pulse">
      <div className="flex justify-between items-start mb-3">
        <div className="h-4 bg-[#21262d] rounded w-24"></div>
        <div className="flex gap-1">
          <div className="h-7 w-7 bg-[#21262d] rounded"></div>
          <div className="h-7 w-7 bg-[#21262d] rounded"></div>
        </div>
      </div>
      <div className="h-3 bg-[#21262d] rounded w-full mb-2"></div>
      <div className="h-3 bg-[#21262d] rounded w-2/3 mb-3"></div>
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <div className="h-4 w-12 bg-[#21262d] rounded"></div>
          <div className="h-4 w-12 bg-[#21262d] rounded"></div>
        </div>
        <div className="h-5 w-14 bg-[#21262d] rounded-full"></div>
      </div>
      <div className="mt-3 pt-3 border-t border-[#30363d]">
        <div className="h-3 bg-[#21262d] rounded w-20"></div>
      </div>
    </div>
  )
}