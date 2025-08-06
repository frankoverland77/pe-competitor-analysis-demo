import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Clock, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MarketCaptureCardsProps {
  upPercentage: number
  downPercentage: number
  intradayFrequency?: 'Never' | 'Rarely' | 'Sometimes' | 'Frequently' | 'Always'
  intradayTime?: string
  timeRange?: string
  behavioralProfile?: {
    strategy: string
    position: string
    consistency: number
  }
}

export function MarketCaptureCards({ 
  upPercentage, 
  downPercentage, 
  intradayFrequency = 'Frequently',
  intradayTime = '11:00 AM',
  behavioralProfile
}: MarketCaptureCardsProps) {
  // Calculate percentage based on frequency label
  const getIntradayPercentage = (frequency: string): number => {
    switch (frequency) {
      case 'Never':
        return 0
      case 'Rarely':
        return 15 // Mid-range of 1-25%
      case 'Sometimes':
        return 35 // Mid-range of 26-50%
      case 'Frequently':
        return 66 // Mid-range of 51-75%
      case 'Always':
        return 95 // High percentage for always (76-100%)
      default:
        return 0
    }
  }

  const intradayPercentage = getIntradayPercentage(intradayFrequency)
  
  // Get consistency category
  const getConsistencyCategory = (value: number): { label: string; color: string } => {
    if (value >= 85) return { label: 'High', color: 'text-green-600' }
    if (value >= 25) return { label: 'Medium', color: 'text-yellow-600' }
    if (value >= 15) return { label: 'Low', color: 'text-orange-600' }
    return { label: 'Very Low', color: 'text-red-600' }
  }
  
  const consistencyCategory = behavioralProfile ? getConsistencyCategory(behavioralProfile.consistency) : null
  
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Behavioral Profile */}
      {behavioralProfile && (
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-purple-100 p-1.5">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1 grid grid-cols-3 gap-2">
                {/* Strategy */}
                <div>
                  <h3 className="text-xs font-medium text-gray-600 mb-0.5">Strategy</h3>
                  <p className="text-lg font-bold text-gray-900">{behavioralProfile.strategy}</p>
                </div>
                
                {/* Position */}
                <div>
                  <h3 className="text-xs font-medium text-gray-600 mb-0.5">Position</h3>
                  <p className="text-lg font-bold text-gray-900">{behavioralProfile.position}</p>
                </div>
                
                {/* Consistency */}
                <div>
                  <h3 className="text-xs font-medium text-gray-600 mb-0.5">Consistency</h3>
                  <p className={cn("text-lg font-bold", consistencyCategory?.color)}>
                    {consistencyCategory?.label} ({behavioralProfile.consistency}%)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Up Market Capture */}
      <Card className="border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-green-100 p-1.5">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-medium text-gray-600 mb-0.5">Up Market Capture</h3>
              <p className="text-lg font-bold text-gray-900">{upPercentage.toFixed(1)}%</p>
              <p className="text-xs text-gray-500 mt-0.5">When spot increases</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Down Market Capture */}
      <Card className="border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-red-100 p-1.5">
              <TrendingDown className="h-4 w-4 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-medium text-gray-600 mb-0.5">Down Market Capture</h3>
              <p className="text-lg font-bold text-gray-900">{downPercentage.toFixed(1)}%</p>
              <p className="text-xs text-gray-500 mt-0.5">When spot decreases</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Intraday Changes */}
      <Card className="border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-blue-100 p-1.5">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-medium text-gray-600 mb-0.5">Intraday Changes</h3>
              <p className={cn(
                "text-lg font-bold",
                intradayFrequency === 'Never' ? 'text-gray-400' : 'text-gray-900'
              )}>
                {intradayFrequency} ({intradayPercentage}%)
              </p>
              {intradayFrequency !== 'Never' && intradayTime && (
                <p className="text-xs text-gray-500 mt-0.5">Typically at {intradayTime}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}