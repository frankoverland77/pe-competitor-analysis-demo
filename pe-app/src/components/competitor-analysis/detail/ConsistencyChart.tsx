import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { format } from 'date-fns'

interface ConsistencyChartProps {
  data: Array<{
    date: string
    consistency: number
    dailyCapture?: number
    rollingAverage?: number
  }>
  timeRange?: string
}

export function ConsistencyChart({ data, timeRange = '90d' }: ConsistencyChartProps) {
  // Filter data based on time range
  const days = parseInt(timeRange.replace('d', ''))
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)
  
  const filteredData = data.filter(item => new Date(item.date) >= cutoffDate)
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dailyValue = payload.find((p: any) => p.dataKey === 'dailyCapture')?.value
      const avgValue = payload.find((p: any) => p.dataKey === 'rollingAverage')?.value || 
                       payload.find((p: any) => p.dataKey === 'consistency')?.value
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium">{format(new Date(label), 'MMM d, yyyy')}</p>
          {dailyValue !== undefined && (
            <p className="text-sm text-gray-600">
              Daily Capture: <span className="font-semibold">{dailyValue.toFixed(1)}%</span>
            </p>
          )}
          {avgValue !== undefined && (
            <p className="text-sm text-gray-600">
              7-Day Average: <span className="font-semibold">{avgValue.toFixed(1)}%</span>
            </p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Consistency Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart 
            data={filteredData} 
            margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
          >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => format(new Date(value), 'MMM d')}
                stroke="#666"
                fontSize={12}
                label={{ value: 'Date', position: 'bottom', offset: -5 }}
              />
              <YAxis 
                domain={[0, 200]}
                ticks={[0, 50, 100, 150, 200]}
                tickFormatter={(value) => `${value}%`}
                stroke="#666"
                fontSize={12}
                label={{ value: 'Capture Rate (%)', angle: -90, position: 'left', offset: 10 }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Daily Capture Rate - dots/thin line */}
              {filteredData[0]?.dailyCapture !== undefined && (
                <Line 
                  type="monotone" 
                  dataKey="dailyCapture"
                  name="Daily Capture Rate"
                  stroke="#9CA3AF"
                  strokeWidth={1}
                  dot={{ r: 2, fill: '#9CA3AF' }}
                  activeDot={{ r: 4 }}
                />
              )}
              
              {/* Rolling Average - smooth line */}
              <Line 
                type="monotone" 
                dataKey={filteredData[0]?.rollingAverage !== undefined ? "rollingAverage" : "consistency"}
                name="7-Day Average"
                stroke="#10B981" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              
              <Legend 
                verticalAlign="bottom"
                height={36}
                iconType="line"
                wrapperStyle={{
                  paddingTop: '20px',
                  fontSize: '12px'
                }}
              />
            </LineChart>
          </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}