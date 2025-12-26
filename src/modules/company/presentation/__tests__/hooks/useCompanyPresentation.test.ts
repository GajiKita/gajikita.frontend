// src/modules/company/presentation/__tests__/hooks/useCompanyPresentation.test.ts
import { renderHook } from '@testing-library/react';
import { useCompanyListPresentation, useCompanyDetailPresentation, useCreateCompanyPresentation, useUpdateCompanyPresentation, useDeleteCompanyPresentation } from '../../hooks/useCompanyPresentation';

// Mock the data layer hooks
jest.mock('../../hooks/useCompanyPresentation', () => ({
  ...jest.requireActual('../../hooks/useCompanyPresentation'),
  useCompanyListPresentation: jest.fn(),
  useCompanyDetailPresentation: jest.fn(),
  useCreateCompanyPresentation: jest.fn(),
  useUpdateCompanyPresentation: jest.fn(),
  useDeleteCompanyPresentation: jest.fn(),
}));

describe('Company Presentation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCompanyListPresentation', () => {
    it('should return formatted company data', () => {
      // Arrange
      const mockParams = { page: 1, limit: 10, search: '' };
      const mockData = {
        companies: [
          {
            id: '1',
            name: 'Test Company',
            address: 'Test Address',
            wallet_address: '0x1234567890123456789012345678901234567890',
            min_lock_percentage: 10,
            fee_share_company: 20,
            fee_share_platform: 5,
            fee_share_investor: 5,
            reward_balance: 1000,
            withdrawn_rewards: 0,
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

      (useCompanyListPresentation as jest.MockedFunction<typeof useCompanyListPresentation>).mockReturnValue(mockData);

      // Act
      const { result } = renderHook(() => useCompanyListPresentation(mockParams));

      // Assert
      expect(result.current.companies).toEqual(mockData.companies);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
    });

    it('should handle error states', () => {
      // Arrange
      const mockErrorData = {
        companies: [],
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

      (useCompanyListPresentation as jest.MockedFunction<typeof useCompanyListPresentation>).mockReturnValue(mockErrorData);

      // Act
      const { result } = renderHook(() => useCompanyListPresentation({ page: 1, limit: 10 }));

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });
  });

  describe('useCompanyDetailPresentation', () => {
    it('should return company detail data', () => {
      // Arrange
      const companyId = '1';
      const mockData = {
        company: {
          id: '1',
          name: 'Test Company',
          address: 'Test Address',
          wallet_address: '0x1234567890123456789012345678901234567890',
          min_lock_percentage: 10,
          fee_share_company: 20,
          fee_share_platform: 5,
          fee_share_investor: 5,
          reward_balance: 1000,
          withdrawn_rewards: 0,
          preferred_payout_token: 'ETH',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
        },
        isLoading: false,
        isError: false,
        error: undefined,
      };

      (useCompanyDetailPresentation as jest.MockedFunction<typeof useCompanyDetailPresentation>).mockReturnValue(mockData);

      // Act
      const { result } = renderHook(() => useCompanyDetailPresentation(companyId));

      // Assert
      expect(result.current.company).toEqual(mockData.company);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('useCreateCompanyPresentation', () => {
    it('should return mutation function', () => {
      // Arrange
      const mockMutationResult = {
        createCompany: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useCreateCompanyPresentation as jest.MockedFunction<typeof useCreateCompanyPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateCompanyPresentation());

      // Assert
      expect(result.current.createCompany).toBeDefined();
      expect(typeof result.current.createCompany).toBe('function');
    });
  });

  describe('useUpdateCompanyPresentation', () => {
    it('should return update function', () => {
      // Arrange
      const mockMutationResult = {
        updateCompany: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useUpdateCompanyPresentation as jest.MockedFunction<typeof useUpdateCompanyPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useUpdateCompanyPresentation());

      // Assert
      expect(result.current.updateCompany).toBeDefined();
      expect(typeof result.current.updateCompany).toBe('function');
    });
  });

  describe('useDeleteCompanyPresentation', () => {
    it('should return delete function', () => {
      // Arrange
      const mockMutationResult = {
        deleteCompany: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useDeleteCompanyPresentation as jest.MockedFunction<typeof useDeleteCompanyPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useDeleteCompanyPresentation());

      // Assert
      expect(result.current.deleteCompany).toBeDefined();
      expect(typeof result.current.deleteCompany).toBe('function');
    });
  });
});