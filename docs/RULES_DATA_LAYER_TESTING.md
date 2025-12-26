# Panduan Testing Data Layer GajiKita Frontend

## Overview

Data Layer testing memastikan bahwa semua operasi data (queries dan mutations) bekerja dengan benar. Testing mencakup unit tests untuk setiap komponen layer dan integration tests untuk end-to-end data flow.

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
};
```

### Setup File
```typescript
// src/test/setupTests.ts
import '@testing-library/jest-dom';
import { server } from './mocks/server';

// Establish API mocking before all tests
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests
afterEach(() => server.resetHandlers());

// Clean up after all tests
afterAll(() => server.close());
```

## 1. Unit Testing Data Layer

### Struktur Test Files
```
src/modules/{module-name}/
├── data/
│   ├── __tests__/
│   │   ├── {module-name}.query.test.ts
│   │   ├── {module-name}.mutation.test.ts
│   │   └── integration.test.ts
│   ├── {module-name}.query.ts
│   └── {module-name}.mutation.ts
```

### 1.1 Repository Interface Testing

#### Template Test untuk Repository Interface
```typescript
// src/modules/{module-name}/repository/__tests__/interface.test.ts
import { {ModuleName}Repository } from '../interface/{ModuleName}Repository';

describe('{ModuleName}Repository Interface', () => {
  it('should define the expected methods', () => {
    const repository: {ModuleName}Repository = {} as any;

    // Type check - these should compile without errors
    expect(typeof repository.methodName).toBe('function');
  });
});
```

### 1.2 Repository Implementation Testing

#### Unit Test untuk Repository Implementation
```typescript
// src/modules/{module-name}/repository/__tests__/implementation/{ModuleName}RepositoryImpl.test.ts
import { {ModuleName}RepositoryImpl } from '../implementation/{ModuleName}RepositoryImpl';
import { httpClient } from '@/core/utils/http/httpClient';

// Mock the http client
jest.mock('@/core/utils/http/httpClient');

describe('{ModuleName}RepositoryImpl', () => {
  let repository: {ModuleName}RepositoryImpl;
  const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>;

  beforeEach(() => {
    repository = new {ModuleName}RepositoryImpl();
    jest.clearAllMocks();
  });

  describe('methodName', () => {
    it('should call httpClient with correct parameters', async () => {
      // Arrange
      const request = { /* request data */ };
      const expectedResponse = { /* expected response */ };
      mockHttpClient.get.mockResolvedValue(expectedResponse);

      // Act
      const result = await repository.methodName(request);

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/api/{endpoint}',
        { params: request }
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should handle API errors correctly', async () => {
      // Arrange
      const request = { /* request data */ };
      const error = new Error('API Error');
      mockHttpClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(repository.methodName(request)).rejects.toThrow('API Error');
    });
  });
});
```

### 1.3 Usecase Testing

#### Unit Test untuk Usecase Implementation
```typescript
// src/modules/{module-name}/usecase/__tests__/implementation/{ActionName}.test.ts
import { {ActionName} } from '../implementation/{ActionName}';
import { {ModuleName}Repository } from '../../../repository/interface/{ModuleName}Repository';
import { {ActionName}Request } from '../../../domain/req/{ActionName}Request';

describe('{ActionName} Usecase', () => {
  let usecase: {ActionName};
  let mockRepository: jest.Mocked<{ModuleName}Repository>;

  beforeEach(() => {
    mockRepository = {
      methodName: jest.fn(),
    } as any;

    usecase = new {ActionName}(mockRepository);
  });

  describe('execute', () => {
    it('should validate input and call repository', async () => {
      // Arrange
      const request: {ActionName}Request = { /* valid request */ };
      const expectedResponse = { /* expected response */ };
      mockRepository.methodName.mockResolvedValue(expectedResponse);

      // Act
      const result = await usecase.execute(request);

      // Assert
      expect(mockRepository.methodName).toHaveBeenCalledWith(request);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw error for invalid input', async () => {
      // Arrange
      const invalidRequest = { /* invalid request */ };

      // Act & Assert
      await expect(usecase.execute(invalidRequest)).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      // Arrange
      const request: {ActionName}Request = { /* valid request */ };
      const error = new Error('Repository Error');
      mockRepository.methodName.mockRejectedValue(error);

      // Act & Assert
      await expect(usecase.execute(request)).rejects.toThrow('Repository Error');
    });
  });
});
```

### 1.4 React Query Hooks Testing

#### Unit Test untuk Query Hooks
```typescript
// src/modules/{module-name}/data/__tests__/{module-name}.query.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { {useEntityNameQuery} } from '../{module-name}.query';
import { server } from '../../../../test/mocks/server';
import { rest } from 'msw';

// Mock server setup
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useEntityNameQuery', () => {
  it('should return data on successful API call', async () => {
    // Arrange
    const mockData = { /* mock response data */ };

    server.use(
      rest.get('/api/{endpoint}', (req, res, ctx) => {
        return res(ctx.json(mockData));
      })
    );

    // Act
    const { result } = renderHook(() => useEntityNameQuery(params), {
      wrapper: createWrapper(),
    });

    // Assert
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data).toEqual(mockData);
  });

  it('should handle error states', async () => {
    // Arrange
    server.use(
      rest.get('/api/{endpoint}', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    // Act
    const { result } = renderHook(() => useEntityNameQuery(params), {
      wrapper: createWrapper(),
    });

    // Assert
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(result.current.error).toBeDefined();
  });

  it('should use correct query key', () => {
    // Act
    const { result } = renderHook(() => useEntityNameQuery(params), {
      wrapper: createWrapper(),
    });

    // Assert
    expect(result.current.queryKey).toEqual(['{module-name}', 'entity', params]);
  });
});
```

#### Unit Test untuk Mutation Hooks
```typescript
// src/modules/{module-name}/data/__tests__/{module-name}.mutation.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { {useCreateEntityMutation} } from '../{module-name}.mutation';
import { server } from '../../../../test/mocks/server';
import { rest } from 'msw';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useCreateEntityMutation', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should create entity successfully', async () => {
    // Arrange
    const mockRequest = { /* request data */ };
    const mockResponse = { /* response data */ };

    server.use(
      rest.post('/api/{endpoint}', async (req, res, ctx) => {
        const body = await req.json();
        expect(body).toEqual(mockRequest);
        return res(ctx.json(mockResponse));
      })
    );

    // Act
    const { result } = renderHook(() => useCreateEntityMutation(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(mockRequest);

    // Assert
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data).toEqual(mockResponse);
  });

  it('should handle mutation errors', async () => {
    // Arrange
    const mockRequest = { /* request data */ };

    server.use(
      rest.post('/api/{endpoint}', (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    // Act
    const { result } = renderHook(() => useCreateEntityMutation(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(mockRequest);

    // Assert
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});
```

## 2. Integration Testing Data Layer

### 2.1 End-to-End Data Flow Testing

#### Integration Test Template
```typescript
// src/modules/{module-name}/data/__tests__/integration.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { {useEntityNameQuery, useCreateEntityMutation} } from '../{module-name}.query';
import { server } from '../../../test/mocks/server';
import { rest } from 'msw';

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

describe('Data Layer Integration - {ModuleName}', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('Query and Mutation Integration', () => {
    it('should create and retrieve entity', async () => {
      // Arrange
      const createRequest = { /* create request */ };
      const expectedEntity = { /* expected entity */ };

      server.use(
        rest.post('/api/{endpoint}', (req, res, ctx) => {
          return res(ctx.json(expectedEntity));
        }),
        rest.get('/api/{endpoint}', (req, res, ctx) => {
          return res(ctx.json([expectedEntity]));
        })
      );

      // Act - Create entity
      const { result: mutationResult } = renderHook(() => useCreateEntityMutation(), {
        wrapper: createWrapper(),
      });

      mutationResult.current.mutate(createRequest);

      await waitFor(() => {
        expect(mutationResult.current.isSuccess).toBe(true);
      });

      // Act - Query entities
      const { result: queryResult } = renderHook(() => useEntityNameQuery(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(queryResult.current.isSuccess).toBe(true);
      });

      // Assert
      expect(queryResult.current.data).toContain(expectedEntity);
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle network errors consistently', async () => {
      // Arrange
      server.use(
        rest.get('/api/{endpoint}', (req, res, ctx) => {
          return res(ctx.status(500));
        })
      );

      // Act
      const { result } = renderHook(() => useEntityNameQuery(), {
        wrapper: createWrapper(),
      });

      // Assert
      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
      expect(result.current.error).toBeDefined();
    });
  });

  describe('Loading States Integration', () => {
    it('should manage loading states correctly', async () => {
      // Arrange
      server.use(
        rest.get('/api/{endpoint}', async (req, res, ctx) => {
          await new Promise(resolve => setTimeout(resolve, 100));
          return res(ctx.json([]));
        })
      );

      // Act
      const { result } = renderHook(() => useEntityNameQuery(), {
        wrapper: createWrapper(),
      });

      // Assert - Initial loading state
      expect(result.current.isLoading).toBe(true);

      // Assert - Loading completed
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });
  });
});
```

### 2.2 Mock Server Setup

#### MSW Mock Server Configuration
```typescript
// src/test/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

#### Mock Handlers
```typescript
// src/test/mocks/handlers.ts
import { rest } from 'msw';
import { apiRoutes } from '@/core/constants/api';

export const handlers = [
  // Companies
  rest.get(apiRoutes.companies.list, (req, res, ctx) => {
    return res(ctx.json({
      companies: [
        {
          id: '1',
          name: 'Test Company',
          address: 'Test Address',
          wallet_address: '0x123...',
          min_lock_percentage: 10,
          fee_share_company: 20,
          fee_share_platform: 5,
          fee_share_investor: 5,
          reward_balance: 1000,
          withdrawn_rewards: 0,
          preferred_payout_token: 'ETH',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
        },
      ],
    }));
  }),

  rest.post(apiRoutes.companies.create, async (req, res, ctx) => {
    const body = await req.json();
    return res(ctx.json({
      company: {
        id: '2',
        ...body,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        deleted: false,
      },
    }));
  }),

  // Add more handlers for other endpoints...
];
```

## 3. Testing Best Practices

### 3.1 Test Organization
- **Arrange-Act-Assert (AAA) Pattern**: Struktur setiap test dengan clear sections
- **Descriptive Test Names**: Gunakan nama yang jelas dan deskriptif
- **Single Responsibility**: Setiap test hanya test satu behavior
- **Independent Tests**: Tests tidak bergantung satu sama lain

### 3.2 Mock Strategy
- **API Calls**: Mock semua external API calls menggunakan MSW
- **Dependencies**: Mock repository dependencies dalam unit tests
- **Consistent Fixtures**: Gunakan factory functions untuk test data

### 3.3 Test Data Management
```typescript
// src/test/fixtures/company.ts
export const createCompanyFixture = (overrides: Partial<CompanyEntity> = {}): CompanyEntity => ({
  id: '1',
  name: 'Test Company',
  address: 'Test Address',
  wallet_address: '0x1234567890123456789012345678901234567890',
  min_lock_percentage: 10,
  fee_share_company: 20,
  fee_share_platform: 5,
  fee_share_investor: 5,
  reward_balance: 1000,
  withdrawn_rewards: 0,
  preferred_payout_token: 'ETH',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  deleted: false,
  ...overrides,
});
```

### 3.4 Coverage Goals
- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 85%
- **Lines**: > 80%

### 3.5 Performance Testing
```typescript
describe('Performance Tests', () => {
  it('should load data within acceptable time', async () => {
    const startTime = Date.now();

    const { result } = renderHook(() => useEntityNameQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    expect(duration).toBeLessThan(1000); // Should load within 1 second
  });
});
```

## 4. CI/CD Integration

### GitHub Actions Workflow
```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Run linting
        run: pnpm lint

      - name: Run tests
        run: pnpm test

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
```

### Test Scripts in package.json
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --coverage --watchAll=false"
  }
}
```

## 5. Debugging Tests

### Common Issues & Solutions

#### 1. Async Tests Not Waiting
```typescript
// ❌ Wrong
it('should load data', () => {
  const { result } = renderHook(() => useQueryHook());
  expect(result.current.isLoading).toBe(false); // Will fail
});

// ✅ Correct
it('should load data', async () => {
  const { result } = renderHook(() => useQueryHook());

  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
  });
});
```

#### 2. Mock Not Reset Between Tests
```typescript
// Use afterEach to reset mocks
afterEach(() => {
  jest.clearAllMocks();
  server.resetHandlers();
});
```

#### 3. React Query Cache Issues
```typescript
// Create new QueryClient for each test
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, cacheTime: 0 },
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

## 6. Test Maintenance

### Regular Maintenance Tasks
- **Update Mocks**: Ketika API berubah, update mock handlers
- **Review Coverage**: Pastikan coverage goals tercapai
- **Remove Dead Tests**: Hapus tests yang tidak lagi relevant
- **Refactor Tests**: Improve test readability dan maintainability

### Documentation
- **Test README**: Dokumentasikan setup dan running tests
- **Test Naming Convention**: Konsisten dengan naming patterns
- **Test Categories**: Group related tests dalam describe blocks

## Referensi

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [MSW Documentation](https://mswjs.io/docs/)
- [React Query Testing](https://tanstack.com/query/v5/docs/react/guides/testing)
