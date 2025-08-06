import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

const DebugGrid = () => {
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      // Check if AG-Grid is loaded
      console.log('AG-Grid React imported:', !!AgGridReact);
      console.log('Window AG-Grid:', !!(window as any).agGrid);
      
      // Check if styles are loaded
      const styles = Array.from(document.styleSheets);
      const hasAgGridStyles = styles.some(sheet => {
        try {
          return sheet.href && sheet.href.includes('ag-grid');
        } catch (e) {
          return false;
        }
      });
      console.log('AG-Grid styles loaded:', hasAgGridStyles);
      
      setLoaded(true);
    } catch (err: any) {
      setError(err.message);
      console.error('Error loading AG-Grid:', err);
    }
  }, []);

  const rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 }
  ];

  const columnDefs = [
    { field: 'make', headerName: 'Make' },
    { field: 'model', headerName: 'Model' },
    { field: 'price', headerName: 'Price' }
  ];

  return (
    <div>
      <h3>Debug Information:</h3>
      <ul className="text-sm mb-4">
        <li>AG-Grid Loaded: {loaded ? '✅' : '❌'}</li>
        <li>Error: {error || 'None'}</li>
      </ul>
      
      <h3>Simple AG-Grid:</h3>
      {error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <div className="ag-theme-quartz" style={{ height: '400px', width: '100%' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            onGridReady={(params) => {
              console.log('Grid Ready!', params);
            }}
          />
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Check browser console for debug information</p>
      </div>
    </div>
  );
};

export default DebugGrid;