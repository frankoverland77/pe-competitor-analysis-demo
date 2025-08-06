# Interaction Patterns and State Management

## State Management Architecture

### Global State with Zustand

The application uses Zustand for lightweight global state management without the boilerplate of Redux.

#### Store Structure
```typescript
// stores/appStore.ts
interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // UI state
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark' | 'system';
  activeTab: string;
  
  // Data state
  contracts: Contract[];
  selectedContract: Contract | null;
  filters: FilterState;
  
  // Actions
  setUser: (user: User | null) => void;
  toggleSidebar: () => void;
  setTheme: (theme: Theme) => void;
  updateFilters: (filters: Partial<FilterState>) => void;
}

const useAppStore = create<AppState>((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  sidebarCollapsed: true,
  theme: 'system',
  activeTab: 'contracts',
  contracts: [],
  selectedContract: null,
  filters: {},
  
  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  toggleSidebar: () => set((state) => ({ 
    sidebarCollapsed: !state.sidebarCollapsed 
  })),
  setTheme: (theme) => set({ theme }),
  updateFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),
}));
```

### Server State with TanStack Query

Server state and API data fetching is managed with TanStack Query for caching, synchronization, and background updates.

#### Query Configuration
```typescript
// lib/queryClient.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 3,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});
```

#### Query Patterns
```typescript
// hooks/useContracts.ts
export const useContracts = (filters?: FilterState) => {
  return useQuery({
    queryKey: ['contracts', filters],
    queryFn: () => fetchContracts(filters),
    staleTime: 30 * 1000, // 30 seconds
  });
};

// Mutation example
export const useUpdateContract = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateContract,
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      // Update specific cache
      queryClient.setQueryData(['contract', data.id], data);
    },
  });
};
```

### Form State with React Hook Form

Complex form state is managed with React Hook Form integrated with Zod for validation.

#### Form Pattern
```typescript
// schemas/contractSchema.ts
const contractSchema = z.object({
  contractNumber: z.string().min(1, 'Contract number is required'),
  customerName: z.string().min(1, 'Customer name is required'),
  startDate: z.date(),
  endDate: z.date(),
  volume: z.number().positive('Volume must be positive'),
  status: z.enum(['active', 'pending', 'inactive']),
});

// components/ContractForm.tsx
export const ContractForm = () => {
  const form = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      status: 'pending',
    },
  });
  
  const onSubmit = async (data: ContractFormData) => {
    // Handle form submission
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form fields */}
      </form>
    </Form>
  );
};
```

## Navigation Patterns

### Client-Side Routing
```typescript
// React Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'contracts', element: <Contracts /> },
      { path: 'contracts/:id', element: <ContractDetails /> },
      { path: 'analytics', element: <Analytics /> },
    ],
  },
]);
```

### Breadcrumb Navigation
```typescript
// Automatic breadcrumb generation
const useBreadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);
  
  return paths.map((path, index) => ({
    label: path.charAt(0).toUpperCase() + path.slice(1),
    href: '/' + paths.slice(0, index + 1).join('/'),
    isActive: index === paths.length - 1,
  }));
};
```

### Tab Navigation State
```typescript
// Persistent tab state
const useTabState = (defaultTab: string) => {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('activeTab') || defaultTab;
  });
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
  };
  
  return [activeTab, handleTabChange] as const;
};
```

## Loading States

### Progressive Loading Pattern
```typescript
// Component with loading states
const ContractList = () => {
  const { data, isLoading, isError, error } = useContracts();
  
  if (isLoading) {
    return <ContractListSkeleton />;
  }
  
  if (isError) {
    return <ErrorState error={error} retry={() => refetch()} />;
  }
  
  if (!data || data.length === 0) {
    return <EmptyState 
      title="No contracts found"
      description="Create your first contract to get started"
      action={<Button>Create Contract</Button>}
    />;
  }
  
  return <ContractTable data={data} />;
};
```

### Skeleton Loading
```tsx
const ContractListSkeleton = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    ))}
  </div>
);
```

### Optimistic Updates
```typescript
const useOptimisticUpdate = () => {
  const queryClient = useQueryClient();
  
  const updateContract = useMutation({
    mutationFn: api.updateContract,
    onMutate: async (newContract) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries(['contracts']);
      
      // Snapshot previous value
      const previousContracts = queryClient.getQueryData(['contracts']);
      
      // Optimistically update
      queryClient.setQueryData(['contracts'], (old) => {
        return old.map(c => 
          c.id === newContract.id ? newContract : c
        );
      });
      
      return { previousContracts };
    },
    onError: (err, newContract, context) => {
      // Rollback on error
      queryClient.setQueryData(['contracts'], context.previousContracts);
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries(['contracts']);
    },
  });
  
  return updateContract;
};
```

## Error Handling

### Error Boundary Pattern
```typescript
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error reporting service
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    
    return this.props.children;
  }
}
```

### API Error Handling
```typescript
// Centralized error handling
const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }
  
  if (error instanceof NetworkError) {
    return 'Network error. Please check your connection.';
  }
  
  return 'An unexpected error occurred. Please try again.';
};

// In components
const { mutate, isLoading, error } = useMutation({
  mutationFn: saveContract,
  onError: (error) => {
    toast({
      title: 'Error',
      description: handleApiError(error),
      variant: 'destructive',
    });
  },
});
```

### Retry Mechanisms
```typescript
const useRetryableQuery = (queryKey, queryFn) => {
  const [retryCount, setRetryCount] = useState(0);
  
  return useQuery({
    queryKey: [...queryKey, retryCount],
    queryFn,
    retry: (failureCount, error) => {
      // Custom retry logic
      if (error.status === 404) return false;
      return failureCount < 3;
    },
    onError: (error) => {
      if (error.status === 500) {
        setTimeout(() => setRetryCount(c => c + 1), 5000);
      }
    },
  });
};
```

## Keyboard Navigation

### Focus Management
```typescript
// Custom hook for focus management
const useFocusTrap = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    };
    
    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();
    
    return () => element.removeEventListener('keydown', handleTabKey);
  }, [ref]);
};
```

### Keyboard Shortcuts
```typescript
// Global keyboard shortcuts
const useKeyboardShortcuts = () => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K: Open command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openCommandPalette();
      }
      
      // Cmd/Ctrl + B: Toggle sidebar
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
      }
      
      // Escape: Close modal/dialog
      if (e.key === 'Escape') {
        closeActiveModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
};
```

## Animation Patterns

### Page Transitions
```tsx
// Framer Motion page transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const PageTransition = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);
```

### Micro-interactions
```css
/* Button hover effect */
.btn {
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn:active {
  transform: translateY(0);
}

/* Loading spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

## Accessibility Patterns

### ARIA Live Regions
```tsx
// Announce dynamic changes to screen readers
const StatusMessage = ({ message, type }) => (
  <div 
    role="status" 
    aria-live={type === 'error' ? 'assertive' : 'polite'}
    aria-atomic="true"
  >
    {message}
  </div>
);
```

### Focus Indicators
```css
/* Visible focus indicators */
.focus-visible:focus {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
}

/* Skip to content link */
.skip-to-content {
  position: absolute;
  top: -40px;
  left: 0;
  background: hsl(var(--background));
  padding: 8px;
  z-index: 100;
}

.skip-to-content:focus {
  top: 0;
}
```

### Screen Reader Support
```tsx
// Proper labeling and descriptions
<button 
  aria-label="Delete contract"
  aria-describedby="delete-warning"
>
  <TrashIcon aria-hidden="true" />
</button>

<span id="delete-warning" className="sr-only">
  This action cannot be undone
</span>
```

## Performance Patterns

### Code Splitting
```typescript
// Lazy load heavy components
const Analytics = lazy(() => import('./pages/Analytics'));
const ContractDetails = lazy(() => import('./pages/ContractDetails'));

// With loading fallback
<Suspense fallback={<PageLoader />}>
  <Analytics />
</Suspense>
```

### Memoization
```typescript
// Memoize expensive computations
const expensiveCalculation = useMemo(() => {
  return contracts.reduce((sum, contract) => {
    return sum + calculateContractValue(contract);
  }, 0);
}, [contracts]);

// Memoize components
const ContractRow = memo(({ contract, onClick }) => {
  return (
    <tr onClick={() => onClick(contract.id)}>
      {/* Row content */}
    </tr>
  );
});
```

### Virtual Scrolling
```typescript
// For large lists
import { FixedSizeList } from 'react-window';

const VirtualContractList = ({ contracts }) => (
  <FixedSizeList
    height={600}
    itemCount={contracts.length}
    itemSize={80}
    width="100%"
  >
    {({ index, style }) => (
      <div style={style}>
        <ContractRow contract={contracts[index]} />
      </div>
    )}
  </FixedSizeList>
);
```

## Best Practices

1. **State Locality**: Keep state as local as possible
2. **Error Boundaries**: Wrap feature sections in error boundaries
3. **Loading States**: Always provide loading feedback
4. **Optimistic UI**: Update UI optimistically for better UX
5. **Accessibility**: Test with keyboard and screen readers
6. **Performance**: Profile and optimize render cycles
7. **Type Safety**: Use TypeScript for all state management
8. **Testing**: Write tests for critical interaction flows