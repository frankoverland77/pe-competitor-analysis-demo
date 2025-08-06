import { MarketCaptureCards } from './MarketCaptureCards'
import type { CompetitorDetail } from '@/services/competitorAnalysis'

interface CompetitorDetailHeaderProps {
  detail: CompetitorDetail
}

export function CompetitorDetailHeader({ detail }: CompetitorDetailHeaderProps) {
  return (
    <div className="bg-[#F7F7F7] px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Market Movement Analysis - {detail.name} - {detail.product} - {detail.location}
        </h1>
      </div>
      
      {/* Behavioral Profile Subheader */}
      <h2 className="text-lg font-bold text-gray-900 mb-4">Behavioral Profile</h2>
      
      <MarketCaptureCards
        upPercentage={detail.metrics.upPercentage}
        downPercentage={detail.metrics.downPercentage}
        intradayFrequency={detail.intradayBehavior.frequency}
        intradayTime={detail.intradayBehavior.typicalTime}
        behavioralProfile={detail.behavioralProfile}
      />
    </div>
  )
}