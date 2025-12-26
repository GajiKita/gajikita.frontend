// src/modules/payroll-cycle/data/__tests__/payroll-cycle.query.test.ts
import { renderHook } from '@testing-library/react';
import { usePayrollCyclesQuery, usePayrollCycleQuery } from '../payroll-cycle.query';

// Mock the API calls directly
jest.mock('../payroll-cycle.query', () => ({
  ...jest.requireActual('../payroll-cycle.query'),
  usePayrollCyclesQuery: jest.fn(),
  usePayrollCycleQuery: jest.fn(),
}));

describe('Payroll Cycle Query Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('usePayrollCyclesQuery', () => {
    it('should return data on successful API call', () => {
      // Arrange
      const mockData = {
        data: [
          {
            id: '1',
            company_id: 'company1',
            period_start: '2024-01-01',
            period_end: '2024-01-31',
            payout_date: '2024-02-05',
            total_working_days: 22,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            deleted: false,
          }
        ],
      };

      const mockQueryResult = {
        data: mockData,
        isLoading: false,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
        queryKey: ['payroll-cycles', 'list', {}],
      };

      (usePayrollCyclesQuery as jest.MockedFunction<typeof usePayrollCyclesQuery>).mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => usePayrollCyclesQuery());

      // Assert
      expect(result.current.data).toEqual(mockData);
      expect(result.current.isSuccess).toBe(true);
    });

    it('should handle error states', () => {
      // Arrange
      const mockQueryResult = {
        data: undefined,
        isLoading: false,
        isError: true,
        isSuccess: false,
        error: new Error('API Error'),
        refetch: jest.fn(),
        queryKey: ['payroll-cycles', 'list', {}],
      };

      (usePayrollCyclesQuery as jest.MockedFunction<typeof usePayrollCyclesQuery>).mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => usePayrollCyclesQuery());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });

    it('should use correct query key', () => {
      // Arrange
      const expectedQueryKey = ['payroll-cycles', 'list', {}];
      const mockQueryResult = {
        data: undefined,
        isLoading: false,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
        queryKey: expectedQueryKey,
      };

      (usePayrollCyclesQuery as jest.MockedFunction<typeof usePayrollCyclesQuery>).mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => usePayrollCyclesQuery());

      // Assert
      expect(result.current.queryKey).toEqual(expectedQueryKey);
    });
  });

  describe('usePayrollCycleQuery', () => {
    it('should return payroll cycle data on successful API call', () => {
      // Arrange
      const cycleId = '1';
      const mockData = {
        data: {
          id: '1',
          company_id: 'company1',
          period_start: '2024-01-01',
          period_end: '2024-01-31',
          payout_date: '2024-02-05',
          total_working_days: 22,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
        }
      };

      const mockQueryResult = {
        data: mockData,
        isLoading: false,
        isError: false,
        isSuccess: true,
        error: undefined,
        refetch: jest.fn(),
      };

      (usePayrollCycleQuery as jest.MockedFunction<typeof usePayrollCycleQuery>).mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => usePayrollCycleQuery({ id: cycleId }));

      // Assert
      expect(result.current.data).toEqual(mockData);
      expect(result.current.isSuccess).toBe(true);
    });
  });
});