interface CompetitorAnalysisHeaderProps {
  onExport: () => void
}

export function CompetitorAnalysisHeader({ onExport }: CompetitorAnalysisHeaderProps) {
  return (
    <div className="bg-[#F7F7F7] px-6 py-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1F2937]">Competitor Price Analysis</h1>
      </div>
    </div>
  )
}