import { useState } from 'react'
import { Layers } from 'lucide-react'

interface DragToGroupAreaProps {
  onDrop: (field: string) => void
}

export function DragToGroupArea({ onDrop }: DragToGroupAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const field = e.dataTransfer.getData('text/plain')
    if (field) {
      onDrop(field)
    }
    setIsDragOver(false)
  }

  return (
    <div
      className={`
        px-6 py-4 border-b transition-all duration-200
        ${isDragOver 
          ? 'bg-[#10B981]/10 border-[#10B981] border-dashed border-2' 
          : 'bg-[#F9FAFB] border-[#E5E7EB]'
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-center gap-2 text-sm text-[#6B7280]">
        <Layers className="h-4 w-4" />
        <span>Drag column headers here to group</span>
      </div>
    </div>
  )
}