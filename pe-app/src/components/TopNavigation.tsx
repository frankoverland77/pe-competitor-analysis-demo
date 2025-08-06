import { Button } from './ui/button'
import { Menu, User } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useNavigate, useLocation } from 'react-router-dom'

interface TopNavigationProps {
  onMenuClick: () => void
}

const navTabs = [
  { id: 'quote-book', label: 'Quote Book', path: '/quote-book' },
  { id: 'calculations', label: 'Calculations', path: '/calculations' },
  { id: 'formula-management', label: 'Formula Management', path: '/formula-management' },
  { id: 'quote-rows', label: 'Quote Rows', path: '/quote-rows' },
  { id: 'prices', label: 'Prices', path: '/prices' },
  { id: 'competitor-analysis', label: 'Competitor Analysis', path: '/competitor-analysis' },
]

export const TopNavigation = ({ onMenuClick }: TopNavigationProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Determine active tab based on current path
  const activeTab = navTabs.find(tab => location.pathname.startsWith(tab.path))?.id || 'calculations'
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-white border-b border-border flex items-center px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>
      
      <div className="flex-1 flex items-center">
        <h1 className="text-base font-bold text-gray-800 mr-8 tracking-wider">PRICING ENGINE</h1>
        
        <nav className="hidden md:flex items-center">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={cn(
                "px-4 py-4 text-sm font-medium transition-colors relative",
                "hover:text-gray-900",
                activeTab === tab.id 
                  ? "text-gray-900" 
                  : "text-gray-600"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Joe Smith</span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}