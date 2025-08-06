interface ControlBarProps {
  totalCount: number
}

export function ControlBar({ totalCount }: ControlBarProps) {
  return (
    <div className="px-6 py-3 bg-[#F7F7F7]">
      <div className="text-sm font-medium text-[#1F2937]">
        {totalCount} {totalCount === 1 ? 'Competitor' : 'Competitors'}
      </div>
    </div>
  )
}