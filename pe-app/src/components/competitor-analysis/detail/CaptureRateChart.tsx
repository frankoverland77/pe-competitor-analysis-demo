import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts'
import type { CompetitorDetail } from '@/services/competitorAnalysis'

interface CaptureRateChartProps {
  data: CompetitorDetail['captureRates']
  timeRange?: string
}

export function CaptureRateChart({ data, timeRange = '90d' }: CaptureRateChartProps) {
  // Filter data based on time range
  const days = parseInt(timeRange.replace('d', ''))
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)
  
  const filteredData = data.filter(item => new Date(item.date) >= cutoffDate)
  
  const chartData = filteredData.map(item => ({
    x: item.size,
    y: item.rate,
    fill: item.rate > 100 ? '#059669' : // darker green for >100%
          item.rate > 75 ? '#10B981' :  // green for 75-100%
          item.rate > 50 ? '#3B82F6' :  // blue for 50-75%
          '#EF4444' // red for <50%
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Capture Rate vs Size</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 80 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Size" 
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              tickFormatter={(value) => value}
              label={{ value: 'Movement Size', position: 'bottom', offset: -5 }}
              stroke="#666"
              fontSize={12}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Capture Rate" 
              domain={[0, 200]}
              ticks={[0, 50, 100, 150, 200]}
              tickFormatter={(value) => `${value}%`}
              label={{ value: 'Capture Rate (%)', angle: -90, position: 'left', offset: 10 }}
              stroke="#666"
              fontSize={12}
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value: number, name: string) => {
                if (name === 'Capture Rate') return `${value.toFixed(1)}%`
                return value.toFixed(2)
              }}
            />
            <Scatter 
              name="Capture Rate" 
              data={chartData} 
              fillOpacity={0.8}
              shape={(props: any) => {
                const { cx, cy, fill } = props;
                return <circle cx={cx} cy={cy} r={3} fill={fill} />;
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}