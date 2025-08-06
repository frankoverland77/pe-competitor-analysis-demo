import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

const SimpleAgGrid = () => {
  const rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 }
  ];

  const columnDefs = useMemo(() => [
    { field: 'make' as const, headerName: 'Make' },
    { field: 'model' as const, headerName: 'Model' },
    { field: 'price' as const, headerName: 'Price' }
  ], []);

  return (
    <div className="ag-theme-quartz" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
      />
    </div>
  );
};

export default SimpleAgGrid;