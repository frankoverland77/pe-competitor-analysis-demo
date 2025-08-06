# Header and Navigation Components

## Top Navigation Bar

### Structure and Layout

The header is a fixed-position component that spans the full width of the viewport and sits above all other content.

#### Dimensions
- **Height**: 48px (h-12)
- **Position**: Fixed top (`fixed top-0 left-0 right-0`)
- **Z-index**: 40 (above content, below modals)
- **Background**: Card background with border bottom

#### Component Sections

```
[Menu] [Title/Logo] [Tab Navigation] [Actions] [Profile]
```

### Key Features

#### 1. Menu Toggle (Mobile/Desktop)
- **Position**: Far left
- **Icon**: Menu/X icon toggle
- **Function**: Opens/closes sidebar on mobile, toggles sidebar width on desktop
- **Keyboard**: Accessible via Tab navigation

#### 2. Brand/Title Section
- **Company Logo**: 32x32px
- **Application Title**: "PE Contract Measurement"
- **Typography**: text-lg font-semibold

#### 3. Tab Navigation
Main application sections accessible via tabs:
```typescript
const tabs = [
  'Contracts',
  'Volume Assessment', 
  'Contract Measurement',
  'Portfolio Analytics'
];
```

**Tab Styling**:
- Default: `text-muted-foreground hover:text-foreground`
- Active: `text-foreground border-b-2 border-primary`
- Transition: `transition-all duration-200`

#### 4. Action Items (Right Side)
- **Theme Toggle**: Sun/Moon icon for dark mode
- **Notifications**: Bell icon with badge
- **Company Selector**: Dropdown for multi-tenant support
- **User Profile**: Avatar with dropdown menu

### Interaction Patterns

#### Responsive Behavior
- **Desktop**: Full tab navigation visible
- **Tablet**: Condensed tab labels
- **Mobile**: Tabs hidden, accessible via menu

#### Keyboard Navigation
- Tab through all interactive elements
- Arrow keys for tab navigation
- Escape to close dropdowns
- Enter/Space to activate buttons

#### Focus Management
```css
focus:outline-none 
focus:ring-2 
focus:ring-primary 
focus:ring-offset-2
```

## Sidebar Navigation

### Primary Sidebar Design

#### Dimensions
- **Collapsed Width**: 76px (icon-only mode)
- **Expanded Width**: 256px (full labels visible)
- **Height**: Full viewport height minus header
- **Position**: Fixed left side

#### Visual Design
```css
background: linear-gradient(180deg, #0f2e1f 0%, #1a3829 100%);
box-shadow: 
  2px 0 4px rgba(0, 0, 0, 0.1),
  4px 0 8px rgba(0, 0, 0, 0.05);
```

### Navigation Structure

#### Logo Section
- **Gravitate Logo**: 54x54px
- **Position**: Top center
- **Padding**: 12px vertical

#### Navigation Items
```typescript
interface NavItem {
  icon: LucideIcon;
  label: string;
  path?: string;
  badge?: number;
  subItems?: NavItem[];
}

const navigationItems = [
  {
    icon: FileText,
    label: 'Contract Management',
    path: '/contracts',
    subItems: [
      { label: 'Active Contracts', path: '/contracts/active' },
      { label: 'Pending Review', path: '/contracts/pending' },
      { label: 'Archives', path: '/contracts/archives' }
    ]
  },
  {
    icon: DollarSign,
    label: 'Pricing Engine',
    path: '/pricing'
  },
  {
    icon: BarChart3,
    label: 'Analytics',
    path: '/analytics',
    badge: 3 // New reports
  },
  {
    icon: Database,
    label: 'Data Management',
    path: '/data'
  },
  {
    icon: GitBranch,
    label: 'Integrations',
    path: '/integrations'
  },
  {
    icon: Shield,
    label: 'Admin',
    path: '/admin',
    requiredRole: 'admin'
  }
];
```

### Sidebar States

#### Collapsed State (Default)
- Shows only icons
- Tooltip on hover shows full label
- Width: 76px
- Smooth width transition

#### Expanded State
- Shows icons + labels
- Shows sub-navigation items
- Width: 256px
- Persistent via cookie/localStorage

#### Mobile State
- Full-screen overlay
- Slide-in from left animation
- Close on outside click
- Swipe-to-close gesture support

### Navigation Item Styling

#### Default State
```css
.nav-item {
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.7);
  transition: all 200ms;
}
```

#### Hover State
```css
.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.95);
}
```

#### Active State
```css
.nav-item.active {
  background: linear-gradient(90deg, 
    rgba(81, 176, 115, 0.2) 0%, 
    transparent 100%);
  color: #51B073;
  border-left: 3px solid #51B073;
}
```

### Advanced Features

#### Keyboard Shortcuts
- `Cmd/Ctrl + B`: Toggle sidebar
- `Cmd/Ctrl + /`: Open command palette
- Arrow keys: Navigate items
- `Enter`: Activate item

#### Accessibility
- Proper ARIA labels
- Role="navigation"
- Screen reader announcements
- Focus trap when mobile menu open

#### Performance
- Lazy load sub-navigation
- Virtualized long lists
- CSS transitions (no JavaScript animations)
- Optimistic UI updates

## Implementation Guidelines

### Component Structure
```tsx
// TopNavigation.tsx
export const TopNavigation = () => {
  const [activeTab, setActiveTab] = useState('Contracts');
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40 
                       h-12 bg-card border-b">
      {/* Implementation */}
    </header>
  );
};

// AppSidebar.tsx
export const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  
  return (
    <aside className={cn(
      "fixed left-0 top-12 bottom-0 z-30",
      "bg-gradient-to-b from-[#0f2e1f] to-[#1a3829]",
      "transition-all duration-300",
      collapsed ? "w-[76px]" : "w-64"
    )}>
      {/* Implementation */}
    </aside>
  );
};
```

### State Management
```typescript
// stores/navigation.ts
interface NavigationStore {
  sidebarCollapsed: boolean;
  activeTab: string;
  breadcrumbs: Breadcrumb[];
  toggleSidebar: () => void;
  setActiveTab: (tab: string) => void;
  pushBreadcrumb: (crumb: Breadcrumb) => void;
}
```

### Mobile Responsiveness
```tsx
// Use sheet for mobile sidebar
import { Sheet, SheetContent } from '@/components/ui/sheet';

<Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
  <SheetContent side="left" className="w-72 p-0">
    <AppSidebar />
  </SheetContent>
</Sheet>
```

### Animation Patterns
```css
/* Smooth transitions */
.sidebar-transition {
  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1),
              transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects */
.nav-item {
  transition: background-color 200ms,
              color 200ms,
              padding-left 200ms;
}
```

## Best Practices

1. **Consistency**: Keep navigation patterns consistent across all pages
2. **Predictability**: Users should always know where they are
3. **Accessibility**: Full keyboard and screen reader support
4. **Performance**: Lazy load heavy content, use CSS transitions
5. **Mobile-First**: Design for mobile, enhance for desktop
6. **Feedback**: Provide immediate visual feedback for all interactions
7. **Error States**: Handle navigation errors gracefully
8. **Deep Linking**: Support browser back/forward navigation