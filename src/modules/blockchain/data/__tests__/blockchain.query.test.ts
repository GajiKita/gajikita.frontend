import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import {
  useSupportedTokensQuery,
  useSyncTokensMutation
} from '../../data/blockchain.query';
import { BlockchainRepositoryImpl } from '../../repository/implementation/BlockchainRepositoryImpl';

// Mock the repository
jest.mock('../../repository/implementation/BlockchainRepositoryImpl');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('Blockchain Data Layer Tests', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  describe('useSupportedTokensQuery', () => {
    it('should fetch supported tokens successfully', async () => {
      const mockResponse = {
        tokens: [
          {
            id: 'tk-123',
            name: 'USDC',
            symbol: 'USDC',
            address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
            chain_id: 421614,
            decimals: 6,
            is_active: true,
          },
        ],
      };

      const mockRepository = {
        getSupportedTokens: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as BlockchainRepositoryImpl;

      (BlockchainRepositoryImpl as jest.MockedClass<typeof BlockchainRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useSupportedTokensQuery(),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockRepository.getSupportedTokens).toHaveBeenCalled();
    });

    it('should handle error when fetching supported tokens', async () => {
      const mockError = new Error('Failed to fetch tokens');

      const mockRepository = {
        getSupportedTokens: jest.fn().mockRejectedValue(mockError),
      } as unknown as BlockchainRepositoryImpl;

      (BlockchainRepositoryImpl as jest.MockedClass<typeof BlockchainRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useSupportedTokensQuery(),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });

  describe('useSyncTokensMutation', () => {
    it('should sync tokens successfully', async () => {
      const mockResponse = {
        success: true,
        message: 'Tokens synced successfully',
        count: 5,
      };

      const mockRepository = {
        syncTokens: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as BlockchainRepositoryImpl;

      (BlockchainRepositoryImpl as jest.MockedClass<typeof BlockchainRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useSyncTokensMutation(),
        { wrapper }
      );

      result.current.mutate();

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockRepository.syncTokens).toHaveBeenCalled();
    });

    it('should handle error when syncing tokens', async () => {
      const mockError = new Error('Failed to sync tokens');

      const mockRepository = {
        syncTokens: jest.fn().mockRejectedValue(mockError),
      } as unknown as BlockchainRepositoryImpl;

      (BlockchainRepositoryImpl as jest.MockedClass<typeof BlockchainRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useSyncTokensMutation(),
        { wrapper }
      );

      result.current.mutate();

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });
});