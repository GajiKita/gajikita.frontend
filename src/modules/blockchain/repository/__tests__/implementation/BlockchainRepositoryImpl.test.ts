// src/modules/blockchain/repository/__tests__/implementation/BlockchainRepositoryImpl.test.ts
import { BlockchainRepositoryImpl } from '../../implementation/BlockchainRepositoryImpl';
import { httpClient } from '@/core/utils/http/httpClient';

// Mock the http client
jest.mock('@/core/utils/http/httpClient');

describe('BlockchainRepositoryImpl', () => {
  let repository: BlockchainRepositoryImpl;
  const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>;

  beforeEach(() => {
    repository = new BlockchainRepositoryImpl();
    jest.clearAllMocks();
  });

  describe('getSupportedTokens', () => {
    it('should call httpClient.get with correct parameters', async () => {
      // Arrange
      const mockResponse = {
        data: [
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
      };
      mockHttpClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.getSupportedTokens();

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith('/blockchain/supported-tokens');
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors correctly', async () => {
      // Arrange
      const error = new Error('Network error');
      mockHttpClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(repository.getSupportedTokens()).rejects.toThrow('Network error');
    });
  });

  describe('syncTokens', () => {
    it('should call httpClient.post with correct parameters', async () => {
      // Arrange
      const mockResponse = {
        success: true,
        message: 'Tokens synced successfully',
        count: 5,
      };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.syncTokens({});

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('/blockchain/sync-tokens', {});
      expect(result).toEqual(mockResponse);
    });

    it('should handle sync errors', async () => {
      // Arrange
      const error = new Error('Sync failed');
      mockHttpClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(repository.syncTokens()).rejects.toThrow('Sync failed');
    });
  });
});