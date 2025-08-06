# Component Reference

## Layout Components

### Layout
Main wrapper component that provides the application structure.
- Props: `children: React.ReactNode`
- Features: Manages sidebar collapse state, responsive layout

### TopNavigation
Fixed header navigation bar with branding and utility buttons.
- Props: `onMenuClick: () => void`
- Features: Theme toggle, notification icon, user menu

### AppSidebar
Collapsible sidebar navigation with PE Green gradient background.
- Props: 
  - `collapsed: boolean`
  - `setCollapsed: (collapsed: boolean) => void`
- Features: 8 navigation items, smooth collapse animation

## UI Components

### Button
Versatile button component with multiple variants.
- Variants: default, destructive, outline, secondary, ghost, link
- Sizes: default, sm, lg, icon
- Props: All standard button HTML attributes plus variant and size

### Card
Container component for content sections.
- Sub-components:
  - CardHeader
  - CardTitle
  - CardDescription
  - CardContent
  - CardFooter

## Utility Functions

### cn()
Utility for merging Tailwind CSS classes with proper precedence.
- Usage: `cn("base-class", conditionalClass && "conditional-class", className)`
- Located in: `/src/lib/utils.ts`