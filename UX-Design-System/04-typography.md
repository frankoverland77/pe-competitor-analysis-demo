# Typography System

## Font Families

### Primary Font - Lato
The main font family used throughout the application for all UI elements and body text.

```css
font-family: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Roboto', 'Helvetica Neue', Arial, sans-serif;
```

**Weights Used**:
- 400 - Regular (body text, descriptions)
- 600 - Semibold (subheadings, emphasis)
- 700 - Bold (headings, important elements)

### Monospace Font - JetBrains Mono
Used for code, data values, and technical information.

```css
font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
```

## Type Scale

The typography system uses a modular scale with consistent line heights and font weights.

### Display Text
```css
.text-display {
  font-size: 3.75rem;    /* 60px */
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.02em;
}
```
**Usage**: Hero sections, large numbers on dashboards

### Headings

#### Heading 1
```css
.text-h1, h1 {
  font-size: 1.875rem;   /* 30px */
  line-height: 2.25rem;  /* 36px */
  font-weight: 700;
  letter-spacing: -0.01em;
}
```
**Usage**: Page titles, main section headers

#### Heading 2
```css
.text-h2, h2 {
  font-size: 1.25rem;    /* 20px */
  line-height: 1.75rem;  /* 28px */
  font-weight: 600;
  letter-spacing: -0.005em;
}
```
**Usage**: Section headers, card titles

#### Heading 3
```css
.text-h3, h3 {
  font-size: 1.125rem;   /* 18px */
  line-height: 1.75rem;  /* 28px */
  font-weight: 500;
}
```
**Usage**: Subsection headers, group labels

### Body Text

#### Large Body
```css
.text-lg {
  font-size: 1.125rem;   /* 18px */
  line-height: 1.75rem;  /* 28px */
  font-weight: 400;
}
```
**Usage**: Lead paragraphs, important descriptions

#### Base Body
```css
.text-base {
  font-size: 1rem;       /* 16px */
  line-height: 1.5rem;   /* 24px */
  font-weight: 400;
}
```
**Usage**: Default body text, descriptions

#### Small Text
```css
.text-sm {
  font-size: 0.875rem;   /* 14px */
  line-height: 1.25rem;  /* 20px */
  font-weight: 400;
}
```
**Usage**: Secondary text, metadata, captions

#### Extra Small
```css
.text-xs {
  font-size: 0.75rem;    /* 12px */
  line-height: 1rem;     /* 16px */
  font-weight: 400;
}
```
**Usage**: Labels, badges, timestamps

## Text Styles

### Font Weights
```css
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.font-extrabold { font-weight: 800; }
```

### Text Alignment
```css
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-justify { text-align: justify; }
```

### Text Transform
```css
.uppercase { text-transform: uppercase; }
.lowercase { text-transform: lowercase; }
.capitalize { text-transform: capitalize; }
.normal-case { text-transform: none; }
```

### Letter Spacing
```css
.tracking-tighter { letter-spacing: -0.05em; }
.tracking-tight { letter-spacing: -0.025em; }
.tracking-normal { letter-spacing: 0; }
.tracking-wide { letter-spacing: 0.025em; }
.tracking-wider { letter-spacing: 0.05em; }
.tracking-widest { letter-spacing: 0.1em; }
```

### Line Height
```css
.leading-none { line-height: 1; }
.leading-tight { line-height: 1.25; }
.leading-snug { line-height: 1.375; }
.leading-normal { line-height: 1.5; }
.leading-relaxed { line-height: 1.625; }
.leading-loose { line-height: 2; }
```

## Text Colors

### Semantic Text Colors
```css
.text-foreground { color: hsl(var(--foreground)); }
.text-muted-foreground { color: hsl(var(--muted-foreground)); }
.text-primary { color: hsl(var(--primary)); }
.text-success { color: hsl(var(--success)); }
.text-warning { color: hsl(var(--warning)); }
.text-destructive { color: hsl(var(--destructive)); }
.text-info { color: hsl(var(--info)); }
```

### Text Opacity
```css
.text-opacity-50 { opacity: 0.5; }
.text-opacity-75 { opacity: 0.75; }
.text-opacity-90 { opacity: 0.9; }
```

## Component Typography Patterns

### Page Title
```tsx
<h1 className="text-3xl font-bold tracking-tight text-foreground">
  Contract Management
</h1>
```

### Section Header
```tsx
<h2 className="text-xl font-semibold text-foreground mb-4">
  Active Contracts
</h2>
```

### Card Title
```tsx
<h3 className="text-lg font-semibold text-foreground">
  Contract Details
</h3>
```

### Body Paragraph
```tsx
<p className="text-base text-muted-foreground leading-relaxed">
  This contract defines the terms and conditions...
</p>
```

### Label
```tsx
<label className="text-sm font-medium text-foreground">
  Contract Number
</label>
```

### Helper Text
```tsx
<span className="text-xs text-muted-foreground">
  Enter a unique identifier for this contract
</span>
```

### Data Value
```tsx
<span className="font-mono text-sm font-medium">
  CN-2024-001
</span>
```

### Badge Text
```tsx
<span className="text-xs font-medium uppercase tracking-wider">
  Active
</span>
```

## Responsive Typography

### Mobile-First Scaling
```tsx
// Responsive heading
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Responsive Title
</h1>

// Responsive body text
<p className="text-sm md:text-base lg:text-lg">
  Responsive paragraph that scales with viewport
</p>
```

### Fluid Typography (CSS)
```css
/* Fluid type scale using clamp() */
.fluid-heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
  line-height: 1.2;
}

.fluid-body {
  font-size: clamp(0.875rem, 2vw, 1.125rem);
  line-height: 1.6;
}
```

## Text Utilities

### Truncation
```css
/* Single line truncation */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Multi-line truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### Text Decoration
```css
.underline { text-decoration: underline; }
.line-through { text-decoration: line-through; }
.no-underline { text-decoration: none; }
.decoration-primary { text-decoration-color: hsl(var(--primary)); }
.decoration-2 { text-decoration-thickness: 2px; }
```

### Text Selection
```css
.select-none { user-select: none; }
.select-text { user-select: text; }
.select-all { user-select: all; }
```

## Accessibility Guidelines

### Font Size
- Minimum body text size: 14px (0.875rem)
- Minimum interactive element text: 16px (1rem)
- Allow user scaling up to 200%

### Line Length
- Optimal: 45-75 characters per line
- Maximum: 100 characters for readability
- Use max-width constraints on text containers

### Contrast
- Normal text: 4.5:1 minimum contrast ratio
- Large text (18px+): 3:1 minimum contrast ratio
- Use semantic color tokens that ensure compliance

### Hierarchy
- Use proper heading hierarchy (h1 → h2 → h3)
- Don't skip heading levels
- One h1 per page/section

## Implementation Examples

### Typography Component
```tsx
interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'label';
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  className,
  as: Component = 'p'
}) => {
  const variants = {
    h1: 'text-3xl font-bold tracking-tight',
    h2: 'text-xl font-semibold',
    h3: 'text-lg font-medium',
    body: 'text-base',
    small: 'text-sm text-muted-foreground',
    label: 'text-sm font-medium'
  };

  return (
    <Component className={cn(variants[variant], className)}>
      {children}
    </Component>
  );
};
```

### Text Contrast Utility
```typescript
// Ensure text has proper contrast against background
function getTextColorForBackground(bgColor: string): string {
  const luminance = calculateLuminance(bgColor);
  return luminance > 0.5 
    ? 'text-foreground' 
    : 'text-background';
}
```

## Best Practices

1. **Consistency**: Use the defined type scale consistently
2. **Hierarchy**: Create clear visual hierarchy with size and weight
3. **Readability**: Prioritize legibility over aesthetics
4. **Responsive**: Test typography at all viewport sizes
5. **Loading**: Use font-display: swap for web fonts
6. **Fallbacks**: Provide system font fallbacks
7. **Performance**: Limit font weights and variants loaded
8. **Accessibility**: Test with screen readers and zoom levels