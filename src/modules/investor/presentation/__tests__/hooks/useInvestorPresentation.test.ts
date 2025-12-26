// src/modules/investor/presentation/__tests__/hooks/useInvestorPresentation.test.ts
import { renderHook } from '@testing-library/react';
import { useInvestorListPresentation, useInvestorDetailPresentation, useCreateInvestorPresentation, useUpdateInvestorPresentation, useDeleteInvestorPresentation, usePrepareDepositLiquidityPresentation, usePrepareWithdrawRewardPresentation, useUpdateMePreferredTokenPresentation } from '../../hooks/useInvestorPresentation';

// Mock the data layer hooks
jest.mock('../../hooks/useInvestorPresentation', () => ({
  ...jest.requireActual('../../hooks/useInvestorPresentation'),
  useInvestorListPresentation: jest.fn(),
  useInvestorDetailPresentation: jest.fn(),
  useCreateInvestorPresentation: jest.fn(),
  useUpdateInvestorPresentation: jest.fn(),
  useDeleteInvestorPresentation: jest.fn(),
  usePrepareDepositLiquidityPresentation: jest.fn(),
  usePrepareWithdrawRewardPresentation: jest.fn(),
  useUpdateMePreferredTokenPresentation: jest.fn(),
}));

describe('Investor Presentation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useInvestorListPresentation', () => {
    it('should return formatted investor data', () => {
      // Arrange
      const mockParams = { page: 1, limit: 10, search: '' };
      const mockData = {
        investors: [
          {
            id: '1',
            wallet_address: '0x1234567890123456789012345678901234567890',
            liquidity_balance: 1000000,
            withdrawn_rewards: 50000,
            preferred_payout_token: 'ETH',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            deleted: false,
          }
        ],
        isLoading: false,
        isError: false,
        error: undefined,
        refetch: jest.fn(),
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
        },
      };

      (useInvestorListPresentation as jest.MockedFunction<typeof useInvestorListPresentation>).mockReturnValue(mockData);

      // Act
      const { result } = renderHook(() => useInvestorListPresentation(mockParams));

      // Assert
      expect(result.current.investors).toEqual(mockData.investors);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
    });

    it('should handle error states', () => {
      // Arrange
      const mockErrorData = {
        investors: [],
        isLoading: false,
        isError: true,
        error: new Error('API Error'),
        refetch: jest.fn(),
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
      };

      (useInvestorListPresentation as jest.MockedFunction<typeof useInvestorListPresentation>).mockReturnValue(mockErrorData);

      // Act
      const { result } = renderHook(() => useInvestorListPresentation({ page: 1, limit: 10 }));

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });
  });

  describe('useInvestorDetailPresentation', () => {
    it('should return investor detail data', () => {
      // Arrange
      const investorId = '1';
      const mockData = {
        investor: {
          id: '1',
          wallet_address: '0x1234567890123456789012345678901234567890',
          liquidity_balance: 1000000,
          withdrawn_rewards: 50000,
          preferred_payout_token: 'ETH',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
        },
        isLoading: false,
        isError: false,
        error: undefined,
      };

      (useInvestorDetailPresentation as jest.MockedFunction<typeof useInvestorDetailPresentation>).mockReturnValue(mockData);

      // Act
      const { result } = renderHook(() => useInvestorDetailPresentation(investorId));

      // Assert
      expect(result.current.investor).toEqual(mockData.investor);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('useCreateInvestorPresentation', () => {
    it('should return mutation function', () => {
      // Arrange
      const mockMutationResult = {
        createInvestor: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useCreateInvestorPresentation as jest.MockedFunction<typeof useCreateInvestorPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateInvestorPresentation());

      // Assert
      expect(result.current.createInvestor).toBeDefined();
      expect(typeof result.current.createInvestor).toBe('function');
    });
  });

  describe('useUpdateInvestorPresentation', () => {
    it('should return update function', () => {
      // Arrange
      const mockMutationResult = {
        updateInvestor: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useUpdateInvestorPresentation as jest.MockedFunction<typeof useUpdateInvestorPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useUpdateInvestorPresentation());

      // Assert
      expect(result.current.updateInvestor).toBeDefined();
      expect(typeof result.current.updateInvestor).toBe('function');
    });
  });

  describe('useDeleteInvestorPresentation', () => {
    it('should return delete function', () => {
      // Arrange
      const mockMutationResult = {
        deleteInvestor: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useDeleteInvestorPresentation as jest.MockedFunction<typeof useDeleteInvestorPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useDeleteInvestorPresentation());

      // Assert
      expect(result.current.deleteInvestor).toBeDefined();
      expect(typeof result.current.deleteInvestor).toBe('function');
    });
  });

  describe('usePrepareDepositLiquidityPresentation', () => {
    it('should return prepare deposit liquidity function', () => {
      // Arrange
      const mockMutationResult = {
        prepareDepositLiquidity: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (usePrepareDepositLiquidityPresentation as jest.MockedFunction<typeof usePrepareDepositLiquidityPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => usePrepareDepositLiquidityPresentation());

      // Assert
      expect(result.current.prepareDepositLiquidity).toBeDefined();
      expect(typeof result.current.prepareDepositLiquidity).toBe('function');
    });
  });

  describe('usePrepareWithdrawRewardPresentation', () => {
    it('should return prepare withdraw reward function', () => {
      // Arrange
      const mockMutationResult = {
        prepareWithdrawReward: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (usePrepareWithdrawRewardPresentation as jest.MockedFunction<typeof usePrepareWithdrawRewardPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => usePrepareWithdrawRewardPresentation());

      // Assert
      expect(result.current.prepareWithdrawReward).toBeDefined();
      expect(typeof result.current.prepareWithdrawReward).toBe('function');
    });
  });

  describe('useUpdateMePreferredTokenPresentation', () => {
    it('should return update preferred token function', () => {
      // Arrange
      const mockMutationResult = {
        updateMePreferredToken: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useUpdateMePreferredTokenPresentation as jest.MockedFunction<typeof useUpdateMePreferredTokenPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useUpdateMePreferredTokenPresentation());

      // Assert
      expect(result.current.updateMePreferredToken).toBeDefined();
      expect(typeof result.current.updateMePreferredToken).toBe('function');
    });
  });
});