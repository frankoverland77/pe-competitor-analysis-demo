import { cn } from '@/lib/utils'

interface PredictabilityBarProps {
  value: number
  className?: string
}

export function PredictabilityBar({ value, className }: PredictabilityBarProps) {
  const getColor = (val: number) => {
    if (val >= 80) return 'bg-green-500'
    if (val >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={cn('h-full transition-all', getColor(value))}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs text-gray-600 min-w-[40px] text-right">
        {value.toFixed(0)}%
      </span>
    </div>
  )
}