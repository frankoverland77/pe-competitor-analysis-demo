# Spacing and Layout System

## Base Unit System

The application uses a 4px base unit system, providing consistent and harmonious spacing throughout the interface.

### Spacing Scale
```css
/* Base unit: 4px */
--spacing-1: 4px;    /* 0.25rem */
--spacing-2: 8px;    /* 0.5rem */
--spacing-3: 12px;   /* 0.75rem */
--spacing-4: 16px;   /* 1rem */
--spacing-5: 20px;   /* 1.25rem */
--spacing-6: 24px;   /* 1.5rem */
--spacing-8: 32px;   /* 2rem */
--spacing-10: 40px;  /* 2.5rem */
--spacing-12: 48px;  /* 3rem */
--spacing-14: 56px;  /* 3.5rem */
--spacing-16: 64px;  /* 4rem */
--spacing-20: 80px;  /* 5rem */
--spacing-24: 96px;  /* 6rem */
--spacing-32: 128px; /* 8rem */
--spacing-40: 160px; /* 10rem */
--spacing-48: 192px; /* 12rem */
--spacing-56: 224px; /* 14rem */
--spacing-64: 256px; /* 16rem */
--spacing-72: 288px; /* 18rem */
--spacing-80: 320px; /* 20rem */
--spacing-96: 384px; /* 24rem */
```

## Layout Containers

### Page Container
Maximum width constraints for different content types:

```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 16px; /* Default padding */
}

/* Breakpoint-specific padding */
@media (min-width: 640px) {
  .container { padding: 0 24px; }
}

@media (min-width: 1024px) {
  .container { padding: 0 32px; }
}

/* Max width variants */
.container-xl { max-width: 1440px; } /* Full page width */
.container-lg { max-width: 1200px; } /* Content sections */
.container-md { max-width: 768px; }  /* Reading content */
.container-sm { max-width: 600px; }  /* Forms and modals */
```

### Grid System

#### CSS Grid Layout
```css
/* Basic grid */
.grid {
  display: grid;
  gap: 16px; /* Default gap */
}

/* Column configurations */
.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
.grid-cols-6 { grid-template-columns: repeat(6, 1fr); }
.grid-cols-12 { grid-template-columns: repeat(12, 1fr); }

/* Responsive grid */
@media (min-width: 640px) {
  .sm\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  .sm\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 768px) {
  .md\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  .md\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
  .lg\:grid-cols-6 { grid-template-columns: repeat(6, 1fr); }
}
```

#### Flexbox Layout
```css
/* Flex container */
.flex {
  display: flex;
}

/* Direction */
.flex-row { flex-direction: row; }
.flex-col { flex-direction: column; }

/* Alignment */
.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.items-end { align-items: flex-end; }
.items-stretch { align-items: stretch; }

/* Justification */
.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
.justify-evenly { justify-content: space-evenly; }

/* Wrap */
.flex-wrap { flex-wrap: wrap; }
.flex-nowrap { flex-wrap: nowrap; }

/* Growth */
.flex-1 { flex: 1 1 0%; }
.flex-auto { flex: 1 1 auto; }
.flex-none { flex: none; }
```

## Component Spacing

### Card Component
```css
.card {
  padding: 24px;           /* Default padding */
  border-radius: 8px;
  margin-bottom: 16px;
}

.card-compact { padding: 16px; }
.card-comfortable { padding: 32px; }

/* Card sections */
.card-header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--border);
}

.card-body {
  padding: 24px;
}

.card-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--border);
}
```

### Form Spacing
```css
/* Form groups */
.form-group {
  margin-bottom: 24px;
}

/* Label and input spacing */
.form-label {
  margin-bottom: 8px;
  display: block;
}

.form-input {
  padding: 8px 12px;
  min-height: 40px;
}

/* Helper text */
.form-helper {
  margin-top: 4px;
  font-size: 0.875rem;
}

/* Form sections */
.form-section {
  padding: 24px 0;
  border-bottom: 1px solid var(--border);
}

.form-section:last-child {
  border-bottom: none;
}
```

### Button Spacing
```css
/* Button sizing includes padding */
.btn {
  padding: 8px 16px;
  min-height: 40px;
  min-width: 80px;
}

.btn-sm {
  padding: 4px 12px;
  min-height: 32px;
}

.btn-lg {
  padding: 12px 24px;
  min-height: 48px;
}

/* Button groups */
.btn-group {
  display: flex;
  gap: 8px;
}

.btn-group-vertical {
  flex-direction: column;
}
```

### Table Spacing
```css
.table {
  width: 100%;
  border-spacing: 0;
}

.table th,
.table td {
  padding: 12px 16px;
  text-align: left;
}

/* Compact table */
.table-compact th,
.table-compact td {
  padding: 8px 12px;
}

/* Comfortable table */
.table-comfortable th,
.table-comfortable td {
  padding: 16px 20px;
}

/* Minimum row height */
.table tr {
  min-height: 48px;
}
```

## Page Layout Patterns

### Dashboard Layout
```tsx
<div className="min-h-screen bg-background">
  {/* Header - Fixed */}
  <header className="fixed top-0 left-0 right-0 h-12 z-40">
    <TopNavigation />
  </header>
  
  {/* Sidebar - Fixed */}
  <aside className="fixed left-0 top-12 bottom-0 w-64 z-30">
    <AppSidebar />
  </aside>
  
  {/* Main Content - Scrollable */}
  <main className="ml-64 mt-12 p-6">
    <div className="container-lg">
      {/* Page content */}
    </div>
  </main>
</div>
```

### Content Page Layout
```tsx
<div className="container-lg py-8">
  {/* Page Header */}
  <div className="mb-8">
    <Breadcrumbs className="mb-4" />
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Page Title</h1>
      <div className="flex gap-2">
        <Button variant="outline">Secondary</Button>
        <Button>Primary Action</Button>
      </div>
    </div>
  </div>
  
  {/* Metrics Row */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <MetricCard />
    <MetricCard />
    <MetricCard />
  </div>
  
  {/* Main Content Area */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2">
      {/* Primary content */}
    </div>
    <div>
      {/* Sidebar content */}
    </div>
  </div>
</div>
```

### Form Layout
```tsx
<form className="container-sm">
  {/* Form Section 1 */}
  <div className="form-section">
    <h2 className="text-xl font-semibold mb-4">
      Basic Information
    </h2>
    <div className="space-y-4">
      <div className="form-group">
        <label className="form-label">Field Label</label>
        <input className="form-input w-full" />
        <span className="form-helper">Helper text</span>
      </div>
    </div>
  </div>
  
  {/* Form Section 2 */}
  <div className="form-section">
    <h2 className="text-xl font-semibold mb-4">
      Additional Details
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Two-column form fields */}
    </div>
  </div>
  
  {/* Form Actions */}
  <div className="flex justify-end gap-2 pt-6">
    <Button variant="outline">Cancel</Button>
    <Button type="submit">Save</Button>
  </div>
</form>
```

## Responsive Spacing

### Breakpoint-Specific Spacing
```tsx
// Padding that adapts to screen size
<div className="p-4 sm:p-6 md:p-8 lg:p-10">
  {/* Content */}
</div>

// Margin that changes at breakpoints
<div className="mb-4 md:mb-6 lg:mb-8">
  {/* Content */}
</div>

// Gap that scales with viewport
<div className="grid gap-4 md:gap-6 lg:gap-8">
  {/* Grid items */}
</div>
```

### Container Queries (Future CSS)
```css
/* Container-based responsive spacing */
@container (min-width: 400px) {
  .card {
    padding: 32px;
  }
}
```

## Spacing Utilities

### Margin Utilities
```css
/* All sides */
.m-0 { margin: 0; }
.m-1 { margin: 4px; }
.m-2 { margin: 8px; }
.m-4 { margin: 16px; }
.m-6 { margin: 24px; }
.m-8 { margin: 32px; }

/* Specific sides */
.mt-4 { margin-top: 16px; }
.mr-4 { margin-right: 16px; }
.mb-4 { margin-bottom: 16px; }
.ml-4 { margin-left: 16px; }

/* Horizontal/Vertical */
.mx-4 { margin-left: 16px; margin-right: 16px; }
.my-4 { margin-top: 16px; margin-bottom: 16px; }

/* Auto margins */
.mx-auto { margin-left: auto; margin-right: auto; }
```

### Padding Utilities
```css
/* All sides */
.p-0 { padding: 0; }
.p-1 { padding: 4px; }
.p-2 { padding: 8px; }
.p-4 { padding: 16px; }
.p-6 { padding: 24px; }
.p-8 { padding: 32px; }

/* Specific sides */
.pt-4 { padding-top: 16px; }
.pr-4 { padding-right: 16px; }
.pb-4 { padding-bottom: 16px; }
.pl-4 { padding-left: 16px; }

/* Horizontal/Vertical */
.px-4 { padding-left: 16px; padding-right: 16px; }
.py-4 { padding-top: 16px; padding-bottom: 16px; }
```

### Gap Utilities (Flexbox/Grid)
```css
.gap-0 { gap: 0; }
.gap-1 { gap: 4px; }
.gap-2 { gap: 8px; }
.gap-4 { gap: 16px; }
.gap-6 { gap: 24px; }
.gap-8 { gap: 32px; }

/* Specific directions */
.gap-x-4 { column-gap: 16px; }
.gap-y-4 { row-gap: 16px; }
```

### Space Between (Flexbox/Grid Children)
```css
/* Adds space between children */
.space-y-4 > * + * { margin-top: 16px; }
.space-x-4 > * + * { margin-left: 16px; }
```

## Accessibility Considerations

### Touch Targets
- Minimum touch target size: 44x44px
- Add padding rather than margin for interactive elements
- Ensure adequate spacing between clickable items

### Visual Spacing
- Use consistent spacing to group related content
- Provide adequate whitespace for readability
- Don't rely solely on spacing to convey meaning

### Responsive Considerations
- Test spacing at all breakpoints
- Ensure content doesn't become cramped on mobile
- Maintain readability with appropriate line heights

## Best Practices

1. **Consistency**: Use the spacing scale consistently throughout
2. **Hierarchy**: Use spacing to create visual hierarchy
3. **Grouping**: Use spacing to group related elements
4. **Breathing Room**: Don't fear whitespace - it improves readability
5. **Responsive**: Adjust spacing for different screen sizes
6. **Touch-Friendly**: Ensure adequate spacing for touch interactions
7. **Performance**: Use CSS Grid/Flexbox gap instead of margins when possible
8. **Documentation**: Document any custom spacing values used