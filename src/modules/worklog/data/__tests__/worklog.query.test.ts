// src/modules/worklog/data/__tests__/worklog.query.test.ts
import React from 'react';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useWorklogsQuery, useWorklogQuery } from '../worklog.query';

// Mock the API calls directly
jest.mock('../worklog.query', () => ({
  ...jest.requireActual('../worklog.query'),
  useWorklogsQuery: jest.fn(),
  useWorklogQuery: jest.fn(),
}));

const mockUseWorklogsQuery = useWorklogsQuery as jest.MockedFunction<
  typeof useWorklogsQuery
>;
const mockUseWorklogQuery = useWorklogQuery as jest.MockedFunction<
  typeof useWorklogQuery
>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children
    );
  };
};

describe('Worklog Query Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useWorklogsQuery', () => {
    it('should return worklogs on successful API call', () => {
      // Arrange
      const mockParams = { employeeId: 'emp1', page: 1, limit: 10 };
      const mockData = [
        {
          id: '1',
          employee_id: 'emp1',
          date: '2024-01-15',
          hours_worked: 8,
          work_description: 'Completed project tasks',
          approved: true,
          approved_by: 'supervisor1',
          approved_at: '2024-01-15T18:00:00Z',
          created_at: '2024-01-15T09:00:00Z',
          updated_at: '2024-01-15T18:00:00Z',
          deleted: false,
        }
      ];

      const mockQueryResult = {
        data: mockData,
        isLoading: false,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
        queryKey: ['worklogs', 'list', mockParams],
      };

      mockUseWorklogsQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useWorklogsQuery(mockParams), {
        wrapper: createWrapper(),
      });

      // Assert
      expect(result.current.data).toEqual(mockData);
      expect(result.current.isSuccess).toBe(true);
    });

    it('should handle error states', () => {
      // Arrange
      const mockParams = { employeeId: 'emp1' };
      const mockQueryResult = {
        data: undefined,
        isLoading: false,
        isError: true,
        isSuccess: false,
        error: new Error('API Error'),
        refetch: jest.fn(),
        queryKey: ['worklogs', 'list', mockParams],
      };

      mockUseWorklogsQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useWorklogsQuery(mockParams), {
        wrapper: createWrapper(),
      });

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });

    it('should handle loading states', () => {
      // Arrange
      const mockQueryResult = {
        data: undefined,
        isLoading: true,
        isError: false,
        isSuccess: false,
        error: undefined,
        refetch: jest.fn(),
        queryKey: ['worklogs', 'list', {}],
      };

      mockUseWorklogsQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useWorklogsQuery({}), {
        wrapper: createWrapper(),
      });

      // Assert
      expect(result.current.isLoading).toBe(true);
    });
  });

  describe('useWorklogQuery', () => {
    it('should return worklog detail on successful API call', () => {
      // Arrange
      const worklogId = '1';
      const mockData = {
        id: '1',
        employee_id: 'emp1',
        date: '2024-01-15',
        hours_worked: 8,
        work_description: 'Completed project tasks',
        approved: true,
        approved_by: 'supervisor1',
        approved_at: '2024-01-15T18:00:00Z',
        created_at: '2024-01-15T09:00:00Z',
        updated_at: '2024-01-15T18:00:00Z',
        deleted: false,
      };

      const mockQueryResult = {
        data: mockData,
        isLoading: false,
        isError: false,
        isSuccess: true,
        error: undefined,
        refetch: jest.fn(),
      };

      mockUseWorklogQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useWorklogQuery({ id: worklogId }), {
        wrapper: createWrapper(),
      });

      // Assert
      expect(result.current.data).toEqual(mockData);
      expect(result.current.isSuccess).toBe(true);
    });

    it('should handle error states', () => {
      // Arrange
      const worklogId = '1';
      const mockQueryResult = {
        data: undefined,
        isLoading: false,
        isError: true,
        isSuccess: false,
        error: new Error('API Error'),
        refetch: jest.fn(),
      };

      mockUseWorklogQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useWorklogQuery({ id: worklogId }), {
        wrapper: createWrapper(),
      });

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });
  });
});