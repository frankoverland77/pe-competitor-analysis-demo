import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { TopNavigation } from './TopNavigation'
import { AppSidebar } from './AppSidebar'
import { cn } from '@/lib/utils'

export const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  
  return (
    <div className="min-h-screen bg-background">
      <TopNavigation onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <AppSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className={cn(
        "mt-14 transition-all duration-300 bg-background",
        sidebarCollapsed ? "ml-[76px]" : "ml-64"
      )}>
        <Outlet />
      </main>
    </div>
  )
}