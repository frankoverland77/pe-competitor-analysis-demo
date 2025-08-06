import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CompetitorAnalysisHeader } from '@/components/competitor-analysis/grid/CompetitorAnalysisHeader'
import { SearchBar } from '@/components/competitor-analysis/grid/SearchBar'
import { FiltersDrawer } from '@/components/competitor-analysis/grid/FiltersDrawer'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { ControlBar } from '@/components/competitor-analysis/grid/ControlBar'
import { CompetitorDataGrid } from '@/components/competitor-analysis/grid/CompetitorDataGrid'
import { generateCompetitorData, filterCompetitorData, type CompetitorData } from '@/services/competitorAnalysis'

export function CompetitorAnalysisGrid() {
  const navigate = useNavigate()
  
  // Generate mock data
  const allData = useMemo(() => generateCompetitorData(100), [])
  
  // Extract unique values for filters
  const locations = useMemo(() => 
    [...new Set(allData.map(d => d.location))].sort(), 
    [allData]
  )
  const products = useMemo(() => 
    [...new Set(allData.map(d => d.product))].sort(), 
    [allData]
  )
  const competitors = useMemo(() => 
    [...new Set(allData.map(d => d.competitor))].sort(), 
    [allData]
  )

  // State
  const [searchQuery, setSearchQuery] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState({
    location: 'all',
    product: 'all',
    competitor: 'all',
    timeRange: '90d',
  })

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  // Filter data
  const filteredData = useMemo(() => {
    let data = filterCompetitorData(allData, filters)
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      data = data.filter(item =>
        item.competitor.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.product.toLowerCase().includes(query)
      )
    }
    
    return data
  }, [allData, filters, searchQuery])


  // Handle export
  const handleExport = () => {
    // Create CSV header
    const headers = [
      'Competitor',
      'Location',
      'Location Group',
      'Product',
      'Product Group',
      'Brand',
      'Strategy Tag',
      'Spot Delta Capture (%)',
      'Consistency (%)',
      'Consistency Category'
    ]
    
    // Helper function to get consistency category
    const getConsistencyCategory = (value: number): string => {
      if (value >= 85) return 'High'
      if (value >= 25) return 'Medium'
      if (value >= 15) return 'Low'
      return 'Very Low'
    }
    
    // Convert data to CSV rows
    const rows = filteredData.map(item => [
      item.competitor,
      item.location,
      item.locationGroup,
      item.product,
      item.productGroup,
      item.brand,
      item.strategyTag,
      item.captureRate.toFixed(1),
      item.predictability.toFixed(1),
      getConsistencyCategory(item.predictability)
    ])
    
    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `competitor_analysis_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Handle analyze click
  const handleAnalyze = (competitor: CompetitorData) => {
    navigate(`/competitor-analysis/${competitor.id}`)
  }



  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <CompetitorAnalysisHeader />
      
      <div className="bg-[#F7F7F7]">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search competitors, locations, products..."
              className="w-[400px]"
            />
            <div className="flex items-center gap-2">
              <FiltersDrawer
                open={filtersOpen}
                onOpenChange={setFiltersOpen}
                filters={filters}
                onFilterChange={handleFilterChange}
                locations={locations}
                products={products}
                competitors={competitors}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                className="border-[#DDDDDD] hover:bg-[#F9FAFB]"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
        
        <ControlBar
          totalCount={filteredData.length}
        />
        
        <div className="h-[calc(100vh-250px)]">
          <CompetitorDataGrid 
            data={filteredData} 
            onAnalyze={handleAnalyze}
          />
        </div>
      </div>
    </div>
  )
}