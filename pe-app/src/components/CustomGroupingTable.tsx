import React, { useState, useCallback, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';

interface RowData {
  id: number;
  name: string;
  department: string;
  role: string;
  salary: number;
  location: string;
  joinDate: string;
}

interface GroupedData extends RowData {
  isGroup?: boolean;
  groupField?: string;
  groupValue?: string;
  children?: RowData[];
  expanded?: boolean;
}

const CustomGroupingTable: React.FC = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [rowData] = useState<RowData[]>([
    { id: 1, name: 'John Doe', department: 'Engineering', role: 'Senior Developer', salary: 120000, location: 'New York', joinDate: '2020-01-15' },
    { id: 2, name: 'Jane Smith', department: 'Engineering', role: 'Developer', salary: 95000, location: 'San Francisco', joinDate: '2021-03-20' },
    { id: 3, name: 'Bob Johnson', department: 'Sales', role: 'Sales Manager', salary: 110000, location: 'New York', joinDate: '2019-07-10' },
    { id: 4, name: 'Alice Brown', department: 'Sales', role: 'Sales Rep', salary: 75000, location: 'Chicago', joinDate: '2022-01-05' },
    { id: 5, name: 'Charlie Wilson', department: 'Marketing', role: 'Marketing Director', salary: 130000, location: 'San Francisco', joinDate: '2018-11-30' },
    { id: 6, name: 'Eva Davis', department: 'Engineering', role: 'Junior Developer', salary: 70000, location: 'Chicago', joinDate: '2023-02-14' },
    { id: 7, name: 'Frank Miller', department: 'HR', role: 'HR Manager', salary: 90000, location: 'New York', joinDate: '2020-06-22' },
    { id: 8, name: 'Grace Lee', department: 'Marketing', role: 'Content Writer', salary: 65000, location: 'San Francisco', joinDate: '2021-09-18' },
  ]);

  const [groupedFields, setGroupedFields] = useState<string[]>([]);
  const [processedData, setProcessedData] = useState<GroupedData[]>(rowData);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const columnDefs = useMemo(() => [
    { 
      field: 'name', 
      headerName: 'Name',
      cellRenderer: (params: any) => {
        if (params.data.isGroup) {
          return (
            <div className="flex items-center gap-2">
              <button
                className="text-xs"
                onClick={() => toggleGroup(params.data)}
              >
                {params.data.expanded ? '▼' : '▶'}
              </button>
              <span className="font-semibold">
                {params.data.groupField}: {params.data.groupValue} ({params.data.children?.length || 0})
              </span>
            </div>
          );
        }
        return <span style={{ paddingLeft: `${(groupedFields.length) * 20}px` }}>{params.value}</span>;
      }
    },
    { field: 'department', headerName: 'Department' },
    { field: 'role', headerName: 'Role' },
    { field: 'salary', headerName: 'Salary', valueFormatter: (params) => `$${params.value?.toLocaleString()}` },
    { field: 'location', headerName: 'Location' },
    { field: 'joinDate', headerName: 'Join Date' },
  ], [groupedFields]);

  const toggleGroup = (groupData: GroupedData) => {
    const newData = [...processedData];
    const index = newData.findIndex(row => row === groupData);
    if (index !== -1) {
      newData[index].expanded = !newData[index].expanded;
      setProcessedData(processGroupData(rowData, groupedFields, newData));
    }
  };

  const processGroupData = (data: RowData[], groupFields: string[], existingData?: GroupedData[]): GroupedData[] => {
    if (groupFields.length === 0) {
      return data;
    }

    const expandedStates = new Map<string, boolean>();
    existingData?.forEach(item => {
      if (item.isGroup && item.groupField && item.groupValue) {
        expandedStates.set(`${item.groupField}-${item.groupValue}`, item.expanded || false);
      }
    });

    const groupBy = (items: RowData[], field: string): Map<string, RowData[]> => {
      const grouped = new Map<string, RowData[]>();
      items.forEach(item => {
        const key = String(item[field as keyof RowData]);
        if (!grouped.has(key)) {
          grouped.set(key, []);
        }
        grouped.get(key)!.push(item);
      });
      return grouped;
    };

    const createGroupedData = (items: RowData[], fields: string[], level: number = 0): GroupedData[] => {
      if (fields.length === 0) {
        return items;
      }

      const [currentField, ...remainingFields] = fields;
      const grouped = groupBy(items, currentField);
      const result: GroupedData[] = [];

      grouped.forEach((children, groupValue) => {
        const groupKey = `${currentField}-${groupValue}`;
        const expanded = expandedStates.get(groupKey) ?? true;
        
        const groupRow: GroupedData = {
          id: -Math.random(),
          name: '',
          department: '',
          role: '',
          salary: 0,
          location: '',
          joinDate: '',
          isGroup: true,
          groupField: currentField,
          groupValue,
          children,
          expanded
        };

        result.push(groupRow);

        if (expanded) {
          if (remainingFields.length > 0) {
            result.push(...createGroupedData(children, remainingFields, level + 1));
          } else {
            result.push(...children);
          }
        }
      });

      return result;
    };

    return createGroupedData(data, groupFields);
  };

  const handleDragStart = (e: React.DragEvent, columnId: string) => {
    setDraggedColumn(columnId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (draggedColumn && !groupedFields.includes(draggedColumn)) {
      const newGroupedFields = [...groupedFields, draggedColumn];
      setGroupedFields(newGroupedFields);
      setProcessedData(processGroupData(rowData, newGroupedFields));
    }
    
    setDraggedColumn(null);
  };

  const removeGrouping = (field: string) => {
    const newGroupedFields = groupedFields.filter(f => f !== field);
    setGroupedFields(newGroupedFields);
    setProcessedData(processGroupData(rowData, newGroupedFields));
  };

  React.useEffect(() => {
    const api = gridRef.current?.api;
    if (api) {
      const allColumns = columnDefs.map(col => col.field!);
      const visibleColumns = allColumns.filter(col => !groupedFields.includes(col) || col === 'name');
      api.setColumnsVisible(allColumns, false);
      api.setColumnsVisible(visibleColumns, true);
    }
  }, [groupedFields, columnDefs]);

  return (
    <div className="flex flex-col gap-4">
      <div 
        className={`min-h-[80px] border-2 border-dashed rounded-lg p-4 transition-colors ${
          isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-sm text-gray-600 mb-2">Drag column headers here to group by</div>
        <div className="flex gap-2 flex-wrap">
          {groupedFields.length === 0 ? (
            <div className="text-gray-400 text-sm">No grouping applied</div>
          ) : (
            groupedFields.map((field, index) => (
              <div key={field} className="flex items-center gap-2">
                {index > 0 && <span className="text-gray-400">then by</span>}
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md flex items-center gap-2">
                  <span className="capitalize">{field}</span>
                  <button
                    onClick={() => removeGrouping(field)}
                    className="text-blue-600 hover:text-blue-800 font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="ag-theme-quartz" style={{ height: '500px', width: '100%' }}>
        <AgGridReact
          ref={gridRef}
          rowData={processedData}
          columnDefs={columnDefs}
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: true,
          }}
          onGridReady={(params) => {
            const headers = params.api.getDisplayedRowCount() > 0 ? 
              document.querySelectorAll('.ag-header-cell') : [];
            
            headers.forEach((header: any) => {
              const field = header.getAttribute('col-id');
              if (field && field !== 'name') {
                header.draggable = true;
                header.ondragstart = (e: DragEvent) => handleDragStart(e as any, field);
              }
            });
          }}
          getRowId={(params) => String(params.data.id)}
          animateRows={true}
        />
      </div>
    </div>
  );
};

export default CustomGroupingTable;