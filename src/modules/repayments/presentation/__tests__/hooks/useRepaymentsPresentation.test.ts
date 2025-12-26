// src/modules/repayments/presentation/__tests__/hooks/useRepaymentsPresentation.test.ts
import { renderHook } from '@testing-library/react';
import { useProcessCyclePresentation, usePreparePlatformFeeWithdrawalPresentation } from '../../hooks/useRepaymentsPresentation';

// Mock the data layer hooks
jest.mock('../../hooks/useRepaymentsPresentation', () => ({
  ...jest.requireActual('../../hooks/useRepaymentsPresentation'),
  useProcessCyclePresentation: jest.fn(),
  usePreparePlatformFeeWithdrawalPresentation: jest.fn(),
}));

describe('Repayments Presentation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useProcessCyclePresentation', () => {
    it('should return process function', () => {
      // Arrange
      const mockMutationResult = {
        processCycle: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useProcessCyclePresentation as jest.MockedFunction<typeof useProcessCyclePresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useProcessCyclePresentation());

      // Assert
      expect(result.current.processCycle).toBeDefined();
      expect(typeof result.current.processCycle).toBe('function');
    });

    it('should handle successful cycle processing', () => {
      // Arrange
      const mockRequest = {
        cycle_id: 'cycle1',
      };
      const mockResponse = {
        data: {
          success: true,
          processed_count: 15,
          total_amount: 150000000,
          message: 'Payroll cycle processed successfully',
        }
      };
      const mockMutationResult = {
        processCycle: jest.fn().mockResolvedValue(mockResponse),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: true,
        data: mockResponse,
      };

      (useProcessCyclePresentation as jest.MockedFunction<typeof useProcessCyclePresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useProcessCyclePresentation());

      // Process a cycle
      result.current.processCycle(mockRequest);

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });

    it('should handle mutation errors', () => {
      // Arrange
      const mockError = new Error('Cycle processing failed');
      const mockMutationResult = {
        processCycle: jest.fn(),
        isLoading: false,
        isError: true,
        error: mockError,
        isSuccess: false,
        data: undefined,
      };

      (useProcessCyclePresentation as jest.MockedFunction<typeof useProcessCyclePresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useProcessCyclePresentation());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBe(mockError);
    });
  });

  describe('usePreparePlatformFeeWithdrawalPresentation', () => {
    it('should return prepare function', () => {
      // Arrange
      const mockMutationResult = {
        preparePlatformFeeWithdrawal: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (usePreparePlatformFeeWithdrawalPresentation as jest.MockedFunction<typeof usePreparePlatformFeeWithdrawalPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => usePreparePlatformFeeWithdrawalPresentation());

      // Assert
      expect(result.current.preparePlatformFeeWithdrawal).toBeDefined();
      expect(typeof result.current.preparePlatformFeeWithdrawal).toBe('function');
    });

    it('should handle successful platform fee withdrawal preparation', () => {
      // Arrange
      const mockRequest = {
        amount: 5000000,
        recipient: '0x1234567890123456789012345678901234567890',
      };
      const mockResponse = {
        data: {
          transaction_hash: '0xabc123...',
          estimated_gas: '45000',
          gas_price: '25',
          fee_distributed: true,
        }
      };
      const mockMutationResult = {
        preparePlatformFeeWithdrawal: jest.fn().mockResolvedValue(mockResponse),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: true,
        data: mockResponse,
      };

      (usePreparePlatformFeeWithdrawalPresentation as jest.MockedFunction<typeof usePreparePlatformFeeWithdrawalPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => usePreparePlatformFeeWithdrawalPresentation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });

    it('should handle preparation errors', () => {
      // Arrange
      const mockError = new Error('Fee withdrawal preparation failed');
      const mockMutationResult = {
        preparePlatformFeeWithdrawal: jest.fn(),
        isLoading: false,
        isError: true,
        error: mockError,
        isSuccess: false,
        data: undefined,
      };

      (usePreparePlatformFeeWithdrawalPresentation as jest.MockedFunction<typeof usePreparePlatformFeeWithdrawalPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => usePreparePlatformFeeWithdrawalPresentation());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBe(mockError);
    });
  });
});