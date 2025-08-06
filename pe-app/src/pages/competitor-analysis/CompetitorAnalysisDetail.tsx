import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { TimeRangeSelector } from '@/components/competitor-analysis/shared/TimeRangeSelector'
import { CompetitorDetailHeader } from '@/components/competitor-analysis/detail/CompetitorDetailHeader'
import { PriceMovementChart } from '@/components/competitor-analysis/detail/PriceMovementChart'
import { CaptureRateChart } from '@/components/competitor-analysis/detail/CaptureRateChart'
import { ConsistencyChart } from '@/components/competitor-analysis/detail/ConsistencyChart'
import { getCompetitorDetail, type CompetitorDetail } from '@/services/competitorAnalysis'

export function CompetitorAnalysisDetail() {
  const { id } = useParams<{ id: string }>()
  const [detail, setDetail] = useState<CompetitorDetail | null>(null)
  const [timeRange, setTimeRange] = useState('90d')

  useEffect(() => {
    if (id) {
      // Simulate API call
      const data = getCompetitorDetail(id)
      setDetail(data)
    }
  }, [id])

  if (!detail) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Back Button */}
      <div className="bg-[#F7F7F7] px-6 py-3">
        <Link 
          to="/competitor-analysis" 
          className="inline-flex items-center gap-2 text-sm text-[#10B981] hover:text-[#10B981]/80 transition-colors"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Back to Competitor Analysis
        </Link>
      </div>

      {/* Header */}
      <CompetitorDetailHeader 
        detail={detail}
      />

      {/* Time Range Selector */}
      <div className="bg-[#F7F7F7] px-6 py-3">
        <TimeRangeSelector 
          value={timeRange}
          onChange={setTimeRange}
          variant="full"
          className="justify-start"
        />
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PriceMovementChart 
            data={detail.priceMovements} 
            metrics={detail.metrics}
            timeRange={timeRange}
          />
          <CaptureRateChart 
            data={detail.captureRates}
            timeRange={timeRange}
          />
        </div>

        {/* Consistency Chart */}
        <ConsistencyChart 
          data={detail.consistencyTrend}
          timeRange={timeRange}
        />
      </div>
    </div>
  )
}