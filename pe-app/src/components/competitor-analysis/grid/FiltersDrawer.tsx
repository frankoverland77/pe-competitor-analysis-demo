import { Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TimeRangeSelector } from '../shared/TimeRangeSelector'
import { Separator } from '@/components/ui/separator'

interface FiltersDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
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

export function FiltersDrawer({
  open,
  onOpenChange,
  filters,
  onFilterChange,
  locations,
  products,
  competitors,
}: FiltersDrawerProps) {
  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onOpenChange(!open)}
        className="border-[#DDDDDD] hover:bg-[#F7F7F7]"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>
      
      {/* Custom drawer implementation sliding from right */}
      <div
        className={`
          fixed top-0 right-0 h-full bg-white border-l border-[#DDDDDD] shadow-lg
          transition-transform duration-300 ease-in-out z-40
          ${open ? 'translate-x-0' : 'translate-x-full'}
          w-[320px] sm:w-[400px]
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#DDDDDD]">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-6 space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Location</label>
              <Select value={filters.location} onValueChange={(value) => onFilterChange('location', value)}>
                <SelectTrigger className="w-full">
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
            </div>

            <Separator />

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Product</label>
              <Select value={filters.product} onValueChange={(value) => onFilterChange('product', value)}>
                <SelectTrigger className="w-full">
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
            </div>

            <Separator />

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Competitor</label>
              <Select value={filters.competitor} onValueChange={(value) => onFilterChange('competitor', value)}>
                <SelectTrigger className="w-full">
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

            <Separator />

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Time Range</label>
              <TimeRangeSelector
                value={filters.timeRange}
                onChange={(value) => onFilterChange('timeRange', value)}
                className="w-full"
              />
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  )
}