import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

const WorkingAgGrid = () => {
  const [rowData] = useState([
    { id: 1, name: 'John Doe', department: 'Engineering', role: 'Senior Developer', salary: 120000, location: 'New York', joinDate: '2020-01-15' },
    { id: 2, name: 'Jane Smith', department: 'Engineering', role: 'Developer', salary: 95000, location: 'San Francisco', joinDate: '2021-03-20' },
    { id: 3, name: 'Bob Johnson', department: 'Sales', role: 'Sales Manager', salary: 110000, location: 'New York', joinDate: '2019-07-10' },
    { id: 4, name: 'Alice Brown', department: 'Sales', role: 'Sales Rep', salary: 75000, location: 'Chicago', joinDate: '2022-01-05' },
    { id: 5, name: 'Charlie Wilson', department: 'Marketing', role: 'Marketing Director', salary: 130000, location: 'San Francisco', joinDate: '2018-11-30' },
    { id: 6, name: 'Eva Davis', department: 'Engineering', role: 'Junior Developer', salary: 70000, location: 'Chicago', joinDate: '2023-02-14' },
    { id: 7, name: 'Frank Miller', department: 'HR', role: 'HR Manager', salary: 90000, location: 'New York', joinDate: '2020-06-22' },
    { id: 8, name: 'Grace Lee', department: 'Marketing', role: 'Content Writer', salary: 65000, location: 'San Francisco', joinDate: '2021-09-18' },
  ]);

  const [groupedBy, setGroupedBy] = useState<string[]>([]);

  const columnDefs = useMemo(() => [
    { field: 'name', headerName: 'Name', minWidth: 150 },
    { field: 'department', headerName: 'Department', minWidth: 120 },
    { field: 'role', headerName: 'Role', minWidth: 150 },
    { 
      field: 'salary', 
      headerName: 'Salary', 
      minWidth: 100,
      valueFormatter: (params: any) => `$${params.value?.toLocaleString() || 0}`
    },
    { field: 'location', headerName: 'Location', minWidth: 120 },
    { field: 'joinDate', headerName: 'Join Date', minWidth: 100 },
  ], []);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
  }), []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-blue-100');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('bg-blue-100');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-blue-100');
    
    const columnId = e.dataTransfer.getData('text/plain');
    if (columnId && !groupedBy.includes(columnId)) {
      setGroupedBy([...groupedBy, columnId]);
    }
  };

  const removeGrouping = (field: string) => {
    setGroupedBy(groupedBy.filter(f => f !== field));
  };

  // Process data for grouping
  const processedData = useMemo(() => {
    if (groupedBy.length === 0) return rowData;
    
    // Simple grouping visualization - in real implementation, you'd need more complex logic
    const grouped: any[] = [];
    const groups = new Map<string, any[]>();
    
    rowData.forEach(row => {
      const key = groupedBy.map(field => row[field as keyof typeof row]).join('-');
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(row);
    });
    
    groups.forEach((items, key) => {
      grouped.push({
        id: `group-${key}`,
        name: `${groupedBy[0]}: ${items[0][groupedBy[0] as keyof typeof items[0]]} (${items.length} items)`,
        isGroup: true
      });
      grouped.push(...items);
    });
    
    return grouped;
  }, [rowData, groupedBy]);

  return (
    <div className="space-y-4">
      {/* Grouping drop zone */}
      <div 
        className="min-h-[80px] border-2 border-dashed border-gray-300 rounded-lg p-4 transition-colors"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-sm text-gray-600 mb-2">Drag column headers here to group by</div>
        <div className="flex gap-2 flex-wrap">
          {groupedBy.length === 0 ? (
            <div className="text-gray-400 text-sm">No grouping applied</div>
          ) : (
            groupedBy.map((field, index) => (
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

      {/* AG-Grid */}
      <div className="ag-theme-quartz" style={{ height: '500px', width: '100%' }}>
        <AgGridReact
          rowData={processedData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          onGridReady={() => {
            // Enable column header dragging
            setTimeout(() => {
              const headers = document.querySelectorAll('.ag-header-cell-label');
              headers.forEach((header: any) => {
                const columnId = header.closest('.ag-header-cell')?.getAttribute('col-id');
                if (columnId) {
                  header.draggable = true;
                  header.addEventListener('dragstart', (e: DragEvent) => {
                    e.dataTransfer!.setData('text/plain', columnId);
                  });
                }
              });
            }, 100);
          }}
        />
      </div>
    </div>
  );
};

export default WorkingAgGrid;