import { cn } from '@/lib/utils'

interface MetricCardProps {
  label: string
  value: string | number
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

export function MetricCard({ label, value, trend, className }: MetricCardProps) {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600',
  }

  return (
    <div className={cn('space-y-1', className)}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={cn('text-lg font-semibold', trend && trendColors[trend])}>
        {value}
      </p>
    </div>
  )
}