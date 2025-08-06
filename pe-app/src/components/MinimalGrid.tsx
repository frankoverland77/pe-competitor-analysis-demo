import { AgGridReact } from 'ag-grid-react';

const MinimalGrid = () => {
  const rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 }
  ];

  const columnDefs = [
    { field: 'make' as const },
    { field: 'model' as const },
    { field: 'price' as const }
  ];

  return (
    <div>
      <h3>Testing AG-Grid:</h3>
      <div className="ag-theme-quartz" style={{ height: 400, width: 600 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
        />
      </div>
    </div>
  );
};

export default MinimalGrid;