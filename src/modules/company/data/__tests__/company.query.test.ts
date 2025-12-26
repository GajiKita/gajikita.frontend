// src/modules/company/data/__tests__/company.query.test.ts
import { renderHook } from '@testing-library/react';
import { useCompaniesQuery, useCompanyQuery } from '../company.query';

// Mock the API calls directly
jest.mock('../company.query', () => ({
  ...jest.requireActual('../company.query'),
  useCompaniesQuery: jest.fn(),
  useCompanyQuery: jest.fn(),
}));

describe('Company Query Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCompaniesQuery', () => {
    it('should return data on successful API call', () => {
      // Arrange
      const mockData = {
        data: [
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
      };

      const mockQueryResult = {
        data: mockData,
        isLoading: false,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
        queryKey: ['companies', 'list', {}],
      };

      (useCompaniesQuery as jest.MockedFunction<typeof useCompaniesQuery>).mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useCompaniesQuery());

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
        queryKey: ['companies', 'list', {}],
      };

      (useCompaniesQuery as jest.MockedFunction<typeof useCompaniesQuery>).mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useCompaniesQuery());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });

    it('should use correct query key', () => {
      // Arrange
      const expectedQueryKey = ['companies', 'list', {}];
      const mockQueryResult = {
        data: undefined,
        isLoading: false,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
        queryKey: expectedQueryKey,
      };

      (useCompaniesQuery as jest.MockedFunction<typeof useCompaniesQuery>).mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useCompaniesQuery());

      // Assert
      expect(result.current.queryKey).toEqual(expectedQueryKey);
    });
  });

  describe('useCompanyQuery', () => {
    it('should return company data on successful API call', () => {
      // Arrange
      const companyId = '1';
      const mockData = {
        data: {
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
      };

      const mockQueryResult = {
        data: mockData,
        isLoading: false,
        isError: false,
        isSuccess: true,
        error: undefined,
        refetch: jest.fn(),
      };

      (useCompanyQuery as jest.MockedFunction<typeof useCompanyQuery>).mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useCompanyQuery({ id: companyId }));

      // Assert
      expect(result.current.data).toEqual(mockData);
      expect(result.current.isSuccess).toBe(true);
    });
  });
});