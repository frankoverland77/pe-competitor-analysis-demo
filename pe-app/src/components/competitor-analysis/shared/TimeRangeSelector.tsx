import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

interface TimeRangeSelectorProps {
  value: string
  onChange: (value: string) => void
  variant?: 'compact' | 'full'
  className?: string
}

const timeRanges = {
  compact: [
    { value: '30d', label: '30d' },
    { value: '90d', label: '90d' },
    { value: '180d', label: '180d' },
    { value: '365d', label: '365d' },
  ],
  full: [
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '365d', label: '1 Year' },
  ]
}

export function TimeRangeSelector({ value, onChange, variant = 'compact', className }: TimeRangeSelectorProps) {
  const ranges = timeRanges[variant]
  
  return (
    <ToggleGroup 
      type="single" 
      value={value}
      onValueChange={onChange}
      className={className}
    >
      {ranges.map((range) => (
        <ToggleGroupItem 
          key={range.value} 
          value={range.value}
          className="data-[state=on]:bg-[#51B073] data-[state=on]:text-white data-[state=on]:hover:bg-[#51B073]/90 data-[state=off]:bg-white data-[state=off]:text-[#595959] data-[state=off]:hover:bg-[#F7F7F7] data-[state=off]:border data-[state=off]:border-[#DDDDDD] text-sm font-medium px-4 py-2"
        >
          {range.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}