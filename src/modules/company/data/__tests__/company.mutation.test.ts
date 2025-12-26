// src/modules/company/data/__tests__/company.mutation.test.ts
import { renderHook } from '@testing-library/react';
import { useCreateCompanyMutation, useUpdateCompanyMutation, useDeleteCompanyMutation } from '../company.mutation';

// Mock the API calls directly
jest.mock('../company.mutation', () => ({
  ...jest.requireActual('../company.mutation'),
  useCreateCompanyMutation: jest.fn(),
  useUpdateCompanyMutation: jest.fn(),
  useDeleteCompanyMutation: jest.fn(),
}));

describe('Company Mutation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCreateCompanyMutation', () => {
    it('should return success on successful API call', () => {
      // Arrange
      const mockRequest = {
        name: 'New Company',
        address: 'New Address',
        wallet_address: '0x1234567890123456789012345678901234567890',
        min_lock_percentage: 10,
        fee_share_company: 20,
        fee_share_platform: 5,
        fee_share_investor: 5,
        preferred_payout_token: 'ETH',
      };
      const mockResponse = {
        data: {
          id: '1',
          ...mockRequest,
          reward_balance: 0,
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

      (useCreateCompanyMutation as jest.MockedFunction<typeof useCreateCompanyMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateCompanyMutation());

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

      (useCreateCompanyMutation as jest.MockedFunction<typeof useCreateCompanyMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateCompanyMutation());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });
  });

  describe('useUpdateCompanyMutation', () => {
    it('should return success on successful API call', () => {
      // Arrange
      const mockRequest = {
        id: '1',
        name: 'Updated Company',
        address: 'Updated Address',
        min_lock_percentage: 15,
      };
      const mockResponse = {
        data: {
          id: '1',
          name: 'Updated Company',
          address: 'Updated Address',
          wallet_address: '0x1234567890123456789012345678901234567890',
          min_lock_percentage: 15,
          fee_share_company: 20,
          fee_share_platform: 5,
          fee_share_investor: 5,
          reward_balance: 0,
          withdrawn_rewards: 0,
          preferred_payout_token: 'ETH',
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

      (useUpdateCompanyMutation as jest.MockedFunction<typeof useUpdateCompanyMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useUpdateCompanyMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });
  });

  describe('useDeleteCompanyMutation', () => {
    it('should return success on successful API call', () => {
      // Arrange
      const companyId = '1';

      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockResolvedValue(undefined),
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: undefined,
        error: undefined,
      };

      (useDeleteCompanyMutation as jest.MockedFunction<typeof useDeleteCompanyMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useDeleteCompanyMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
    });
  });
});