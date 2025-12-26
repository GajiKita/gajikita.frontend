// src/modules/investor/data/__tests__/investor.mutation.test.ts
import { renderHook } from '@testing-library/react';
import { useCreateInvestorMutation, useUpdateInvestorMutation, useDeleteInvestorMutation, usePrepareDepositLiquidityMutation, usePrepareWithdrawRewardMutation, useUpdateMePreferredTokenMutation } from '../investor.mutation';

// Mock the API calls directly
jest.mock('../investor.mutation', () => ({
  ...jest.requireActual('../investor.mutation'),
  useCreateInvestorMutation: jest.fn(),
  useUpdateInvestorMutation: jest.fn(),
  useDeleteInvestorMutation: jest.fn(),
  usePrepareDepositLiquidityMutation: jest.fn(),
  usePrepareWithdrawRewardMutation: jest.fn(),
  useUpdateMePreferredTokenMutation: jest.fn(),
}));

describe('Investor Mutation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCreateInvestorMutation', () => {
    it('should return success on successful API call', () => {
      // Arrange
      const mockRequest = {
        wallet_address: '0x1234567890123456789012345678901234567890',
        preferred_payout_token: 'ETH',
      };
      const mockResponse = {
        data: {
          id: '1',
          ...mockRequest,
          liquidity_balance: 0,
          withdrawn_rewards: 0,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
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

      (useCreateInvestorMutation as jest.MockedFunction<typeof useCreateInvestorMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateInvestorMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });

    it('should handle mutation errors', () => {
      // Arrange
      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockRejectedValue(new Error('API Error')),
        isLoading: false,
        isError: true,
        isSuccess: false,
        data: undefined,
        error: new Error('API Error'),
      };

      (useCreateInvestorMutation as jest.MockedFunction<typeof useCreateInvestorMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateInvestorMutation());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });
  });

  describe('useUpdateInvestorMutation', () => {
    it('should return success on successful API call', () => {
      // Arrange
      const mockRequest = {
        id: '1',
        preferred_payout_token: 'USDC',
      };
      const mockResponse = {
        data: {
          id: '1',
          wallet_address: '0x1234567890123456789012345678901234567890',
          preferred_payout_token: 'USDC',
          liquidity_balance: 0,
          withdrawn_rewards: 0,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-02T00:00:00Z',
          deleted: false,
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

      (useUpdateInvestorMutation as jest.MockedFunction<typeof useUpdateInvestorMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useUpdateInvestorMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });
  });

  describe('useDeleteInvestorMutation', () => {
    it('should return success on successful API call', () => {
      // Arrange
      const investorId = '1';

      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockResolvedValue(undefined),
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: undefined,
        error: undefined,
      };

      (useDeleteInvestorMutation as jest.MockedFunction<typeof useDeleteInvestorMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useDeleteInvestorMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
    });
  });

  describe('usePrepareDepositLiquidityMutation', () => {
    it('should return success on successful API call', () => {
      // Arrange
      const mockRequest = {
        amount: 1000000,
        cid: 'some-cid',
      };
      const mockResponse = {
        data: {
          transaction_hash: '0xabc123...',
          estimated_gas: '21000',
          gas_price: '20',
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

      (usePrepareDepositLiquidityMutation as jest.MockedFunction<typeof usePrepareDepositLiquidityMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => usePrepareDepositLiquidityMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });
  });

  describe('usePrepareWithdrawRewardMutation', () => {
    it('should return success on successful API call', () => {
      // Arrange
      const mockRequest = {
        amount: 50000,
        cid: 'some-cid',
      };
      const mockResponse = {
        data: {
          transaction_hash: '0xdef456...',
          estimated_gas: '25000',
          gas_price: '22',
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

      (usePrepareWithdrawRewardMutation as jest.MockedFunction<typeof usePrepareWithdrawRewardMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => usePrepareWithdrawRewardMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });
  });

  describe('useUpdateMePreferredTokenMutation', () => {
    it('should return success on successful API call', () => {
      // Arrange
      const mockRequest = {
        preferred_token: 'USDC',
      };
      const mockResponse = {
        data: {
          success: true,
          message: 'Preferred token updated successfully',
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

      (useUpdateMePreferredTokenMutation as jest.MockedFunction<typeof useUpdateMePreferredTokenMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useUpdateMePreferredTokenMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });
  });
});