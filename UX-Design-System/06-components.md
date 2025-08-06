# Component Library

## Base Components

### Button Component

#### Variants
```tsx
interface ButtonProps {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
}
```

#### Styling
```css
/* Default button */
.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 200ms;
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* Variants */
.btn-primary {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.btn-primary:hover {
  background: hsl(var(--primary) / 0.9);
}

.btn-outline {
  border: 1px solid hsl(var(--border));
  background: transparent;
}

.btn-ghost {
  background: transparent;
}

.btn-ghost:hover {
  background: hsl(var(--muted));
}

.btn-destructive {
  background: hsl(var(--destructive));
  color: hsl(var(--destructive-foreground));
}
```

#### Usage Examples
```tsx
<Button variant="primary" size="default">
  Save Changes
</Button>

<Button variant="outline" size="sm">
  Cancel
</Button>

<Button variant="ghost" size="icon">
  <Settings className="h-4 w-4" />
</Button>

<Button variant="destructive" loading>
  Deleting...
</Button>
```

### Input Component

#### Types
```tsx
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'search';
  size?: 'sm' | 'default' | 'lg';
  error?: boolean;
  icon?: React.ReactNode;
}
```

#### Styling
```css
.input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid hsl(var(--border));
  border-radius: 6px;
  background: hsl(var(--background));
  transition: all 200ms;
}

.input:focus {
  outline: none;
  border-color: hsl(var(--primary));
  box-shadow: 0 0 0 3px hsl(var(--primary) / 0.1);
}

.input-error {
  border-color: hsl(var(--destructive));
}

.input-with-icon {
  padding-left: 40px;
}
```

#### Usage Examples
```tsx
<Input 
  type="text" 
  placeholder="Enter contract number"
/>

<Input 
  type="search" 
  icon={<Search />}
  placeholder="Search contracts..."
/>

<Input 
  type="email" 
  error
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Select Component

#### Structure
```tsx
interface SelectProps {
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
}
```

#### Implementation
```tsx
<Select
  options={[
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'inactive', label: 'Inactive' }
  ]}
  placeholder="Select status"
  onChange={(value) => setStatus(value)}
/>
```

### Card Component

#### Variants
```tsx
interface CardProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'default' | 'lg';
  interactive?: boolean;
}
```

#### Structure
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

#### Styling
```css
.card {
  background: hsl(var(--card));
  border-radius: 8px;
  border: 1px solid hsl(var(--border));
  overflow: hidden;
}

.card-elevated {
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
}

.card-interactive {
  cursor: pointer;
  transition: all 200ms;
}

.card-interactive:hover {
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.08);
}
```

## Data Display Components

### Table Component

#### Structure
```tsx
interface TableProps {
  columns: Array<{
    key: string;
    header: string;
    sortable?: boolean;
    width?: string;
  }>;
  data: Array<Record<string, any>>;
  onRowClick?: (row: any) => void;
  selectable?: boolean;
}
```

#### Implementation
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Contract ID</TableHead>
      <TableHead>Customer</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Volume</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((row) => (
      <TableRow key={row.id}>
        <TableCell>{row.contractId}</TableCell>
        <TableCell>{row.customer}</TableCell>
        <TableCell>
          <Badge variant={row.status}>
            {row.status}
          </Badge>
        </TableCell>
        <TableCell className="text-right">
          {row.volume}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

#### Features
- Sortable columns
- Row selection
- Pagination
- Filtering
- Column resizing
- Responsive scrolling

### MetricCard Component

#### Variants
```tsx
interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning';
  size?: 'sm' | 'default' | 'lg';
}
```

#### Implementation
```tsx
<MetricCard
  title="Total Revenue"
  value="$1,250,000"
  subtitle="Last 30 days"
  trend="up"
  trendValue="+12.5%"
  icon={<DollarSign />}
  variant="success"
/>
```

#### Styling
```css
.metric-card {
  padding: 20px;
  border-radius: 8px;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
}

.metric-card-title {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
  margin-bottom: 8px;
}

.metric-card-value {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 8px;
}

.metric-card-trend {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
}

.trend-up { color: hsl(var(--success)); }
.trend-down { color: hsl(var(--destructive)); }
```

### Badge Component

#### Variants
```tsx
interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'destructive' | 'outline';
  size?: 'sm' | 'default';
}
```

#### Implementation
```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Expired</Badge>
<Badge variant="outline">Draft</Badge>
```

#### Styling
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-success {
  background: hsl(var(--success) / 0.1);
  color: hsl(var(--success));
}

.badge-warning {
  background: hsl(var(--warning) / 0.1);
  color: hsl(var(--warning));
}
```

## Feedback Components

### Alert Component

#### Variants
```tsx
interface AlertProps {
  variant?: 'default' | 'info' | 'success' | 'warning' | 'destructive';
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  closable?: boolean;
}
```

#### Implementation
```tsx
<Alert variant="info">
  <InfoIcon className="h-4 w-4" />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    Your contract has been successfully updated.
  </AlertDescription>
</Alert>
```

### Toast Component

#### Usage
```tsx
const { toast } = useToast();

// Success toast
toast({
  title: "Success",
  description: "Contract saved successfully",
  variant: "success",
});

// Error toast
toast({
  title: "Error",
  description: "Failed to save contract",
  variant: "destructive",
});
```

### Loading States

#### Skeleton Loader
```tsx
<div className="space-y-4">
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
  <Skeleton className="h-10 w-full" />
</div>
```

#### Spinner
```tsx
<Spinner size="sm" />
<Spinner size="default" />
<Spinner size="lg" />
```

#### Progress Bar
```tsx
<Progress value={60} max={100} />
```

## Navigation Components

### Tabs Component

#### Structure
```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
    <TabsTrigger value="history">History</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    {/* Overview content */}
  </TabsContent>
  <TabsContent value="details">
    {/* Details content */}
  </TabsContent>
  <TabsContent value="history">
    {/* History content */}
  </TabsContent>
</Tabs>
```

### Breadcrumb Component

#### Structure
```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/contracts">Contracts</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>CN-2024-001</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### Pagination Component

#### Structure
```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

## Overlay Components

### Dialog/Modal Component

#### Structure
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description or instructions.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      {/* Dialog body content */}
    </div>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Dropdown Menu Component

#### Structure
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreVertical className="h-4 w-4" />
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
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">
      <Trash className="mr-2 h-4 w-4" />
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Tooltip Component

#### Structure
```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="ghost" size="icon">
      <Info className="h-4 w-4" />
    </Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Helpful information about this item</p>
  </TooltipContent>
</Tooltip>
```

## Form Components

### Form Field Component

#### Structure
```tsx
<FormField
  control={form.control}
  name="contractNumber"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Contract Number</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormDescription>
        Enter a unique contract identifier
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Checkbox Component

```tsx
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms" className="text-sm font-medium">
    I agree to the terms and conditions
  </label>
</div>
```

### Radio Group Component

```tsx
<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="r2" />
    <Label htmlFor="r2">Option 2</Label>
  </div>
</RadioGroup>
```

### Switch Component

```tsx
<div className="flex items-center space-x-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>
```

## Best Practices

1. **Consistency**: Use components from the library consistently
2. **Composition**: Build complex components from simpler ones
3. **Accessibility**: All components include ARIA attributes
4. **Responsive**: Components adapt to different screen sizes
5. **Theming**: Components respect the theme system
6. **Performance**: Components are optimized for performance
7. **Testing**: Write tests for custom component behavior
8. **Documentation**: Document custom props and usage