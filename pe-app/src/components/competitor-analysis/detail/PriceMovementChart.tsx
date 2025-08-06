import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts'
import type { CompetitorDetail } from '@/services/competitorAnalysis'

interface PriceMovementChartProps {
  data: CompetitorDetail['priceMovements']
  metrics: CompetitorDetail['metrics']
  timeRange?: string
}

export function PriceMovementChart({ data, metrics, timeRange = '90d' }: PriceMovementChartProps) {
  // Filter data based on time range
  const days = parseInt(timeRange.replace('d', ''))
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)
  
  const filteredData = data.filter(item => new Date(item.date) >= cutoffDate)
  
  const chartData = filteredData.map((item, index) => ({
    x: item.marketChange,
    y: item.competitorChange,
    // Color points based on quadrant
    fill: item.marketChange > 0 && item.competitorChange > 0 ? '#10B981' : // green - both up
          item.marketChange < 0 && item.competitorChange < 0 ? '#10B981' : // green - both down
          '#EF4444' // red - opposite directions
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Price Change vs Market</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 80 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Market Change" 
              domain={[-0.25, 0.25]}
              ticks={[-0.25, -0.20, -0.15, -0.10, -0.05, 0, 0.05, 0.10, 0.15, 0.20, 0.25]}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              label={{ value: 'Market Change ($)', position: 'bottom', offset: -5 }}
              stroke="#666"
              fontSize={12}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Competitor Change" 
              domain={[-0.25, 0.25]}
              ticks={[-0.25, -0.20, -0.15, -0.10, -0.05, 0, 0.05, 0.10, 0.15, 0.20, 0.25]}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              label={{ value: 'Competitor Change ($)', angle: -90, position: 'left', offset: 10 }}
              stroke="#666"
              fontSize={12}
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value: number) => `$${value.toFixed(3)}`}
            />
            <ReferenceLine x={0} stroke="#666" />
            <ReferenceLine y={0} stroke="#666" />
            <Scatter 
              name="Price Changes" 
              data={chartData} 
              fillOpacity={0.8}
              shape={(props: any) => {
                const { cx, cy, fill } = props;
                return <circle cx={cx} cy={cy} r={3} fill={fill} />;
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
        
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Up:</span>
            <span className="font-semibold text-green-600">{metrics.upPercentage.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Down:</span>
            <span className="font-semibold text-red-600">{metrics.downPercentage.toFixed(1)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}