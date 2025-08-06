# Implementation Guide for shadcn/ui

## Getting Started with shadcn/ui

### Installation

1. **Initialize shadcn/ui in your project**
```bash
npx shadcn-ui@latest init
```

2. **Configuration choices**
```
Would you like to use TypeScript? › Yes
Which style would you like to use? › Default
Which color would you like to use as base? › Slate
Where is your global CSS file? › src/styles/globals.css
Do you want to use CSS variables for colors? › Yes
Where is your tailwind.config.js? › tailwind.config.js
Configure import alias? › @/components
```

3. **Add components as needed**
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add form
npx shadcn-ui@latest add table
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add toast
```

### Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   └── features/          # Feature-specific components
│       ├── contracts/
│       └── analytics/
├── lib/
│   └── utils.ts           # Utility functions (cn, etc.)
├── styles/
│   └── globals.css        # Global styles and CSS variables
└── app/                   # Application pages/routes
```

## Core Setup

### Tailwind Configuration
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Lato", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

### Global CSS with PE Green Theme
```css
/* src/styles/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 97%;
    --foreground: 0 0% 20%;
    
    --card: 0 0% 100%;
    --card-foreground: 0 0% 20%;
    
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 20%;
    
    /* PE Green Primary */
    --primary: 142 40% 54%;
    --primary-foreground: 0 0% 100%;
    
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    
    --muted: 210 40% 96%;
    --muted-foreground: 0 0% 40%;
    
    --accent: 142 40% 44%;
    --accent-foreground: 0 0% 100%;
    
    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 100%;
    
    --border: 0 0% 87%;
    --input: 0 0% 87%;
    --ring: 142 40% 54%;
    
    --radius: 0.5rem;
    
    /* Custom semantic colors */
    --success: 142 76% 36%;
    --warning: 38 92% 50%;
    --info: 221 83% 53%;
  }
  
  .dark {
    --background: 224 71% 4%;
    --foreground: 210 20% 98%;
    
    --card: 224 71% 8%;
    --card-foreground: 210 20% 98%;
    
    --popover: 224 71% 8%;
    --popover-foreground: 210 20% 98%;
    
    --primary: 142 40% 60%;
    --primary-foreground: 0 0% 100%;
    
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    
    --accent: 142 40% 50%;
    --accent-foreground: 0 0% 100%;
    
    --destructive: 0 62.8% 60%;
    --destructive-foreground: 0 0% 100%;
    
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 142 40% 60%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: 'Lato', sans-serif;
  }
}
```

### Utility Functions
```typescript
// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Building the Layout

### Main Layout Component
```tsx
// components/layout/Layout.tsx
import { TopNavigation } from './TopNavigation'
import { AppSidebar } from './AppSidebar'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      <AppSidebar />
      <main className="ml-[76px] mt-12 p-6 transition-all duration-300
                      data-[sidebar-expanded=true]:ml-64">
        <div className="container-xl">
          {children}
        </div>
      </main>
    </div>
  )
}
```

### Header Implementation
```tsx
// components/layout/TopNavigation.tsx
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Menu, Sun, Moon, Bell, User } from 'lucide-react'
import { useTheme } from 'next-themes'

export const TopNavigation = () => {
  const { theme, setTheme } = useTheme()
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-12 
                       bg-card border-b flex items-center px-4">
      <Button variant="ghost" size="icon" className="lg:hidden">
        <Menu className="h-5 w-5" />
      </Button>
      
      <div className="flex-1 flex items-center gap-6">
        <h1 className="text-lg font-semibold">PE Contract Management</h1>
        
        <nav className="hidden md:flex gap-4">
          <Button variant="ghost" className="text-sm">Contracts</Button>
          <Button variant="ghost" className="text-sm">Analytics</Button>
          <Button variant="ghost" className="text-sm">Settings</Button>
        </nav>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => 
          setTheme(theme === 'dark' ? 'light' : 'dark')
        }>
          {theme === 'dark' ? 
            <Sun className="h-5 w-5" /> : 
            <Moon className="h-5 w-5" />
          }
        </Button>
        
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
```

### Sidebar Implementation
```tsx
// components/layout/AppSidebar.tsx
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  DollarSign, 
  BarChart3, 
  Database,
  Settings,
  ChevronRight
} from 'lucide-react'

const navItems = [
  { icon: FileText, label: 'Contracts', path: '/contracts' },
  { icon: DollarSign, label: 'Pricing', path: '/pricing' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Database, label: 'Data', path: '/data' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(true)
  
  return (
    <aside className={cn(
      "fixed left-0 top-12 bottom-0 z-30",
      "bg-gradient-to-b from-[#0f2e1f] to-[#1a3829]",
      "transition-all duration-300",
      "shadow-xl",
      collapsed ? "w-[76px]" : "w-64"
    )}>
      <div className="p-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center text-white/70 hover:text-white hover:bg-white/10"
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
            className={cn(
              "w-full justify-start",
              "text-white/70 hover:text-white hover:bg-white/10",
              "transition-all duration-200",
              collapsed && "justify-center px-0"
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
```

## Common Patterns

### Dashboard with Metrics
```tsx
// pages/Dashboard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

const metrics = [
  { 
    title: 'Total Revenue', 
    value: '$1,250,000', 
    change: '+12.5%', 
    trend: 'up' 
  },
  { 
    title: 'Active Contracts', 
    value: '156', 
    change: '+8', 
    trend: 'up' 
  },
  { 
    title: 'Pending Review', 
    value: '23', 
    change: '-3', 
    trend: 'down' 
  },
]

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>Create Contract</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              {metric.trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 text-success" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-destructive" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={cn(
                "text-xs",
                metric.trend === 'up' ? 'text-success' : 'text-destructive'
              )}>
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

### Data Table with Actions
```tsx
// components/ContractTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Copy, Trash } from "lucide-react"

export const ContractTable = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Contract ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((contract) => (
          <TableRow key={contract.id}>
            <TableCell className="font-mono">{contract.id}</TableCell>
            <TableCell>{contract.customer}</TableCell>
            <TableCell>
              <Badge 
                variant={
                  contract.status === 'active' ? 'success' :
                  contract.status === 'pending' ? 'warning' : 
                  'secondary'
                }
              >
                {contract.status}
              </Badge>
            </TableCell>
            <TableCell>${contract.value.toLocaleString()}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

## Best Practices

1. **Component Composition**: Build complex UIs from simple shadcn/ui components
2. **Consistent Styling**: Use the design tokens and utility classes
3. **Accessibility**: shadcn/ui components include ARIA attributes by default
4. **Type Safety**: All components are fully typed with TypeScript
5. **Customization**: Override default styles with className prop
6. **Performance**: Components are optimized and tree-shakeable
7. **Dark Mode**: All components support dark mode automatically
8. **Responsive**: Use Tailwind's responsive utilities for mobile-first design

## Common Pitfalls to Avoid

1. **Don't modify shadcn/ui components directly** - use className for customization
2. **Don't forget to install peer dependencies** when adding new components
3. **Don't mix different UI libraries** - stick to shadcn/ui for consistency
4. **Don't ignore TypeScript errors** - they help catch bugs early
5. **Don't overcomplicate state management** - start simple, add complexity as needed
6. **Don't skip accessibility testing** - use keyboard navigation and screen readers
7. **Don't forget loading and error states** - handle all UI states properly
8. **Don't make components too large** - split into smaller, reusable pieces