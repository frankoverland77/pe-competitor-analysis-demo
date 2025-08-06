import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { CompetitorDetail } from '@/services/competitorAnalysis'

interface BehavioralProfileProps {
  profile: CompetitorDetail['behavioralProfile']
  className?: string
}

export function BehavioralProfile({ profile, className }: BehavioralProfileProps) {
  const getStrategyColor = (strategy: string) => {
    switch (strategy) {
      case 'Leader':
        return 'bg-green-500 text-white hover:bg-green-600'
      case 'Follower':
        return 'bg-blue-500 text-white hover:bg-blue-600'
      case 'Position':
        return 'bg-purple-500 text-white hover:bg-purple-600'
      default:
        return 'bg-gray-500 text-white hover:bg-gray-600'
    }
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <h3 className="text-sm font-medium text-gray-600 mb-4">Behavioral Profile</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Strategy</span>
            <Badge className={`${getStrategyColor(profile.strategy)} font-medium border-0`}>
              {profile.strategy}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Position</span>
            <span className="text-sm font-semibold text-gray-900">{profile.position}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Consistency</span>
            <span className="text-sm font-semibold text-gray-900">{profile.consistency}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}