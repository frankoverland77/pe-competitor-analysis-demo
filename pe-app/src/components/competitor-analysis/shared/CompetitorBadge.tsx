import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface CompetitorBadgeProps {
  strategy: string
  className?: string
}

const strategyColors: Record<string, string> = {
  'Leader': 'bg-green-500 text-white hover:bg-green-600',
  'Follower': 'bg-blue-500 text-white hover:bg-blue-600',
  'Position': 'bg-purple-500 text-white hover:bg-purple-600',
}

export function CompetitorBadge({ strategy, className }: CompetitorBadgeProps) {
  const colorClasses = strategyColors[strategy] || 'bg-gray-500 text-white hover:bg-gray-600'
  
  return (
    <Badge 
      variant="secondary" 
      className={cn(colorClasses, 'font-medium border-0', className)}
    >
      {strategy}
    </Badge>
  )
}