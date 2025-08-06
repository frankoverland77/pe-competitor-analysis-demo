import React from 'react';
import { GripVertical } from 'lucide-react';

export interface DraggableHeaderComponentParams {
  displayName: string;
  onDragStart?: (field: string) => void;
  isDraggable?: boolean;
}

interface DraggableHeaderComponentProps extends DraggableHeaderComponentParams {
  column: {
    getColDef: () => {
      field?: string;
    };
  };
}

export const DraggableHeaderComponent: React.FC<DraggableHeaderComponentProps> = (props) => {
  const { displayName, column, isDraggable = true, onDragStart } = props;
  const field = column.getColDef().field || '';

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isDraggable) return;
    
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', field);
    
    if (onDragStart) {
      onDragStart(field);
    }
    
    const dragIcon = document.createElement('div');
    dragIcon.textContent = displayName;
    dragIcon.style.position = 'absolute';
    dragIcon.style.top = '-1000px';
    dragIcon.style.padding = '8px 16px';
    dragIcon.style.backgroundColor = '#3b82f6';
    dragIcon.style.color = 'white';
    dragIcon.style.borderRadius = '4px';
    dragIcon.style.fontSize = '14px';
    dragIcon.style.fontWeight = '500';
    document.body.appendChild(dragIcon);
    
    e.dataTransfer.setDragImage(dragIcon, 0, 0);
    
    setTimeout(() => {
      document.body.removeChild(dragIcon);
    }, 0);
  };

  return (
    <div 
      className="flex items-center gap-2 w-full h-full"
      draggable={isDraggable}
      onDragStart={handleDragStart}
      style={{ cursor: isDraggable ? 'move' : 'default' }}
    >
      {isDraggable && (
        <GripVertical className="w-4 h-4 text-gray-400" />
      )}
      <span className="truncate">{displayName}</span>
    </div>
  );
};