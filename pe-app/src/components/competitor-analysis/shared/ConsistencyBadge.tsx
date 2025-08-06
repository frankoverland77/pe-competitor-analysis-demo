import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface ConsistencyBadgeProps {
  value: number
  className?: string
}

export function ConsistencyBadge({ value, className }: ConsistencyBadgeProps) {
  // Determine category and color
  let category: string
  let colorClasses: string
  
  if (value >= 85) {
    category = 'High'
    colorClasses = 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200'
  } else if (value >= 25) {
    category = 'Medium'
    colorClasses = 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200'
  } else if (value >= 15) {
    category = 'Low'
    colorClasses = 'bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200'
  } else {
    category = 'Very Low'
    colorClasses = 'bg-red-100 text-red-800 hover:bg-red-200 border-red-200'
  }
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{value.toFixed(1)}%</span>
      <Badge 
        variant="outline" 
        className={cn(colorClasses, 'font-medium text-xs px-2 py-0.5', className)}
      >
        {category}
      </Badge>
    </div>
  )
}