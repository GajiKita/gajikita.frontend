// src/modules/withdraw/presentation/__tests__/hooks/useWithdrawPresentation.test.ts
import { renderHook } from '@testing-library/react';
import { useSimulateWithdrawPresentation, useCreateWithdrawRequestPresentation } from '../../hooks/useWithdrawPresentation';

// Mock the data layer hooks
jest.mock('../../hooks/useWithdrawPresentation', () => ({
  ...jest.requireActual('../../hooks/useWithdrawPresentation'),
  useSimulateWithdrawPresentation: jest.fn(),
  useCreateWithdrawRequestPresentation: jest.fn(),
}));

describe('Withdraw Presentation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useSimulateWithdrawPresentation', () => {
    it('should return simulation data', () => {
      // Arrange
      const mockParams = {
        employee_id: '1',
        payroll_cycle_id: 'cycle1',
        requested_amount: 1000000,
      };
      const mockData = {
        simulation: {
          data: {
            simulated_amount: 950000, // After fees
            fees: {
              platform_fee: 30000,
              gas_fee: 20000,
            },
            estimated_completion_time: '24h',
            token_rate: 0.000000000000000001, // ETH per IDR
          }
        },
        isLoading: false,
        isError: false,
        error: undefined,
        refetch: jest.fn(),
      };

      (useSimulateWithdrawPresentation as jest.MockedFunction<typeof useSimulateWithdrawPresentation>).mockReturnValue(mockData);

      // Act
      const { result } = renderHook(() => useSimulateWithdrawPresentation(mockParams));

      // Assert
      expect(result.current.simulation).toEqual(mockData.simulation);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
    });

    it('should handle error states', () => {
      // Arrange
      const mockParams = {
        employee_id: '1',
        payroll_cycle_id: 'cycle1',
        requested_amount: 1000000,
      };
      const mockErrorData = {
        simulation: undefined,
        isLoading: false,
        isError: true,
        error: new Error('API Error'),
        refetch: jest.fn(),
      };

      (useSimulateWithdrawPresentation as jest.MockedFunction<typeof useSimulateWithdrawPresentation>).mockReturnValue(mockErrorData);

      // Act
      const { result } = renderHook(() => useSimulateWithdrawPresentation(mockParams));

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });

    it('should handle loading states', () => {
      // Arrange
      const mockParams = {
        employee_id: '1',
        payroll_cycle_id: 'cycle1',
        requested_amount: 1000000,
      };
      const mockLoadingData = {
        simulation: undefined,
        isLoading: true,
        isError: false,
        error: undefined,
        refetch: jest.fn(),
      };

      (useSimulateWithdrawPresentation as jest.MockedFunction<typeof useSimulateWithdrawPresentation>).mockReturnValue(mockLoadingData);

      // Act
      const { result } = renderHook(() => useSimulateWithdrawPresentation(mockParams));

      // Assert
      expect(result.current.isLoading).toBe(true);
    });
  });

  describe('useCreateWithdrawRequestPresentation', () => {
    it('should return create function', () => {
      // Arrange
      const mockMutationResult = {
        createWithdrawRequest: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useCreateWithdrawRequestPresentation as jest.MockedFunction<typeof useCreateWithdrawRequestPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateWithdrawRequestPresentation());

      // Assert
      expect(result.current.createWithdrawRequest).toBeDefined();
      expect(typeof result.current.createWithdrawRequest).toBe('function');
    });

    it('should handle mutation success', () => {
      // Arrange
      const mockResponse = {
        data: {
          id: 'withdraw1',
          employee_id: '1',
          payroll_cycle_id: 'cycle1',
          requested_amount: 1000000,
          processed_amount: 950000,
          status: 'pending',
          transaction_hash: null,
          requested_at: '2024-01-15T10:00:00Z',
          processed_at: null,
          completed_at: null,
        }
      };
      const mockMutationResult = {
        createWithdrawRequest: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: true,
        data: mockResponse,
      };

      (useCreateWithdrawRequestPresentation as jest.MockedFunction<typeof useCreateWithdrawRequestPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateWithdrawRequestPresentation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });

    it('should handle mutation errors', () => {
      // Arrange
      const mockError = new Error('Insufficient balance');
      const mockMutationResult = {
        createWithdrawRequest: jest.fn(),
        isLoading: false,
        isError: true,
        error: mockError,
        isSuccess: false,
        data: undefined,
      };

      (useCreateWithdrawRequestPresentation as jest.MockedFunction<typeof useCreateWithdrawRequestPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateWithdrawRequestPresentation());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBe(mockError);
    });
  });
});