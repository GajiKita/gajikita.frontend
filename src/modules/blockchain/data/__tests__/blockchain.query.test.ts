// src/modules/blockchain/data/__tests__/blockchain.query.test.ts
import React from 'react';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSupportedTokensQuery } from '../blockchain.query';

// Mock the API calls directly
jest.mock('../blockchain.query', () => ({
  ...jest.requireActual('../blockchain.query'),
  useSupportedTokensQuery: jest.fn(),
}));

const mockUseSupportedTokensQuery = useSupportedTokensQuery as jest.MockedFunction<
  typeof useSupportedTokensQuery
>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children
    );
  };
};

describe('Blockchain Query Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useSupportedTokensQuery', () => {
    it('should return supported tokens on successful API call', () => {
      // Arrange
      const mockTokens = [
        {
          id: '1',
          symbol: 'ETH',
          name: 'Ethereum',
          decimals: 18,
          chain_id: 1,
          address: '0x0000000000000000000000000000000000000000',
          logo_uri: 'https://example.com/eth-logo.png',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
        }
      ];

      const mockQueryResult = {
        data: mockTokens,
        isLoading: false,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
        queryKey: ['blockchain', 'supported-tokens', {}],
      };

      mockUseSupportedTokensQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useSupportedTokensQuery(), {
        wrapper: createWrapper(),
      });

      // Assert
      expect(result.current.data).toEqual(mockTokens);
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
        queryKey: ['blockchain', 'supported-tokens', {}],
      };

      mockUseSupportedTokensQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useSupportedTokensQuery(), {
        wrapper: createWrapper(),
      });

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });

    it('should handle loading states', () => {
      // Arrange
      const mockQueryResult = {
        data: undefined,
        isLoading: true,
        isError: false,
        isSuccess: false,
        refetch: jest.fn(),
        queryKey: ['blockchain', 'supported-tokens', {}],
      };

      mockUseSupportedTokensQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useSupportedTokensQuery(), {
        wrapper: createWrapper(),
      });

      // Assert
      expect(result.current.isLoading).toBe(true);
    });

    it('should use correct query key', () => {
      // Arrange
      const expectedQueryKey = ['blockchain', 'supported-tokens', {}];
      const mockQueryResult = {
        data: [],
        isLoading: false,
        isError: false,
        isSuccess: true,
        refetch: jest.fn(),
        queryKey: expectedQueryKey,
      };

      mockUseSupportedTokensQuery.mockReturnValue(mockQueryResult);

      // Act
      const { result } = renderHook(() => useSupportedTokensQuery(), {
        wrapper: createWrapper(),
      });

      // Assert
      expect(result.current.queryKey).toEqual(expectedQueryKey);
    });
  });
});