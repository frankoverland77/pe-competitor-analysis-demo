import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ControlBarProps {
  totalCount: number
  onExport: () => void
}

export function ControlBar({ totalCount, onExport }: ControlBarProps) {
  return (
    <div className="px-6 py-3 bg-[#F7F7F7]">
      <div className="text-sm font-medium text-[#1F2937]">
        {totalCount} {totalCount === 1 ? 'Competitor' : 'Competitors'}
      </div>
    </div>
  )
}