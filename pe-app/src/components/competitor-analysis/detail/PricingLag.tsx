import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import type { CompetitorDetail } from '@/services/competitorAnalysis'

interface PricingLagProps {
  lag: CompetitorDetail['pricingLag']
}

export function PricingLag({ lag }: PricingLagProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">PRICING LAG</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center py-4">
            <p className="text-3xl font-bold text-gray-900">{lag.days} day delay</p>
            <p className="text-sm text-gray-600 mt-1">Average response time</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Tomorrow's Prediction</p>
              <p className="text-lg font-bold text-green-600">+${lag.prediction.toFixed(3)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}