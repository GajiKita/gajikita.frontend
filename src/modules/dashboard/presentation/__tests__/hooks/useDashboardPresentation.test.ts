// src/modules/dashboard/presentation/__tests__/hooks/useDashboardPresentation.test.ts
import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDashboardStats } from '../../hooks/useDashboardPresentation';

// Mock the API calls directly
jest.mock('../../../data/dashboard.query');

import { useDashboardStatsQuery } from '../../../data/dashboard.query';

const mockUseDashboardStatsQuery = useDashboardStatsQuery as jest.MockedFunction<
  typeof useDashboardStatsQuery
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

describe('Dashboard Presentation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useDashboardStats', () => {
    it('should return dashboard stats on successful API call', async () => {
      // Arrange
      const mockStats = {
        totalEmployees: 156,
        totalCompanies: 12,
        totalInvestors: 8,
        totalPayrollCycles: 5,
        totalWorklogs: 234,
        totalWithdraws: 45,
        totalRepayments: 38,
        liquidityPool: 1500000000,
        payrollProcessed: 23000000000,
        pendingApprovals: 3,
      };

      const mockQueryResult = {
        data: mockStats,
        isLoading: false,
        isError: false,
        error: undefined,
        refetch: jest.fn(),
      };

      mockUseDashboardStatsQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useDashboardStats(), {
        wrapper: createWrapper(),
      });

      // Assert
      await waitFor(() => {
        expect(result.current.stats).toEqual(mockStats);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
      });
    });

    it('should handle loading states', async () => {
      // Arrange
      const mockQueryResult = {
        data: undefined,
        isLoading: true,
        isError: false,
        error: undefined,
        refetch: jest.fn(),
      };

      mockUseDashboardStatsQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useDashboardStats(), {
        wrapper: createWrapper(),
      });

      // Assert
      expect(result.current.isLoading).toBe(true);
    });

    it('should handle error states', async () => {
      // Arrange
      const mockQueryResult = {
        data: undefined,
        isLoading: false,
        isError: true,
        error: new Error('API Error'),
        refetch: jest.fn(),
      };

      mockUseDashboardStatsQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useDashboardStats(), {
        wrapper: createWrapper(),
      });

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });

    it('should provide default values when no data', async () => {
      // Arrange
      const mockQueryResult = {
        data: undefined,
        isLoading: false,
        isError: false,
        error: undefined,
        refetch: jest.fn(),
      };

      mockUseDashboardStatsQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useDashboardStats(), {
        wrapper: createWrapper(),
      });

      // Assert
      await waitFor(() => {
        expect(result.current.stats.totalEmployees).toBe(0);
        expect(result.current.stats.totalCompanies).toBe(0);
        expect(result.current.stats.totalInvestors).toBe(0);
        expect(result.current.stats.totalPayrollCycles).toBe(0);
      });
    });
  });
});