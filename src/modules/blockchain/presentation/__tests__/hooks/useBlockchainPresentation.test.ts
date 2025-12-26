// src/modules/blockchain/presentation/__tests__/hooks/useBlockchainPresentation.test.ts
import { renderHook } from '@testing-library/react';
import { useSupportedTokensPresentation, useSyncTokensPresentation } from '../../hooks/useBlockchainPresentation';

// Mock the data layer hooks
jest.mock('../../hooks/useBlockchainPresentation', () => ({
  ...jest.requireActual('../../hooks/useBlockchainPresentation'),
  useSupportedTokensPresentation: jest.fn(),
  useSyncTokensPresentation: jest.fn(),
}));

describe('Blockchain Presentation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useSupportedTokensPresentation', () => {
    it('should return formatted token data', () => {
      // Arrange
      const mockParams = {};
      const mockData = {
        tokens: [
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
        ],
        isLoading: false,
        isError: false,
        error: undefined,
        refetch: jest.fn(),
      };

      (useSupportedTokensPresentation as jest.MockedFunction<typeof useSupportedTokensPresentation>).mockReturnValue(mockData);

      // Act
      const { result } = renderHook(() => useSupportedTokensPresentation(mockParams));

      // Assert
      expect(result.current.tokens).toEqual(mockData.tokens);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
    });

    it('should handle error states', () => {
      // Arrange
      const mockErrorData = {
        tokens: [],
        isLoading: false,
        isError: true,
        error: new Error('API Error'),
        refetch: jest.fn(),
      };

      (useSupportedTokensPresentation as jest.MockedFunction<typeof useSupportedTokensPresentation>).mockReturnValue(mockErrorData);

      // Act
      const { result } = renderHook(() => useSupportedTokensPresentation({}));

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });

    it('should handle loading states', () => {
      // Arrange
      const mockLoadingData = {
        tokens: [],
        isLoading: true,
        isError: false,
        error: undefined,
        refetch: jest.fn(),
      };

      (useSupportedTokensPresentation as jest.MockedFunction<typeof useSupportedTokensPresentation>).mockReturnValue(mockLoadingData);

      // Act
      const { result } = renderHook(() => useSupportedTokensPresentation({}));

      // Assert
      expect(result.current.isLoading).toBe(true);
    });
  });

  describe('useSyncTokensPresentation', () => {
    it('should return sync function', () => {
      // Arrange
      const mockMutationResult = {
        syncTokens: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useSyncTokensPresentation as jest.MockedFunction<typeof useSyncTokensPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useSyncTokensPresentation());

      // Assert
      expect(result.current.syncTokens).toBeDefined();
      expect(typeof result.current.syncTokens).toBe('function');
    });

    it('should handle mutation success', () => {
      // Arrange
      const mockResponse = { success: true, message: 'Tokens synced successfully', count: 5 };
      const mockMutationResult = {
        syncTokens: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: true,
        data: mockResponse,
      };

      (useSyncTokensPresentation as jest.MockedFunction<typeof useSyncTokensPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useSyncTokensPresentation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });

    it('should handle mutation errors', () => {
      // Arrange
      const mockError = new Error('Sync failed');
      const mockMutationResult = {
        syncTokens: jest.fn(),
        isLoading: false,
        isError: true,
        error: mockError,
        isSuccess: false,
        data: undefined,
      };

      (useSyncTokensPresentation as jest.MockedFunction<typeof useSyncTokensPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useSyncTokensPresentation());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBe(mockError);
    });
  });
});