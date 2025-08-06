import { useCallback, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import type { ColDef } from 'ag-grid-community'
import { Button } from '@/components/ui/button'
import { CompetitorBadge } from '../shared/CompetitorBadge'
import { ConsistencyBadge } from '../shared/ConsistencyBadge'
import type { CompetitorData } from '@/services/competitorAnalysis'

interface CompetitorDataGridProps {
  data: CompetitorData[]
  onAnalyze: (competitor: CompetitorData) => void
}

export function CompetitorDataGrid({ data, onAnalyze }: CompetitorDataGridProps) {

  const columnDefs = useMemo((): ColDef<CompetitorData>[] => [
    {
      field: 'competitor',
      headerName: 'COMPETITOR',
      flex: 1,
      minWidth: 150,
      pinned: 'left',
    },
    {
      field: 'location',
      headerName: 'LOCATION',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'locationGroup',
      headerName: 'LOCATION GROUP',
      flex: 1,
      minWidth: 140,
    },
    {
      field: 'product',
      headerName: 'PRODUCT',
      flex: 0.8,
      minWidth: 120,
    },
    {
      field: 'productGroup',
      headerName: 'PRODUCT GROUP',
      flex: 1,
      minWidth: 140,
    },
    {
      field: 'brand',
      headerName: 'BRAND',
      flex: 0.7,
      minWidth: 100,
    },
    {
      field: 'strategyTag',
      headerName: 'STRATEGY TAG',
      flex: 1,
      minWidth: 150,
      cellRenderer: (params: { value: string }) => {
        return <CompetitorBadge strategy={params.value} />
      },
    },
    {
      field: 'captureRate',
      headerName: 'SPOT DELTA CAPTURE',
      flex: 1.1,
      minWidth: 140,
      valueFormatter: (params: { value: number }) => `${params.value.toFixed(1)}%`,
    },
    {
      field: 'predictability',
      headerName: 'CONSISTENCY',
      flex: 1.2,
      minWidth: 180,
      cellRenderer: (params: { value: number }) => {
        return <ConsistencyBadge value={params.value} />
      },
    },
    {
      field: 'actions',
      headerName: 'ACTIONS',
      flex: 0.8,
      minWidth: 120,
      cellRenderer: (params: { data: CompetitorData }) => {
        return (
          <button
            onClick={() => onAnalyze(params.data)}
            className="text-[#51B073] hover:text-[#51B073]/80 font-medium transition-colors"
          >
            Analyze
          </button>
        )
      },
    },
  ], [onAnalyze])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: false,
    resizable: true,
  }), [])

  const getRowId = useCallback((params: { data: CompetitorData }) => params.data.id, [])

  return (
    <div className="ag-theme-figma h-full w-full">
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        getRowId={getRowId}
        animateRows={true}
        rowHeight={48}
        headerHeight={40}
        suppressMovableColumns={true}
        domLayout="normal"
        theme="legacy"
      />
    </div>
  )
}