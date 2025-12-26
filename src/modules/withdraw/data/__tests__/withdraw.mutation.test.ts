// src/modules/withdraw/data/__tests__/withdraw.mutation.test.ts
import { renderHook } from '@testing-library/react';
import { useCreateWithdrawRequestMutation } from '../withdraw.mutation';

// Mock the API calls directly
jest.mock('../withdraw.mutation', () => ({
  ...jest.requireActual('../withdraw.mutation'),
  useCreateWithdrawRequestMutation: jest.fn(),
}));

describe('Withdraw Mutation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCreateWithdrawRequestMutation', () => {
    it('should return success on successful API call', () => {
      // Arrange
      const mockRequest = {
        employee_id: '1',
        payroll_cycle_id: 'cycle1',
        requested_amount: 1000000,
        reason: 'Emergency funds',
      };
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
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockResolvedValue(mockResponse),
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: mockResponse,
        error: undefined,
      };

      (useCreateWithdrawRequestMutation as jest.MockedFunction<typeof useCreateWithdrawRequestMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateWithdrawRequestMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });

    it('should handle mutation errors', () => {
      // Arrange
      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockRejectedValue(new Error('Insufficient balance')),
        isLoading: false,
        isError: true,
        isSuccess: false,
        data: undefined,
        error: new Error('Insufficient balance'),
      };

      (useCreateWithdrawRequestMutation as jest.MockedFunction<typeof useCreateWithdrawRequestMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateWithdrawRequestMutation());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });
  });
});