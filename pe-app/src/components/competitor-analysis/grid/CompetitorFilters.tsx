import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TimeRangeSelector } from '../shared/TimeRangeSelector'

interface CompetitorFiltersProps {
  filters: {
    location: string
    product: string
    competitor: string
    timeRange: string
  }
  onFilterChange: (key: string, value: string) => void
  locations: string[]
  products: string[]
  competitors: string[]
}

export function CompetitorFilters({
  filters,
  onFilterChange,
  locations,
  products,
  competitors,
}: CompetitorFiltersProps) {
  return (
    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <Select value={filters.location} onValueChange={(value) => onFilterChange('location', value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.product} onValueChange={(value) => onFilterChange('product', value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Products" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              {products.map((product) => (
                <SelectItem key={product} value={product}>
                  {product}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.competitor} onValueChange={(value) => onFilterChange('competitor', value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Competitors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Competitors</SelectItem>
              {competitors.map((competitor) => (
                <SelectItem key={competitor} value={competitor}>
                  {competitor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <TimeRangeSelector
          value={filters.timeRange}
          onChange={(value) => onFilterChange('timeRange', value)}
        />
      </div>
    </div>
  )
}