# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains UX design system documentation for building React applications with shadcn/ui, specifically focused on PE (Primary Energy) contract management and price analysis interfaces. The documentation covers implementation patterns, component architecture, and best practices for creating consistent, performant UIs with the PE Green brand (#51B073).

## Architecture

### Design System Structure
- **Tech Stack**: React 18.3, TypeScript 5.5, Vite 5.4, Tailwind CSS 3.4, shadcn/ui components
- **State Management**: Zustand for global state, TanStack Query for server state, React Hook Form for forms
- **Component Library**: Radix UI primitives with shadcn/ui wrapper components
- **Styling**: Utility-first with Tailwind CSS, CSS custom properties for theming, CVA for component variants

### Key Design Principles
- PE Green primary color (#51B073 / HSL: 142, 40%, 54%)
- 4px base spacing unit system
- Lato font for UI, JetBrains Mono for code
- Dark mode support with system-wide theming
- Mobile-first responsive design

## Development Commands

Since this is a documentation-only repository without a React application, there are no build or test commands. When implementing the design system in a new project:

```bash
# Initialize shadcn/ui in your project
npx shadcn-ui@latest init

# Add components as needed
npx shadcn-ui@latest add button card form table dialog

# Common development commands for React projects
npm run dev        # Start development server (typically on port 5173 with Vite)
npm run build      # Build for production
npm run typecheck  # Run TypeScript type checking
npm run lint       # Run ESLint
```

## Implementation Guidelines

### UI Component Design Rule
**IMPORTANT**: When designing any UI components or interfaces, ALWAYS use the Shadcn MCP server tools to:
1. First check available components with `mcp__shadcn-ui__list_components`
2. Get the official shadcn/ui component code using `mcp__shadcn-ui__get_component`
3. Review component demos with `mcp__shadcn-ui__get_component_demo` for usage patterns
4. Use pre-built blocks from `mcp__shadcn-ui__get_block` for common UI patterns (dashboards, forms, etc.)
5. Never manually recreate shadcn/ui components - always fetch the official implementation

### When Creating New Components
1. Use shadcn/ui components as base primitives (fetched via MCP tools)
2. Follow the established color system with PE Green (#51B073) as primary
3. Maintain the 4px spacing unit system
4. Ensure dark mode compatibility using CSS variables
5. Keep components small, focused, and composable

### State Management Patterns
- Use local state (useState) for component-specific state
- Use Zustand for cross-component application state
- Use TanStack Query for server data fetching and caching
- Use React Hook Form with Zod validation for complex forms

### Performance Considerations
- Implement code splitting with dynamic imports
- Use React.memo for expensive pure components
- Add virtual scrolling for large data lists
- Optimize bundle size with proper tree shaking
- Avoid deep component nesting (max 3-4 levels)

## Common Patterns

### Layout Structure
- Fixed header at 48px height
- Collapsible sidebar (76px collapsed, 256px expanded)
- Main content area with responsive padding
- Container max-width of 1400px for 2xl screens

### Component Patterns
- Metric cards with trend indicators
- Data tables with inline actions
- Form validation with real-time feedback
- Toast notifications for user feedback
- Loading skeletons for async content

## Important Notes

- This repository contains documentation only - no executable code
- All code examples are reference implementations
- Focus on simplicity and avoiding over-engineering
- Prioritize accessibility with ARIA attributes and keyboard navigation
- Maintain type safety with strict TypeScript configuration