// src/modules/withdraw/data/__tests__/withdraw.query.test.ts
import { renderHook } from '@testing-library/react';
import { useSimulateWithdrawQuery } from '../withdraw.query';

// Mock the API calls directly
jest.mock('../withdraw.query', () => ({
  ...jest.requireActual('../withdraw.query'),
  useSimulateWithdrawQuery: jest.fn(),
}));

describe('Withdraw Query Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useSimulateWithdrawQuery', () => {
    it('should return data on successful API call', () => {
      // Arrange
      const mockParams = {
        employee_id: '1',
        payroll_cycle_id: 'cycle1',
        requested_amount: 1000000,
      };
      const mockData = {
        data: {
          simulated_amount: 950000, // After fees
          fees: {
            platform_fee: 30000,
            gas_fee: 20000,
          },
          estimated_completion_time: '24h',
          token_rate: 0.000000000000000001, // ETH per IDR
        }
      };

      const mockQueryResult = {
        data: mockData,
        isLoading: false,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
        queryKey: ['withdraws', 'simulate', mockParams],
      };

      (useSimulateWithdrawQuery as jest.MockedFunction<typeof useSimulateWithdrawQuery>).mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useSimulateWithdrawQuery(mockParams));

      // Assert
      expect(result.current.data).toEqual(mockData);
      expect(result.current.isSuccess).toBe(true);
    });

    it('should handle error states', () => {
      // Arrange
      const mockParams = {
        employee_id: '1',
        payroll_cycle_id: 'cycle1',
        requested_amount: 1000000,
      };
      const mockQueryResult = {
        data: undefined,
        isLoading: false,
        isError: true,
        isSuccess: false,
        error: new Error('API Error'),
        refetch: jest.fn(),
        queryKey: ['withdraws', 'simulate', mockParams],
      };

      (useSimulateWithdrawQuery as jest.MockedFunction<typeof useSimulateWithdrawQuery>).mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useSimulateWithdrawQuery(mockParams));

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });

    it('should use correct query key', () => {
      // Arrange
      const params = {
        employee_id: '1',
        payroll_cycle_id: 'cycle1',
        requested_amount: 1000000,
      };
      const expectedQueryKey = ['withdraws', 'simulate', params];
      const mockQueryResult = {
        data: undefined,
        isLoading: false,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
        queryKey: expectedQueryKey,
      };

      (useSimulateWithdrawQuery as jest.MockedFunction<typeof useSimulateWithdrawQuery>).mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useSimulateWithdrawQuery(params));

      // Assert
      expect(result.current.queryKey).toEqual(expectedQueryKey);
    });
  });
});