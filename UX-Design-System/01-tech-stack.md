# Tech Stack and Architecture

## Core Technologies

### Frontend Framework
- **React 18.3.1** - Component-based UI framework
- **TypeScript 5.5.3** - Type safety and better developer experience
- **Vite 5.4.1** - Fast build tool with HMR
- **SWC** - Rust-based JavaScript/TypeScript compiler for faster builds

### Essential Dependencies

#### UI Component Library
- **Radix UI** - Unstyled, accessible component primitives
  - @radix-ui/react-dialog
  - @radix-ui/react-dropdown-menu
  - @radix-ui/react-select
  - @radix-ui/react-tabs
  - @radix-ui/react-tooltip
  - And 20+ more Radix components

#### Styling
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **tailwindcss-animate** - Animation utilities
- **class-variance-authority** - Component variant management
- **clsx** - Conditional class name construction
- **tailwind-merge** - Merge Tailwind classes without conflicts

#### State Management
- **Zustand 5.0.6** - Lightweight global state management
- **TanStack Query 5.56.2** - Server state management and caching
- **React Hook Form 7.53.0** - Form state management
- **Zod 3.23.8** - Schema validation

#### Data Visualization
- **Recharts 2.12.7** - Composable charting library

#### Routing
- **React Router DOM 6.26.2** - Client-side routing

#### Icons & Assets
- **Lucide React 0.462.0** - Consistent icon system

#### Theme Management
- **next-themes 0.3.0** - Dark/light mode support

## Project Structure

```
pe-contract-measurement/
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # Base UI components (shadcn/ui)
│   │   │   ├── system/    # Advanced system components
│   │   │   └── ...        # Individual UI components
│   │   ├── AppSidebar.tsx
│   │   ├── TopNavigation.tsx
│   │   └── ...
│   ├── styles/            # Global styles and design tokens
│   ├── lib/               # Utility functions
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API and business logic
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # Tailwind configuration
├── vite.config.ts        # Vite build configuration
└── tsconfig.json         # TypeScript configuration
```

## Build Configuration

### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    react({ 
      plugins: [["@swc/plugin-react-refresh", {}]] 
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### Package Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx",
    "typecheck": "tsc --noEmit"
  }
}
```

## Key Architecture Decisions

### 1. Component Architecture
- **Atomic Design**: Components built from atoms to organisms
- **Composition Pattern**: Flexible component composition
- **Compound Components**: Related components share state
- **Controlled Components**: Form inputs controlled by React

### 2. Styling Strategy
- **Utility-First**: Tailwind CSS for rapid development
- **Design Tokens**: CSS custom properties for theming
- **Component Variants**: CVA for consistent component variations
- **Dark Mode**: System-wide dark mode support

### 3. State Management
- **Local State**: useState for component-specific state
- **Global State**: Zustand for application-wide state
- **Server State**: TanStack Query for API data
- **Form State**: React Hook Form for complex forms

### 4. Type Safety
- **Strict TypeScript**: No implicit any, strict null checks
- **Zod Schemas**: Runtime validation matching TypeScript types
- **Type Inference**: Leveraging TypeScript's type inference

### 5. Performance Optimizations
- **Code Splitting**: Dynamic imports for route-based splitting
- **Lazy Loading**: React.lazy for component lazy loading
- **Memoization**: React.memo and useMemo for expensive operations
- **Virtual Scrolling**: For large data lists

## Development Workflow

### Prerequisites
- Node.js 18+ or Bun runtime
- npm or bun package manager

### Installation
```bash
npm install
# or
bun install
```

### Development
```bash
npm run dev
# Opens development server at http://localhost:5173
```

### Building
```bash
npm run build
# Creates optimized production build in dist/
```

### Type Checking
```bash
npm run typecheck
# Runs TypeScript compiler without emitting files
```

### Linting
```bash
npm run lint
# Runs ESLint on all TypeScript files
```

## Best Practices

### Component Development
1. Use TypeScript for all components
2. Implement proper prop types with interfaces
3. Use composition over inheritance
4. Keep components small and focused
5. Implement error boundaries for resilience

### State Management
1. Keep state as local as possible
2. Use Zustand for cross-component state
3. Use TanStack Query for server state
4. Avoid prop drilling with context or Zustand

### Performance
1. Memoize expensive computations
2. Use React.memo for pure components
3. Implement virtualization for long lists
4. Lazy load routes and heavy components
5. Optimize bundle size with tree shaking

### Accessibility
1. Use semantic HTML elements
2. Implement proper ARIA attributes
3. Ensure keyboard navigation
4. Test with screen readers
5. Maintain proper focus management

### Testing Strategy
1. Unit tests for utilities and hooks
2. Component tests with React Testing Library
3. Integration tests for critical flows
4. E2E tests for user journeys
5. Visual regression tests for UI consistency