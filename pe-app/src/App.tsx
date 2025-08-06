import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import StableAgGrid from './components/StableAgGrid'
import { CompetitorAnalysisGrid } from './pages/competitor-analysis/CompetitorAnalysisGrid'
import { CompetitorAnalysisDetail } from './pages/competitor-analysis/CompetitorAnalysisDetail'

function HomePage() {
  return (
    <div className="p-6">
      <div className="container-xl max-w-[1400px] mx-auto space-y-6">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Manage Benchmarks</h2>
              <p className="text-sm text-muted-foreground mt-1">66 Results</p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm font-medium">
              + Create New Benchmark
            </button>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <select className="px-3 py-2 border border-border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>Configuration</option>
            </select>
            <select className="px-3 py-2 border border-border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>Terminal</option>
            </select>
            <div className="flex-1"></div>
            <input 
              type="search" 
              placeholder="Search here"
              className="px-3 py-2 border border-border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
            />
          </div>
        </div>
        
        <StableAgGrid />
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/calculations" replace />} />
          <Route path="calculations" element={<HomePage />} />
          <Route path="competitor-analysis" element={<CompetitorAnalysisGrid />} />
          <Route path="competitor-analysis/:id" element={<CompetitorAnalysisDetail />} />
          <Route path="*" element={<Navigate to="/calculations" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App