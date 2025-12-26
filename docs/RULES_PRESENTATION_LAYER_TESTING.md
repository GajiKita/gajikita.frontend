# Panduan Testing Presentation Layer GajiKita Frontend

## Overview

Presentation Layer testing memastikan bahwa komponen UI dan custom hooks berperilaku dengan benar. Testing mencakup unit tests untuk komponen individual dan integration tests untuk interaksi antar komponen.

## Testing Framework

### Dependencies yang Diperlukan
```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^6.1.4",
    "@testing-library/react": "^14.1.2",
    "@testing-library/user-event": "^14.5.1",
    "@tanstack/react-query": "^5.83.0",
    "@types/jest": "^29.5.8",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "msw": "^1.3.2",
    "ts-jest": "^29.1.1"
  }
}
```

### Jest Configuration
```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '<rootDir>/src/**/*.test.ts',
    '<rootDir>/src/**/*.test.tsx',
    '<rootDir>/src/**/*.spec.ts',
    '<rootDir>/src/**/*.spec.tsx',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  transformIgnorePatterns: [
    'node_modules/(?!(some-package|another-package)/)',
  ],
};
```

### Setup File
```typescript
// src/test/setupTests.ts
import '@testing-library/jest-dom';
import { server } from './mocks/server';

// Establish API mocking before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset any request handlers that we may add during the tests
afterEach(() => server.resetHandlers());

// Clean up after all tests
afterAll(() => server.close());
```

## 1. Unit Testing Presentation Layer

### Struktur Test Files
```
src/
├── features/{feature-name}/
│   ├── __tests__/
│   │   ├── {FeatureName}.test.tsx
│   │   ├── {FeatureName}Form.test.tsx
│   │   └── hooks/
│   │       └── useCustomHook.test.ts
│   └── {FeatureName}.tsx
├── modules/{module-name}/presentation/
│   ├── __tests__/
│   │   ├── hooks/
│   │   │   └── usePresentationHook.test.ts
│   │   └── components/
│   │       └── PresentationComponent.test.tsx
│   └── hooks/
│       └── usePresentationHook.ts
```

### 1.1 Custom Hooks Testing

#### Unit Test untuk Presentation Hooks
```typescript
// src/modules/{module-name}/presentation/__tests__/hooks/usePresentationHook.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePresentationHook } from '../../hooks/usePresentationHook';
import { server } from '../../../../../test/mocks/server';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('usePresentationHook', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should return formatted data from data layer', async () => {
    // Arrange - Mock API response
    const mockApiData = { /* mock API response */ };
    server.use(
      rest.get('/api/{endpoint}', (req, res, ctx) => {
        return res(ctx.json(mockApiData));
      })
    );

    // Act
    const { result } = renderHook(() => usePresentationHook(params), {
      wrapper: createWrapper(),
    });

    // Assert
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(expectedFormattedData);
    expect(result.current.isError).toBe(false);
  });

  it('should handle loading states', () => {
    // Act
    const { result } = renderHook(() => usePresentationHook(params), {
      wrapper: createWrapper(),
    });

    // Assert
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('should handle error states', async () => {
    // Arrange
    server.use(
      rest.get('/api/{endpoint}', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    // Act
    const { result } = renderHook(() => usePresentationHook(params), {
      wrapper: createWrapper(),
    });

    // Assert
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(result.current.error).toBeDefined();
  });
});
```

#### Unit Test untuk Feature Hooks
```typescript
// src/features/{feature-name}/__tests__/hooks/useFeatureHook.test.ts
import { renderHook } from '@testing-library/react';
import { useFeatureHook } from '../../hooks/useFeatureHook';

// Mock data layer hooks
jest.mock('@/modules/{module-name}/data/{module-name}.query');
jest.mock('@/modules/{module-name}/data/{module-name}.mutation');

describe('useFeatureHook', () => {
  const mockUseQuery = require('@/modules/{module-name}/data/{module-name}.query').useEntityQuery;
  const mockUseMutation = require('@/modules/{module-name}/data/{module-name}.mutation').useCreateEntityMutation;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should combine data from multiple sources', () => {
    // Arrange
    const mockQueryData = { data: [{ id: 1, name: 'Test' }] };
    const mockMutationState = { isPending: false, isError: false };

    mockUseQuery.mockReturnValue(mockQueryData);
    mockUseMutation.mockReturnValue(mockMutationState);

    // Act
    const { result } = renderHook(() => useFeatureHook());

    // Assert
    expect(result.current.combinedData).toEqual(expectedCombinedData);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle complex state logic', () => {
    // Test complex state combinations
    const mockQueryData = { isLoading: true };
    const mockMutationState = { isPending: true };

    mockUseQuery.mockReturnValue(mockQueryData);
    mockUseMutation.mockReturnValue(mockMutationState);

    const { result } = renderHook(() => useFeatureHook());

    expect(result.current.isAnyLoading).toBe(true);
  });
});
```

### 1.2 Component Testing

#### Unit Test untuk UI Components
```typescript
// src/components/ui/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button', () => {
  it('should render with correct text', () => {
    // Arrange & Act
    render(<Button>Click me</Button>);

    // Assert
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    // Act
    await user.click(screen.getByRole('button', { name: /click me/i }));

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    // Arrange & Act
    render(<Button disabled>Click me</Button>);

    // Assert
    expect(screen.getByRole('button', { name: /click me/i })).toBeDisabled();
  });

  it('should apply correct variant styles', () => {
    // Arrange & Act
    const { container } = render(<Button variant="secondary">Click me</Button>);

    // Assert
    expect(container.firstChild).toHaveClass('bg-secondary');
  });
});
```

#### Unit Test untuk Feature Components
```typescript
// src/features/{feature-name}/__tests__/{FeatureName}.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FeatureName } from '../{FeatureName}';
import { server } from '../../../test/mocks/server';

// Mock child components if needed
jest.mock('../components/ChildComponent', () => ({
  ChildComponent: ({ data }: any) => <div data-testid="child">{data}</div>,
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('FeatureName', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should render loading state initially', () => {
    // Act
    render(<FeatureName />, { wrapper: createWrapper() });

    // Assert
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should render data when loaded', async () => {
    // Arrange
    const mockData = { /* mock data */ };
    server.use(
      rest.get('/api/{endpoint}', (req, res, ctx) => {
        return res(ctx.json(mockData));
      })
    );

    // Act
    render(<FeatureName />, { wrapper: createWrapper() });

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Expected Content')).toBeInTheDocument();
    });
  });

  it('should render error state on API failure', async () => {
    // Arrange
    server.use(
      rest.get('/api/{endpoint}', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    // Act
    render(<FeatureName />, { wrapper: createWrapper() });

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Error loading data')).toBeInTheDocument();
    });
  });

  it('should handle user interactions', async () => {
    // Arrange
    const user = userEvent.setup();
    const mockData = { /* mock data */ };
    server.use(
      rest.get('/api/{endpoint}', (req, res, ctx) => {
        return res(ctx.json(mockData));
      })
    );

    render(<FeatureName />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
    });

    // Act
    await user.click(screen.getByRole('button', { name: /action/i }));

    // Assert
    expect(mockActionHandler).toHaveBeenCalled();
  });
});
```

#### Unit Test untuk Form Components
```typescript
// src/features/{feature-name}/__tests__/{FeatureName}Form.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FeatureNameForm } from '../{FeatureName}Form';
import { server } from '../../../test/mocks/server';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('FeatureNameForm', () => {
  const user = userEvent.setup();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should validate required fields', async () => {
    // Arrange
    render(<FeatureNameForm />, { wrapper: createWrapper() });

    // Act
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Assert
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should submit form with valid data', async () => {
    // Arrange
    const mockResponse = { /* success response */ };
    server.use(
      rest.post('/api/{endpoint}', async (req, res, ctx) => {
        const body = await req.json();
        expect(body).toEqual(expectedFormData);
        return res(ctx.json(mockResponse));
      })
    );

    render(<FeatureNameForm />, { wrapper: createWrapper() });

    // Act
    await user.type(screen.getByLabelText(/name/i), 'Test Name');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Form submitted successfully')).toBeInTheDocument();
    });
  });

  it('should handle form submission errors', async () => {
    // Arrange
    server.use(
      rest.post('/api/{endpoint}', (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ message: 'Validation error' }));
      })
    );

    render(<FeatureNameForm />, { wrapper: createWrapper() });

    // Fill form and submit
    await user.type(screen.getByLabelText(/name/i), 'Test Name');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Validation error')).toBeInTheDocument();
    });
  });

  it('should show loading state during submission', async () => {
    // Arrange
    server.use(
      rest.post('/api/{endpoint}', async (req, res, ctx) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return res(ctx.json({}));
      })
    );

    render(<FeatureNameForm />, { wrapper: createWrapper() });

    // Fill and submit form
    await user.type(screen.getByLabelText(/name/i), 'Test Name');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Assert loading state
    expect(screen.getByRole('button', { name: /submitting/i })).toBeDisabled();

    // Assert loading completed
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /submitting/i })).not.toBeInTheDocument();
    });
  });
});
```

## 2. Integration Testing Presentation Layer

### 2.1 Component Integration Testing

#### Integration Test untuk Feature Components
```typescript
// src/features/{feature-name}/__tests__/integration.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FeatureName } from '../{FeatureName}';
import { FeatureNameForm } from '../{FeatureName}Form';
import { server } from '../../../test/mocks/server';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('Feature Integration', () => {
  const user = userEvent.setup();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('Create Flow', () => {
    it('should create new item and update list', async () => {
      // Arrange - Mock empty list initially
      server.use(
        rest.get('/api/{endpoint}', (req, res, ctx) => {
          return res(ctx.json({ data: [] }));
        })
      );

      const { rerender } = render(<FeatureName />, { wrapper: createWrapper() });

      // Act - Open create form
      await user.click(screen.getByRole('button', { name: /add/i }));

      // Mock successful creation
      server.use(
        rest.post('/api/{endpoint}', (req, res, ctx) => {
          return res(ctx.json({ id: 1, name: 'New Item' }));
        }),
        rest.get('/api/{endpoint}', (req, res, ctx) => {
          return res(ctx.json({ data: [{ id: 1, name: 'New Item' }] }));
        })
      );

      // Fill and submit form
      await user.type(screen.getByLabelText(/name/i), 'New Item');
      await user.click(screen.getByRole('button', { name: /create/i }));

      // Assert - List updated with new item
      await waitFor(() => {
        expect(screen.getByText('New Item')).toBeInTheDocument();
      });
    });
  });

  describe('Edit Flow', () => {
    it('should edit existing item and update list', async () => {
      // Arrange - Mock existing item
      server.use(
        rest.get('/api/{endpoint}', (req, res, ctx) => {
          return res(ctx.json({ data: [{ id: 1, name: 'Old Name' }] }));
        })
      );

      render(<FeatureName />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByText('Old Name')).toBeInTheDocument();
      });

      // Act - Open edit form
      await user.click(screen.getByRole('button', { name: /edit/i }));

      // Mock successful update
      server.use(
        rest.put('/api/{endpoint}/1', (req, res, ctx) => {
          return res(ctx.json({ id: 1, name: 'Updated Name' }));
        }),
        rest.get('/api/{endpoint}', (req, res, ctx) => {
          return res(ctx.json({ data: [{ id: 1, name: 'Updated Name' }] }));
        })
      );

      // Update and submit
      const nameInput = screen.getByDisplayValue('Old Name');
      await user.clear(nameInput);
      await user.type(nameInput, 'Updated Name');
      await user.click(screen.getByRole('button', { name: /update/i }));

      // Assert - List updated
      await waitFor(() => {
        expect(screen.getByText('Updated Name')).toBeInTheDocument();
        expect(screen.queryByText('Old Name')).not.toBeInTheDocument();
      });
    });
  });

  describe('Delete Flow', () => {
    it('should delete item and update list', async () => {
      // Arrange - Mock items
      server.use(
        rest.get('/api/{endpoint}', (req, res, ctx) => {
          return res(ctx.json({
            data: [
              { id: 1, name: 'Item 1' },
              { id: 2, name: 'Item 2' }
            ]
          }));
        })
      );

      render(<FeatureName />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
      });

      // Mock delete and updated list
      server.use(
        rest.delete('/api/{endpoint}/1', (req, res, ctx) => {
          return res(ctx.status(204));
        }),
        rest.get('/api/{endpoint}', (req, res, ctx) => {
          return res(ctx.json({ data: [{ id: 2, name: 'Item 2' }] }));
        })
      );

      // Act - Delete item
      const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
      await user.click(deleteButtons[0]); // Delete first item

      // Confirm deletion if modal appears
      if (screen.getByRole('button', { name: /confirm/i })) {
        await user.click(screen.getByRole('button', { name: /confirm/i }));
      }

      // Assert - Item removed from list
      await waitFor(() => {
        expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
      });
    });
  });
});
```

### 2.2 User Journey Testing

#### End-to-End User Flow Testing
```typescript
// src/features/{feature-name}/__tests__/user-journey.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../../../App';
import { server } from '../../../test/mocks/server';

const createWrapper = ({ initialEntries = ['/'] } = {}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('User Journey - Complete Feature Flow', () => {
  const user = userEvent.setup();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should complete full CRUD workflow', async () => {
    // Setup mocks for complete journey
    server.use(
      // Initial empty state
      rest.get('/api/{endpoint}', (req, res, ctx) => {
        return res(ctx.json({ data: [] }));
      }),
      // Create operation
      rest.post('/api/{endpoint}', (req, res, ctx) => {
        return res(ctx.json({ id: 1, name: 'Journey Test', completed: false }));
      }),
      // Updated list after create
      rest.get('/api/{endpoint}', (req, res, ctx) => {
        return res(ctx.json({ data: [{ id: 1, name: 'Journey Test', completed: false }] }));
      }, { once: true }),
      // Update operation
      rest.put('/api/{endpoint}/1', (req, res, ctx) => {
        return res(ctx.json({ id: 1, name: 'Journey Test', completed: true }));
      }),
      // Updated list after update
      rest.get('/api/{endpoint}', (req, res, ctx) => {
        return res(ctx.json({ data: [{ id: 1, name: 'Journey Test', completed: true }] }));
      }, { once: true }),
      // Delete operation
      rest.delete('/api/{endpoint}/1', (req, res, ctx) => {
        return res(ctx.status(204));
      }),
      // Empty list after delete
      rest.get('/api/{endpoint}', (req, res, ctx) => {
        return res(ctx.json({ data: [] }));
      }, { once: true })
    );

    render(<App />, { wrapper: createWrapper });

    // 1. Navigate to feature page
    await waitFor(() => {
      expect(screen.getByText('Feature Name')).toBeInTheDocument();
    });

    // 2. Create new item
    await user.click(screen.getByRole('button', { name: /add/i }));
    await user.type(screen.getByLabelText(/name/i), 'Journey Test');
    await user.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(screen.getByText('Journey Test')).toBeInTheDocument();
    });

    // 3. Update item
    await user.click(screen.getByRole('button', { name: /edit/i }));
    await user.click(screen.getByRole('checkbox', { name: /completed/i }));
    await user.click(screen.getByRole('button', { name: /update/i }));

    await waitFor(() => {
      expect(screen.getByRole('checkbox', { name: /completed/i })).toBeChecked();
    });

    // 4. Delete item
    await user.click(screen.getByRole('button', { name: /delete/i }));
    await user.click(screen.getByRole('button', { name: /confirm/i }));

    await waitFor(() => {
      expect(screen.queryByText('Journey Test')).not.toBeInTheDocument();
    });

    // 5. Verify final state
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });
});
```

### 2.3 Cross-Component Integration Testing

#### Testing Component Interactions
```typescript
// src/features/{feature-name}/__tests__/cross-component.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ParentComponent } from '../ParentComponent';
import { ChildComponent } from '../components/ChildComponent';
import { server } from '../../../test/mocks/server';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('Cross-Component Integration', () => {
  const user = userEvent.setup();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should communicate between parent and child components', async () => {
    // Arrange
    const mockData = { items: [{ id: 1, name: 'Test Item' }] };
    server.use(
      rest.get('/api/data', (req, res, ctx) => {
        return res(ctx.json(mockData));
      })
    );

    // Act
    render(<ParentComponent />, { wrapper: createWrapper() });

    // Assert - Parent loads data
    await waitFor(() => {
      expect(screen.getByText('Test Item')).toBeInTheDocument();
    });

    // Act - Interact with child component
    await user.click(screen.getByRole('button', { name: /select/i }));

    // Assert - Parent responds to child interaction
    expect(screen.getByText('Item Selected: Test Item')).toBeInTheDocument();
  });

  it('should handle prop drilling correctly', async () => {
    // Test that props are passed through component hierarchy
    const mockProps = {
      theme: 'dark',
      user: { id: 1, name: 'Test User' },
      permissions: ['read', 'write']
    };

    render(<ParentComponent {...mockProps} />, { wrapper: createWrapper() });

    // Assert props are available in child components
    await waitFor(() => {
      expect(screen.getByTestId('theme-display')).toHaveTextContent('dark');
      expect(screen.getByTestId('user-display')).toHaveTextContent('Test User');
    });
  });

  it('should handle shared state updates', async () => {
    // Test that state changes in one component affect others
    render(<ParentComponent />, { wrapper: createWrapper() });

    // Initial state
    expect(screen.getByTestId('counter')).toHaveTextContent('0');

    // Update state in child component
    await user.click(screen.getByRole('button', { name: /increment/i }));

    // Assert shared state updated
    expect(screen.getByTestId('counter')).toHaveTextContent('1');
  });
});
```

## 3. Testing Best Practices

### 3.1 Test Organization
- **Describe Blocks**: Group related tests dengan clear hierarchy
- **Setup/Teardown**: Gunakan beforeEach/afterEach untuk common setup
- **Test Isolation**: Setiap test independent dan tidak affect test lain

### 3.2 Component Testing Strategy
- **Shallow Rendering**: Test komponen tanpa render children (opsional)
- **Full Rendering**: Test complete component dengan semua dependencies
- **Mock External Dependencies**: Mock API calls, context, dan external libraries

### 3.3 User Interaction Testing
```typescript
// Comprehensive user interaction test
it('should handle complex user workflow', async () => {
  const user = userEvent.setup();

  render(<ComplexForm />, { wrapper: createWrapper() });

  // Fill form fields
  await user.type(screen.getByLabelText(/first name/i), 'John');
  await user.type(screen.getByLabelText(/last name/i), 'Doe');
  await user.selectOptions(screen.getByLabelText(/country/i), 'US');

  // Handle async dropdown
  await waitFor(() => {
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument();
  });

  await user.selectOptions(screen.getByLabelText(/state/i), 'CA');

  // Submit form
  await user.click(screen.getByRole('button', { name: /submit/i }));

  // Verify success state
  await waitFor(() => {
    expect(screen.getByText('Form submitted successfully')).toBeInTheDocument();
  });
});
```

### 3.4 Accessibility Testing
```typescript
it('should be accessible', () => {
  render(<AccessibleComponent />);

  // Check semantic HTML
  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByLabelText(/description/i)).toBeInTheDocument();

  // Check ARIA attributes
  expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');

  // Check keyboard navigation
  // (Requires additional setup for keyboard navigation tests)
});
```

### 3.5 Performance Testing
```typescript
it('should render within performance budget', () => {
  const startTime = performance.now();

  render(<HeavyComponent />);

  const endTime = performance.now();
  const renderTime = endTime - startTime;

  expect(renderTime).toBeLessThan(100); // 100ms budget
});

it('should not cause unnecessary re-renders', () => {
  const renderSpy = jest.fn();
  const TestComponent = () => {
    renderSpy();
    return <div>Test</div>;
  };

  const { rerender } = render(<TestComponent />);

  expect(renderSpy).toHaveBeenCalledTimes(1);

  // Trigger prop change that shouldn't cause re-render
  rerender(<TestComponent sameProp="value" />);

  expect(renderSpy).toHaveBeenCalledTimes(1);
});
```

## 4. Test Utilities & Helpers

### Custom Render Function
```typescript
// src/test/test-utils.tsx
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  withRouter?: boolean;
  queryClient?: QueryClient;
}

const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  const {
    withRouter = false,
    queryClient = createQueryClient(),
    ...renderOptions
  } = options;

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {withRouter ? <BrowserRouter>{children}</BrowserRouter> : children}
    </QueryClientProvider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { customRender as render };
```

### Mock Factories
```typescript
// src/test/fixtures/component-fixtures.ts
export const createMockUser = (overrides: Partial<User> = {}): User => ({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  ...overrides,
});

export const createMockFormData = (overrides: Partial<FormData> = {}): FormData => ({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  ...overrides,
});
```

### Test Helpers
```typescript
// src/test/helpers/form-helpers.ts
export const fillForm = async (user: UserEvent, data: Record<string, string>) => {
  for (const [field, value] of Object.entries(data)) {
    const input = screen.getByLabelText(new RegExp(field, 'i'));
    await user.clear(input);
    await user.type(input, value);
  }
};

export const submitForm = async (user: UserEvent, buttonText = /submit/i) => {
  const submitButton = screen.getByRole('button', { name: buttonText });
  await user.click(submitButton);
};

export const waitForFormSubmission = async () => {
  await waitFor(() => {
    expect(screen.queryByRole('button', { name: /submitting/i })).not.toBeInTheDocument();
  });
};
```

## 5. CI/CD Integration

### Test Scripts
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --coverage --watchAll=false --passWithNoTests",
    "test:ui": "jest --testPathPattern=ui.test",
    "test:integration": "jest --testPathPattern=integration.test"
  }
}
```

### Coverage Configuration
```javascript
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/test/**/*',
    '!src/**/*.stories.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: [
    'text',
    'lcov',
    ['html', { subdir: 'html' }],
  ],
};
```

### GitHub Actions
```yaml
# .github/workflows/test-frontend.yml
name: Frontend Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run unit tests
        run: npm run test:ci

      - name: Run integration tests
        run: npm run test:integration

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
          flags: frontend
```

## 6. Debugging Tests

### Common Issues & Solutions

#### 1. Async Operations
```typescript
// ❌ Wrong - Missing await
it('should load data', () => {
  render(<Component />);
  expect(screen.getByText('Data loaded')).toBeInTheDocument(); // Fails
});

// ✅ Correct - Wait for async operation
it('should load data', async () => {
  render(<Component />);

  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  });
});
```

#### 2. Mock Setup Issues
```typescript
// Ensure mocks are reset between tests
afterEach(() => {
  jest.clearAllMocks();
  server.resetHandlers();
});
```

#### 3. React Query Cache Issues
```typescript
// Create fresh QueryClient for each test
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0, cacheTime: 0 },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
```

#### 4. User Event Timing
```typescript
// Use userEvent.setup() for proper timing
const user = userEvent.setup();

it('should handle user interaction', async () => {
  render(<Component />);

  // Wait for element to be available
  await waitFor(() => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  await user.click(screen.getByRole('button'));
});
```

## 7. Test Maintenance

### Regular Maintenance Tasks
- **Update Snapshots**: Review dan update snapshots setelah UI changes
- **Refactor Tests**: Improve test readability dan performance
- **Remove Dead Tests**: Hapus tests yang tidak lagi relevant
- **Update Mocks**: Sync mocks dengan API changes

### Test Documentation
- **Test Naming Conventions**: Konsisten dengan project standards
- **Test Categories**: Clear grouping berdasarkan functionality
- **Test Descriptions**: Descriptive names yang explain what is being tested

### Performance Monitoring
- **Test Execution Time**: Monitor dan optimize slow tests
- **Bundle Size**: Track test bundle size
- **Coverage Trends**: Monitor coverage changes over time

## Referensi

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library User Event](https://testing-library.com/docs/user-event/intro/)
- [MSW Documentation](https://mswjs.io/docs/)
- [React Query Testing](https://tanstack.com/query/v5/docs/react/guides/testing)
