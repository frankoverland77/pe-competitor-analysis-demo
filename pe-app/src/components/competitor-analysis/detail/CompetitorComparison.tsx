import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface CompetitorComparisonProps {
  competitor1: string
  competitor2: string
}

export function CompetitorComparison({ competitor1, competitor2 }: CompetitorComparisonProps) {
  // Mock comparison data
  const metrics = [
    { label: 'Avg Response Time', value1: '1.2 days', value2: '2.4 days' },
    { label: 'Capture Rate', value1: '83.9%', value2: '76.2%' },
    { label: 'Predictability', value1: '92%', value2: '84%' },
  ]

  const differences = [
    `${competitor1} responds 50% faster to market changes`,
    `${competitor1} has a 10% higher capture rate on average`,
    `${competitor2} shows more volatility in pricing patterns`,
    'Both competitors follow similar seasonal trends',
  ]

  return (
    <Card className="bg-gray-50">
      <CardHeader>
        <CardTitle className="text-lg">
          Unbranded Competitors: {competitor1} vs {competitor2}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-white rounded p-3">
              <p className="text-xs text-gray-600 mb-1">{metric.label}</p>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">{metric.value1}</span>
                <span className="text-xs text-gray-500">vs</span>
                <span className="font-semibold text-sm">{metric.value2}</span>
              </div>
            </div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <h4 className="font-medium text-sm mb-2">Key Differences:</h4>
          <ul className="space-y-1">
            {differences.map((diff, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="mr-2">•</span>
                <span>{diff}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}