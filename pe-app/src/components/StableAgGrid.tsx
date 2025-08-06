import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { DraggableHeaderComponent } from './DraggableHeaderComponent';

interface RowData {
  id: number;
  product: string;
  priceEffective: string;
  group: string;
  spot: string;
  rackLow: string;
  rackAverage: string;
  competitor: string;
  custom: string;
}

interface GroupedRowData extends Partial<RowData> {
  __isGroup?: boolean;
  __groupId?: string;
  __groupField?: string;
  __groupValue?: string;
  __childCount?: number;
  __level?: number;
  __expanded?: boolean;
}

const StableAgGrid: React.FC = () => {
  const gridRef = useRef<AgGridReact>(null);
  
  const [rowData] = useState<RowData[]>([
    { id: 1, product: 'RFQ #37642 10%', priceEffective: '04:00:00 PM - 05:59:00 PM', group: 'GROUP', spot: 'Not assigned', rackLow: 'Not assigned', rackAverage: 'Not assigned', competitor: 'BENCHMARK...', custom: 'Not assigned' },
    { id: 2, product: 'RFQ #37642 10%', priceEffective: '04:00:00 PM - 05:59:00 PM', group: 'GROUP', spot: 'Not assigned', rackLow: 'Not assigned', rackAverage: 'Not assigned', competitor: 'BENCHMARK...', custom: 'Not assigned' },
    { id: 3, product: 'RFQ #37642 10%', priceEffective: '04:00:00 PM - 05:59:00 PM', group: 'GROUP', spot: 'Not assigned', rackLow: 'Not assigned', rackAverage: 'Not assigned', competitor: 'BENCHMARK...', custom: 'Not assigned' },
    { id: 4, product: 'RFQ #37642 10%', priceEffective: '04:00:00 PM - 05:59:00 PM', group: 'GROUP', spot: 'Not assigned', rackLow: 'Not assigned', rackAverage: 'Not assigned', competitor: 'BENCHMARK...', custom: 'Not assigned' },
  ]);

  const [groupedColumns, setGroupedColumns] = useState<string[]>([]);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const [displayData, setDisplayData] = useState<GroupedRowData[]>(rowData);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = useCallback((groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  }, [expandedGroups]);

  const handleHeaderDragStart = useCallback((field: string) => {
    setDraggedColumn(field);
  }, []);

  const columnDefs = useMemo((): ColDef<GroupedRowData>[] => [
    {
      field: 'selection' as any,
      headerName: '',
      width: 50,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true
    },
    { 
      field: 'product', 
      headerName: 'PRODUCT',
      width: 180,
      headerComponent: DraggableHeaderComponent,
      headerComponentParams: {
        isDraggable: false,
        displayName: 'PRODUCT'
      },
      cellRenderer: (params: { data: GroupedRowData; value: string }) => {
        if (params.data.__isGroup) {
          const indent = (params.data.__level || 0) * 20;
          return (
            <div style={{ paddingLeft: `${indent}px` }} className="flex items-center gap-2">
              <button 
                onClick={() => toggleGroup(params.data.__groupId || '')}
                className="text-xs"
              >
                {params.data.__expanded ? '▼' : '▶'}
              </button>
              <span className="font-semibold">
                {params.data.__groupField}: {params.data.__groupValue} ({params.data.__childCount})
              </span>
            </div>
          );
        }
        const indent = groupedColumns.length * 20;
        return <div style={{ paddingLeft: `${indent}px` }}>{params.value}</div>;
      }
    },
    { 
      field: 'priceEffective', 
      headerName: 'PRICE EFFECTIVE', 
      width: 200,
      headerComponent: DraggableHeaderComponent,
      headerComponentParams: {
        displayName: 'PRICE EFFECTIVE',
        onDragStart: handleHeaderDragStart
      }
    },
    { 
      field: 'group', 
      headerName: 'GROUP', 
      width: 100,
      headerComponent: DraggableHeaderComponent,
      headerComponentParams: {
        displayName: 'GROUP',
        onDragStart: handleHeaderDragStart
      }
    },
    { 
      field: 'spot', 
      headerName: 'SPOT', 
      width: 120,
      headerComponent: DraggableHeaderComponent,
      headerComponentParams: {
        displayName: 'SPOT',
        onDragStart: handleHeaderDragStart
      },
      cellRenderer: (params: { value: string }) => {
        const isAssigned = params.value !== 'Not assigned';
        return (
          <span className={`status-badge ${isAssigned ? 'assigned' : 'not-assigned'}`}>
            {params.value}
          </span>
        );
      }
    },
    { 
      field: 'rackLow', 
      headerName: 'RACK LOW', 
      width: 120,
      headerComponent: DraggableHeaderComponent,
      headerComponentParams: {
        displayName: 'RACK LOW',
        onDragStart: handleHeaderDragStart
      },
      cellRenderer: (params: { value: string }) => {
        const isAssigned = params.value !== 'Not assigned';
        return (
          <span className={`status-badge ${isAssigned ? 'assigned' : 'not-assigned'}`}>
            {params.value}
          </span>
        );
      }
    },
    { 
      field: 'rackAverage', 
      headerName: 'RACK AVERAGE', 
      width: 130,
      headerComponent: DraggableHeaderComponent,
      headerComponentParams: {
        displayName: 'RACK AVERAGE',
        onDragStart: handleHeaderDragStart
      },
      cellRenderer: (params: { value: string }) => {
        const isAssigned = params.value !== 'Not assigned';
        return (
          <span className={`status-badge ${isAssigned ? 'assigned' : 'not-assigned'}`}>
            {params.value}
          </span>
        );
      }
    },
    { 
      field: 'competitor', 
      headerName: 'COMPETITOR', 
      width: 130,
      headerComponent: DraggableHeaderComponent,
      headerComponentParams: {
        displayName: 'COMPETITOR',
        onDragStart: handleHeaderDragStart
      },
      cellRenderer: (params: { value: string }) => {
        if (params.value?.includes('BENCHMARK')) {
          return (
            <span className="status-badge assigned">
              {params.value}
            </span>
          );
        }
        return <span>{params.value}</span>;
      }
    },
    { 
      field: 'custom', 
      headerName: 'CUSTOM', 
      width: 120,
      headerComponent: DraggableHeaderComponent,
      headerComponentParams: {
        displayName: 'CUSTOM',
        onDragStart: handleHeaderDragStart
      },
      cellRenderer: (params: { value: string }) => {
        const isAssigned = params.value !== 'Not assigned';
        return (
          <span className={`status-badge ${isAssigned ? 'assigned' : 'not-assigned'}`}>
            {params.value}
          </span>
        );
      }
    },
  ], [groupedColumns, handleHeaderDragStart, toggleGroup]);

  useEffect(() => {
    if (groupedColumns.length === 0) {
      setDisplayData(rowData);
      return;
    }

    const groupData = (data: RowData[], fields: string[], level = 0): GroupedRowData[] => {
      if (fields.length === 0) return data;

      const [currentField, ...remainingFields] = fields;
      const grouped = new Map<string, RowData[]>();
      
      data.forEach(item => {
        const key = String(item[currentField as keyof RowData]);
        if (!grouped.has(key)) {
          grouped.set(key, []);
        }
        grouped.get(key)!.push(item);
      });

      const result: GroupedRowData[] = [];
      grouped.forEach((items, groupValue) => {
        const groupId = `${currentField}-${groupValue}-${level}`;
        const isExpanded = expandedGroups.has(groupId);
        
        result.push({
          __isGroup: true,
          __groupId: groupId,
          __groupField: currentField,
          __groupValue: groupValue,
          __childCount: items.length,
          __level: Number(level),
          __expanded: isExpanded,
          id: Math.floor(Math.random() * 1000000),
          product: '',
          priceEffective: '',
          group: '',
          spot: '',
          rackLow: '',
          rackAverage: '',
          competitor: '',
          custom: ''
        });

        if (isExpanded) {
          if (remainingFields.length > 0) {
            result.push(...groupData(items, remainingFields, level + 1));
          } else {
            result.push(...items);
          }
        }
      });

      return result;
    };

    setDisplayData(groupData(rowData, groupedColumns));
  }, [rowData, groupedColumns, expandedGroups]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    
    const field = e.dataTransfer.getData('text/plain');
    
    if (field && !groupedColumns.includes(field)) {
      setGroupedColumns([...groupedColumns, field]);
      // Auto expand all groups when first created
      const newExpanded = new Set(expandedGroups);
      displayData.forEach((item) => {
        if (item.__isGroup) {
          newExpanded.add(item.__groupId!);
        }
      });
      setExpandedGroups(newExpanded);
    }
    setDraggedColumn(null);
  };

  const removeGrouping = (field: string) => {
    setGroupedColumns(groupedColumns.filter(f => f !== field));
    setExpandedGroups(new Set());
  };


  return (
    <div className="space-y-4">
      {/* Grouping Drop Zone */}
      <div 
        className={`bg-white border rounded-lg p-4 transition-all ${
          isDraggingOver ? 'border-primary bg-primary/5 shadow-sm' : 
          draggedColumn ? 'border-primary/50' : 'border-border'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Group By</h3>
          {groupedColumns.length > 0 && (
            <button
              onClick={() => {
                setGroupedColumns([]);
                setExpandedGroups(new Set());
              }}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear all
            </button>
          )}
        </div>
        <div className="flex gap-2 flex-wrap items-center min-h-[32px]">
          {groupedColumns.length === 0 ? (
            <div className="text-muted-foreground text-sm">Drag column headers here to group data</div>
          ) : (
            groupedColumns.map((field, index) => (
              <React.Fragment key={field}>
                {index > 0 && <span className="text-muted-foreground text-xs">then</span>}
                <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium">
                  <span className="capitalize">{field}</span>
                  <button
                    onClick={() => removeGrouping(field)}
                    className="text-primary/70 hover:text-primary ml-1"
                    title="Remove grouping"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </React.Fragment>
            ))
          )}
        </div>
      </div>

      {/* AG-Grid Table */}
      <div className="ag-theme-figma rounded overflow-hidden border border-border" style={{ height: '600px', width: '100%' }}>
        <AgGridReact
          ref={gridRef}
          rowData={displayData}
          columnDefs={columnDefs}
          defaultColDef={{
            sortable: true,
            filter: false,
            resizable: true,
          }}
          getRowId={(params) => String(params.data.id)}
          animateRows={true}
          suppressMovableColumns={true}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          headerHeight={40}
          rowHeight={56}
        />
      </div>
    </div>
  );
};

export default StableAgGrid;