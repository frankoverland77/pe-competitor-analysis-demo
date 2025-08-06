# Color System and Theming

## Color Philosophy

The color system is built on HSL (Hue, Saturation, Lightness) values for maximum flexibility and easy theme generation. All colors are defined as CSS custom properties, enabling runtime theme switching and maintaining consistency across the application.

## Brand Colors

### Primary - PE Green
The signature brand color used for primary actions, success states, and brand identity.

```css
--primary: 142 40% 54%; /* #51B073 */
```

**Full Scale**:
```css
--primary-50:  142 40% 95%;  /* #e8f5ec */
--primary-100: 142 40% 85%;  /* #c8e6d0 */
--primary-200: 142 40% 75%;  /* #a8d7b4 */
--primary-300: 142 40% 65%;  /* #88c898 */
--primary-400: 142 40% 59%;  /* #6cb985 */
--primary-500: 142 40% 54%;  /* #51B073 - Main */
--primary-600: 142 40% 44%;  /* #41905c */
--primary-700: 142 40% 34%;  /* #317045 */
--primary-800: 142 40% 24%;  /* #21502f */
--primary-900: 142 40% 14%;  /* #113018 */
```

### Secondary - Neutral Gray
Used for secondary elements and muted content.

```css
--secondary: 210 40% 96%; /* #f1f5f9 */
--secondary-foreground: 222.2 47.4% 11.2%;
```

## Semantic Colors

### Success (Green)
For positive actions, confirmations, and success states.
```css
--success: 142 76% 36%;           /* #16a34a */
--success-foreground: 0 0% 100%;  /* white text */
```

### Warning (Amber)
For warnings, cautions, and important notices.
```css
--warning: 38 92% 50%;            /* #f59e0b */
--warning-foreground: 0 0% 100%;  /* white text */
```

### Destructive (Red)
For errors, deletions, and critical actions.
```css
--destructive: 0 72% 51%;         /* #dc2626 */
--destructive-foreground: 0 0% 100%; /* white text */
```

### Info (Blue)
For informational messages and highlights.
```css
--info: 221 83% 53%;              /* #3b82f6 */
--info-foreground: 0 0% 100%;     /* white text */
```

## Background Hierarchy

A clear hierarchy of background colors creates visual depth and organization.

```css
/* Base background - main canvas */
--background: 0 0% 97%;           /* #F7F7F7 */

/* Card/Panel backgrounds */
--card: 0 0% 100%;                /* #FFFFFF */
--card-foreground: 0 0% 20%;     /* #333333 */

/* Muted backgrounds for sections */
--muted: 210 40% 96%;             /* #f1f5f9 */
--muted-foreground: 0 0% 40%;    /* #666666 */

/* Popover/Dropdown backgrounds */
--popover: 0 0% 100%;             /* #FFFFFF */
--popover-foreground: 0 0% 20%;  /* #333333 */
```

## Text Colors

```css
/* Primary text - high emphasis */
--foreground: 0 0% 20%;           /* #333333 */

/* Secondary text - medium emphasis */
--muted-foreground: 0 0% 40%;     /* #666666 */

/* Disabled text - low emphasis */
--disabled: 0 0% 60%;             /* #999999 */

/* Accent text - links and highlights */
--accent: 142 40% 44%;            /* PE Green darker */
--accent-foreground: 0 0% 100%;   /* white */
```

## Border and Divider Colors

```css
/* Default borders */
--border: 0 0% 87%;               /* #DDDDDD */

/* Input borders */
--input: 0 0% 87%;                /* #DDDDDD */

/* Focus ring */
--ring: 142 40% 54%;              /* Primary color */

/* Divider lines */
--divider: 0 0% 90%;              /* #E5E5E5 */
```

## Dark Mode Theme

Complete dark theme with adjusted colors for optimal contrast and reduced eye strain.

```css
.dark {
  /* Backgrounds */
  --background: 224 71% 4%;        /* #030712 */
  --card: 224 71% 8%;              /* #0f172a */
  --muted: 224 71% 12%;            /* #1e293b */
  
  /* Text */
  --foreground: 210 20% 98%;       /* #f8fafc */
  --muted-foreground: 215 20% 65%; /* #94a3b8 */
  
  /* Borders */
  --border: 215 27% 17%;           /* #334155 */
  --input: 215 27% 17%;            /* #334155 */
  
  /* Brand colors adjusted for dark mode */
  --primary: 142 40% 60%;          /* Lighter green */
  --success: 142 76% 45%;          /* Lighter success */
  --warning: 38 92% 60%;           /* Lighter warning */
  --destructive: 0 72% 60%;        /* Lighter red */
}
```

## Component-Specific Colors

### Status Indicators
```typescript
const statusColors = {
  active: 'bg-success text-success-foreground',
  pending: 'bg-warning text-warning-foreground',
  inactive: 'bg-muted text-muted-foreground',
  error: 'bg-destructive text-destructive-foreground'
};
```

### Chart Colors
```typescript
const chartColors = [
  'hsl(142, 40%, 54%)',  // Primary green
  'hsl(221, 83%, 53%)',  // Info blue
  'hsl(38, 92%, 50%)',   // Warning amber
  'hsl(280, 70%, 50%)',  // Purple
  'hsl(180, 60%, 45%)',  // Teal
  'hsl(340, 60%, 55%)',  // Pink
];
```

### Gradient Definitions
```css
/* Brand gradient */
.gradient-brand {
  background: linear-gradient(135deg, 
    hsl(142, 40%, 54%) 0%, 
    hsl(142, 40%, 44%) 100%);
}

/* Dark sidebar gradient */
.gradient-sidebar {
  background: linear-gradient(180deg, 
    #0f2e1f 0%, 
    #1a3829 100%);
}

/* Success gradient */
.gradient-success {
  background: linear-gradient(135deg,
    hsl(142, 76%, 36%) 0%,
    hsl(142, 76%, 46%) 100%);
}
```

## Usage Patterns

### CSS Variables
```css
/* Use semantic color variables */
.component {
  background-color: hsl(var(--card));
  color: hsl(var(--card-foreground));
  border: 1px solid hsl(var(--border));
}

/* With opacity */
.overlay {
  background-color: hsl(var(--background) / 0.8);
}
```

### Tailwind Classes
```tsx
// Using Tailwind with custom properties
<div className="bg-card text-card-foreground border-border">
  <button className="bg-primary text-primary-foreground 
                     hover:bg-primary/90">
    Action
  </button>
</div>
```

### JavaScript/TypeScript
```typescript
// Access colors in JavaScript
const colors = {
  primary: 'hsl(142, 40%, 54%)',
  success: 'hsl(142, 76%, 36%)',
  warning: 'hsl(38, 92%, 50%)',
  error: 'hsl(0, 72%, 51%)'
};

// For charts/visualizations
const getColor = (variant: ColorVariant) => {
  const root = document.documentElement;
  const hslValue = getComputedStyle(root)
    .getPropertyValue(`--${variant}`);
  return `hsl(${hslValue})`;
};
```

## Accessibility Guidelines

### Contrast Ratios
All color combinations meet WCAG AA standards:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum

### Color Independence
Never rely solely on color to convey information:
- Use icons alongside color indicators
- Provide text labels for status
- Include patterns or shapes for charts

### Focus Indicators
```css
/* High contrast focus rings */
.focus-visible:focus {
  outline: none;
  ring: 2px;
  ring-color: hsl(var(--ring));
  ring-offset: 2px;
}
```

## Theme Implementation

### Theme Provider Setup
```tsx
import { ThemeProvider } from 'next-themes';

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* App content */}
    </ThemeProvider>
  );
}
```

### Theme Toggle Component
```tsx
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-md hover:bg-muted"
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
}
```

## Best Practices

1. **Use Semantic Names**: Name colors by purpose, not appearance
2. **Maintain Consistency**: Use the defined palette exclusively
3. **Test Both Themes**: Ensure all components work in light and dark modes
4. **Check Contrast**: Verify WCAG compliance for all color combinations
5. **Avoid Hardcoding**: Always use CSS variables or theme values
6. **Document Exceptions**: If custom colors are needed, document why
7. **Progressive Enhancement**: Ensure the app works without CSS variables
8. **Performance**: Use CSS variables for runtime theme switching without re-rendering