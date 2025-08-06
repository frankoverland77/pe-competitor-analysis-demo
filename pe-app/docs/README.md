# PE Application Documentation

## Overview
This React application implements the PE design system with shadcn/ui components, featuring a collapsible sidebar navigation and header layout.

## Project Structure
```
pe-app/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Base UI components
│   │   ├── Layout.tsx    # Main layout wrapper
│   │   ├── TopNavigation.tsx  # Header navigation
│   │   └── AppSidebar.tsx     # Collapsible sidebar
│   ├── lib/              # Utility functions
│   └── index.css         # Global styles with PE Green theme
├── docs/                 # Documentation
└── package.json         # Dependencies
```

## Design System

### Colors
- Primary: PE Green (#51B073 / HSL: 142, 40%, 54%)
- Background: Light gray in light mode, dark blue in dark mode
- Sidebar: Gradient from dark green (#0f2e1f) to (#1a3829)

### Layout
- Fixed header: 48px height
- Collapsible sidebar: 76px collapsed / 256px expanded
- Content area: Responsive with max-width 1400px

### Components
- **Button**: Multiple variants (default, destructive, outline, secondary, ghost, link)
- **Card**: Container component with header, content, and footer sections
- **Layout**: Main wrapper with sidebar and header integration

## Navigation Structure
The application includes 8 navigation items in the sidebar:
- Nav Item 1-8: Placeholder navigation items to be defined

## Theme Support
- Light/Dark mode toggle in the header
- CSS variables for consistent theming
- Automatic color adjustments based on theme

## Development
```bash
npm run dev    # Start development server
npm run build  # Build for production
```