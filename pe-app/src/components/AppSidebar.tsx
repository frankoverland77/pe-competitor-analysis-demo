import { useState } from 'react'
import { cn } from '../lib/utils'
import { Button } from './ui/button'
import { 
  FileText, 
  DollarSign, 
  BarChart3, 
  Database,
  Settings,
  ChevronRight,
  Home,
  Users,
  FolderOpen
} from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Nav Item 1', path: '/' },
  { icon: FileText, label: 'Nav Item 2', path: '/item2' },
  { icon: DollarSign, label: 'Nav Item 3', path: '/item3' },
  { icon: BarChart3, label: 'Nav Item 4', path: '/item4' },
  { icon: Database, label: 'Nav Item 5', path: '/item5' },
  { icon: Users, label: 'Nav Item 6', path: '/item6' },
  { icon: FolderOpen, label: 'Nav Item 7', path: '/item7' },
  { icon: Settings, label: 'Nav Item 8', path: '/settings' },
]

interface AppSidebarProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

export const AppSidebar = ({ collapsed, setCollapsed }: AppSidebarProps) => {
  const [activeItem, setActiveItem] = useState('/')
  
  return (
    <aside className={cn(
      "fixed left-0 top-14 bottom-0 z-30",
      "bg-gradient-to-b from-[#0f2e1f] to-[#1a3829]",
      "transition-all duration-300",
      "shadow-xl",
      collapsed ? "w-[76px]" : "w-64"
    )}>
      <div className="p-3 flex items-center justify-between">
        {collapsed ? (
          <div className="w-full flex justify-center">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">
              GP
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">
              GP
            </div>
            <span className="text-white font-semibold">Gravitate</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "text-white/70 hover:text-white hover:bg-white/10",
            collapsed && "absolute right-2"
          )}
        >
          <ChevronRight className={cn(
            "h-5 w-5 transition-transform",
            !collapsed && "rotate-180"
          )} />
        </Button>
      </div>
      
      <nav className="px-3 space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            onClick={() => setActiveItem(item.path)}
            className={cn(
              "w-full justify-start",
              "text-white/70 hover:text-white hover:bg-white/10",
              "transition-all duration-200",
              collapsed && "justify-center px-0",
              activeItem === item.path && "bg-white/10 text-white"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5",
              !collapsed && "mr-3"
            )} />
            {!collapsed && <span>{item.label}</span>}
          </Button>
        ))}
      </nav>
    </aside>
  )
}