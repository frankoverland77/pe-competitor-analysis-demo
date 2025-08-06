export interface CompetitorData {
  id: string
  competitor: string
  location: string
  locationGroup: string
  product: string
  productGroup: string
  brand: string
  strategyTag: string
  spotDelta: number
  captureRate: number
  predictability: number
}

export interface CompetitorDetail {
  id: string
  name: string
  product: string
  location: string
  metrics: {
    spot: number
    upPercentage: number
    downPercentage: number
    largeMovements: number
  }
  intradayBehavior: {
    frequency: 'Never' | 'Rarely' | 'Sometimes' | 'Frequently' | 'Always'
    typicalTime?: string
  }
  priceMovements: Array<{
    date: string
    marketChange: number
    competitorChange: number
  }>
  captureRates: Array<{
    date: string
    size: number
    rate: number
  }>
  consistencyTrend: Array<{
    date: string
    consistency: number  // Keep for backward compatibility
    dailyCapture: number  // Daily spot delta capture percentage
    rollingAverage: number  // 7-day rolling average
  }>
  behavioralProfile: {
    strategy: string
    position: string
    responsiveness: string
    consistency: string
  }
  pricingLag: {
    days: number
    prediction: number
  }
}

const competitorNames = ['ExxonMobil', 'Valero', 'Marathon', 'Shell', 'BP', 'Chevron']
const locations = ['Aberdeen, WA', 'Des Moines, IA', 'Houston, TX', 'Chicago, IL', 'Denver, CO']
const locationGroups = ['Gulf Coast', 'Midwest', 'West Coast', 'East Coast', 'Mountain']
const products = ['ULSD-0037', '#2 ULSD', 'Premium Gas', 'Regular Gas', 'Diesel']
const productGroups = ['Diesel', 'Gasoline', 'Premium', 'Regular']
const brands = ['Branded', 'Unbranded']
const strategies = ['Leader', 'Follower', 'Position']

// Predefined competitor behaviors for demo
const competitorBehaviors: Record<string, {
  strategy: string
  captureRate: number
  consistency: number
  intradayFrequency: 'Never' | 'Rarely' | 'Sometimes' | 'Frequently' | 'Always'
  intradayTime?: string
}> = {
  'ExxonMobil': {
    strategy: 'Leader',
    captureRate: 95,
    consistency: 89,
    intradayFrequency: 'Never'
  },
  'Valero': {
    strategy: 'Follower',
    captureRate: 90,
    consistency: 82,
    intradayFrequency: 'Rarely',
    intradayTime: '1:00 PM'
  },
  'Marathon': {
    strategy: 'Position',
    captureRate: 83.9,
    consistency: 75,
    intradayFrequency: 'Frequently',
    intradayTime: '11:00 AM'
  },
}

export function generateCompetitorData(count: number = 50): CompetitorData[] {
  // Ensure we have the special competitors in our data
  const specialCompetitors = ['ExxonMobil', 'Valero', 'Marathon']
  const otherCompetitors = competitorNames.filter(name => !specialCompetitors.includes(name))
  
  return Array.from({ length: count }, (_, i) => {
    let competitor: string
    let strategyTag: string
    let captureRate: number
    let predictability: number
    
    // For the first few entries, ensure we include each special competitor at least once
    if (i < specialCompetitors.length) {
      competitor = specialCompetitors[i]
    } else {
      // Mix special and other competitors
      competitor = Math.random() < 0.6 
        ? specialCompetitors[Math.floor(Math.random() * specialCompetitors.length)]
        : otherCompetitors[Math.floor(Math.random() * otherCompetitors.length)]
    }
    
    // If it's a special competitor, use predefined behavior
    if (competitorBehaviors[competitor]) {
      const behavior = competitorBehaviors[competitor]
      strategyTag = behavior.strategy
      captureRate = behavior.captureRate + (Math.random() * 4 - 2) // ±2% variation
      predictability = behavior.consistency + (Math.random() * 4 - 2) // ±2% variation
    } else {
      // For other competitors, generate random but reasonable values
      predictability = Math.random() * 100
      captureRate = Math.random() * 100
      
      // Determine strategy based on data rules
      if (captureRate > 70 && predictability > 70) {
        strategyTag = 'Leader'
      } else if (captureRate > 50 && captureRate <= 70) {
        strategyTag = 'Follower'
      } else {
        strategyTag = 'Position'
      }
    }
    
    // Ensure values stay within bounds
    captureRate = Math.max(0, Math.min(100, captureRate))
    predictability = Math.max(0, Math.min(100, predictability))
    
    return {
      id: `comp-${i + 1}`,
      competitor,
      location: locations[Math.floor(Math.random() * locations.length)],
      locationGroup: locationGroups[Math.floor(Math.random() * locationGroups.length)],
      product: products[Math.floor(Math.random() * products.length)],
      productGroup: productGroups[Math.floor(Math.random() * productGroups.length)],
      brand: brands[Math.floor(Math.random() * brands.length)],
      strategyTag,
      spotDelta: (Math.random() * 0.1 - 0.05), // -0.05 to +0.05
      captureRate,
      predictability,
    }
  })
}

export function getCompetitorDetail(id: string): CompetitorDetail {
  // Generate consistent data based on ID
  const seed = parseInt(id.split('-')[1]) || 1
  const competitorName = competitorNames[seed % competitorNames.length]
  const behavior = competitorBehaviors[competitorName]
  
  // Generate price movement data based on competitor behavior (in dollars)
  const priceMovements = Array.from({ length: 100 }, (_, i) => {
    // Market changes in dollars (typically -$0.20 to +$0.20)
    const marketChange = (Math.sin(i / 10) + Math.random() - 0.5) * 0.15
    let competitorChange: number
    
    if (behavior && competitorName === 'ExxonMobil') {
      // Leader: Very high correlation (R² = 0.89)
      competitorChange = marketChange * 0.95 + (Math.random() - 0.5) * 0.02
    } else if (behavior && competitorName === 'Valero') {
      // Follower: High correlation with some lag (R² = 0.75)
      competitorChange = marketChange * 0.85 + (Math.random() - 0.5) * 0.03
    } else if (behavior && competitorName === 'Marathon') {
      // Position: Moderate correlation (R² = 0.56)
      competitorChange = marketChange * 0.7 + (Math.random() - 0.5) * 0.05
    } else {
      // Default: moderate correlation
      competitorChange = marketChange * 0.8 + (Math.random() - 0.5) * 0.04
    }
    
    return {
      date: new Date(Date.now() - (100 - i) * 24 * 60 * 60 * 1000).toISOString(),
      marketChange,
      competitorChange,
    }
  })

  // Generate capture rate data
  const captureRates = Array.from({ length: 50 }, (_, i) => {
    const size = Math.random() * 5
    let rate: number
    
    // Generate rates based on competitor type
    if (behavior && competitorName === 'ExxonMobil') {
      // Leader: Often captures 90-110% of movement
      rate = 85 + Math.random() * 25
    } else if (behavior && competitorName === 'Valero') {
      // Follower: Usually 80-100%
      rate = 75 + Math.random() * 25
    } else if (behavior && competitorName === 'Marathon') {
      // Position: Can go above 100% when managing inventory
      rate = 70 + Math.random() * 60 // Can go up to 130%
    } else {
      // Default: wide range
      rate = 40 + Math.random() * 80 // 40-120%
    }
    
    // Larger movements tend to have higher capture rates
    if (size > 3) {
      rate = Math.min(rate * 1.2, 180)
    }
    
    return {
      date: new Date(Date.now() - (50 - i) * 24 * 60 * 60 * 1000).toISOString(),
      size,
      rate,
    }
  })

  // Generate consistency trend data with daily capture and rolling average
  const dailyCaptureData: number[] = []
  
  const consistencyTrend = Array.from({ length: 90 }, (_, i) => {
    const date = new Date(Date.now() - (90 - i) * 24 * 60 * 60 * 1000)
    let baseCapture: number
    let volatility: number
    
    if (behavior && competitorName === 'ExxonMobil') {
      // Leader: High capture rate with low volatility
      baseCapture = 95
      volatility = 15
    } else if (behavior && competitorName === 'Valero') {
      // Follower: Medium-high capture with medium volatility
      if (i < 60) {
        baseCapture = 92
        volatility = 20
      } else {
        baseCapture = 85
        volatility = 25
      }
    } else if (behavior && competitorName === 'Marathon') {
      // Position: Variable capture rate
      if (i < 60) {
        baseCapture = 90
        volatility = 20
      } else if (i >= 60 && i < 75) {
        baseCapture = 65
        volatility = 40
      } else {
        baseCapture = 80
        volatility = 30
      }
    } else {
      // Default: moderate capture with high volatility
      baseCapture = 75
      volatility = 35
    }
    
    // Generate daily capture with volatility
    const dailyCapture = Math.max(0, Math.min(200, 
      baseCapture + (Math.random() - 0.5) * volatility + 
      Math.sin(i / 5) * 10 // Add some cyclical pattern
    ))
    
    dailyCaptureData.push(dailyCapture)
    
    // Calculate 7-day rolling average
    let rollingAverage: number
    if (i < 7) {
      // For first 7 days, use average of available days
      rollingAverage = dailyCaptureData.slice(0, i + 1).reduce((a, b) => a + b, 0) / (i + 1)
    } else {
      // Calculate 7-day rolling average
      const last7Days = dailyCaptureData.slice(i - 6, i + 1)
      rollingAverage = last7Days.reduce((a, b) => a + b, 0) / 7
    }
    
    return {
      date: date.toISOString(),
      consistency: rollingAverage, // Keep for backward compatibility
      dailyCapture,
      rollingAverage
    }
  })

  // Determine intraday behavior based on competitor
  let intradayBehavior: { frequency: 'Never' | 'Rarely' | 'Sometimes' | 'Frequently' | 'Always'; typicalTime?: string }
  let metrics: { spot: number; upPercentage: number; downPercentage: number; largeMovements: number }
  let behavioralProfile: { strategy: string; position: string; responsiveness: string; consistency: string }
  
  if (behavior) {
    intradayBehavior = {
      frequency: behavior.intradayFrequency,
      typicalTime: behavior.intradayTime
    }
    
    // Set metrics based on competitor type
    if (competitorName === 'ExxonMobil') {
      metrics = { spot: 0.0308, upPercentage: 95.0, downPercentage: 94.8, largeMovements: 0 }
      behavioralProfile = { strategy: 'Leader', position: '#1', responsiveness: 'Fast', consistency: 'High' }
    } else if (competitorName === 'Valero') {
      metrics = { spot: 0.0285, upPercentage: 90.2, downPercentage: 89.8, largeMovements: 2 }
      behavioralProfile = { strategy: 'Follower', position: '#2-3', responsiveness: 'Fast', consistency: 'High' }
    } else if (competitorName === 'Marathon') {
      metrics = { spot: 0.0262, upPercentage: 83.9, downPercentage: 84.1, largeMovements: 5 }
      behavioralProfile = { strategy: 'Position', position: '#2-4', responsiveness: 'Moderate', consistency: 'Medium' }
    }
  } else {
    // Default behavior for other competitors
    const intradayFrequencies: Array<'Never' | 'Rarely' | 'Sometimes' | 'Frequently' | 'Always'> = ['Never', 'Rarely', 'Sometimes', 'Frequently', 'Always']
    const intradayTimes = ['9:00 AM', '10:30 AM', '11:00 AM', '2:00 PM', '3:30 PM']
    const frequency = intradayFrequencies[seed % intradayFrequencies.length]
    
    intradayBehavior = {
      frequency,
      typicalTime: frequency !== 'Never' ? intradayTimes[seed % intradayTimes.length] : undefined,
    }
    
    metrics = {
      spot: 0.02 + Math.random() * 0.02,
      upPercentage: 70 + Math.random() * 20,
      downPercentage: 70 + Math.random() * 20,
      largeMovements: Math.floor(Math.random() * 8),
    }
    
    behavioralProfile = {
      strategy: strategies[seed % strategies.length],
      position: '#3-5',
      responsiveness: 'Moderate',
      consistency: 'Medium',
    }
  }
  
  return {
    id,
    name: competitorName,
    product: products[seed % products.length],
    location: locations[seed % locations.length],
    metrics,
    intradayBehavior,
    priceMovements,
    captureRates,
    consistencyTrend,
    behavioralProfile,
    pricingLag: {
      days: behavior ? (competitorName === 'ExxonMobil' ? 0 : 1) : 1,
      prediction: 0.02 + Math.random() * 0.01,
    },
  }
}

export function filterCompetitorData(
  data: CompetitorData[],
  filters: {
    location?: string
    product?: string
    competitor?: string
  }
): CompetitorData[] {
  return data.filter((item) => {
    if (filters.location && filters.location !== 'all' && item.location !== filters.location) {
      return false
    }
    if (filters.product && filters.product !== 'all' && item.product !== filters.product) {
      return false
    }
    if (filters.competitor && filters.competitor !== 'all' && item.competitor !== filters.competitor) {
      return false
    }
    return true
  })
}