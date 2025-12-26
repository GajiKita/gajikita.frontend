// src/modules/repayments/data/__tests__/repayments.mutation.test.ts
import { renderHook } from '@testing-library/react';
import { useProcessCycleMutation, usePreparePlatformFeeWithdrawalMutation } from '../repayments.mutation';

// Mock the API calls directly
jest.mock('../repayments.mutation', () => ({
  ...jest.requireActual('../repayments.mutation'),
  useProcessCycleMutation: jest.fn(),
  usePreparePlatformFeeWithdrawalMutation: jest.fn(),
}));

describe('Repayments Mutation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useProcessCycleMutation', () => {
    it('should return success on successful API call', () => {
      // Arrange
      const mockRequest = {
        cycleId: 'cycle1',
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
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockResolvedValue(mockResponse),
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: mockResponse,
        error: undefined,
      };

      (useProcessCycleMutation as jest.MockedFunction<typeof useProcessCycleMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useProcessCycleMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });

    it('should handle mutation errors', () => {
      // Arrange
      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockRejectedValue(new Error('Processing failed')),
        isLoading: false,
        isError: true,
        isSuccess: false,
        data: undefined,
        error: new Error('Processing failed'),
      };

      (useProcessCycleMutation as jest.MockedFunction<typeof useProcessCycleMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useProcessCycleMutation());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });
  });

  describe('usePreparePlatformFeeWithdrawalMutation', () => {
    it('should return success on successful API call', () => {
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
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockResolvedValue(mockResponse),
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: mockResponse,
        error: undefined,
      };

      (usePreparePlatformFeeWithdrawalMutation as jest.MockedFunction<typeof usePreparePlatformFeeWithdrawalMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => usePreparePlatformFeeWithdrawalMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });

    it('should handle mutation errors', () => {
      // Arrange
      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockRejectedValue(new Error('Withdrawal preparation failed')),
        isLoading: false,
        isError: true,
        isSuccess: false,
        data: undefined,
        error: new Error('Withdrawal preparation failed'),
      };

      (usePreparePlatformFeeWithdrawalMutation as jest.MockedFunction<typeof usePreparePlatformFeeWithdrawalMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => usePreparePlatformFeeWithdrawalMutation());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });
  });
});