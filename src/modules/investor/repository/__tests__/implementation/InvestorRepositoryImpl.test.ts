// src/modules/investor/repository/__tests__/implementation/InvestorRepositoryImpl.test.ts
import { InvestorRepositoryImpl } from '../../implementation/InvestorRepositoryImpl';
import { httpClient } from '@/core/utils/http/httpClient';

// Mock the http client
jest.mock('@/core/utils/http/httpClient');

describe('InvestorRepositoryImpl', () => {
  let repository: InvestorRepositoryImpl;
  const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>;

  beforeEach(() => {
    repository = new InvestorRepositoryImpl();
    jest.clearAllMocks();
  });

  describe('getInvestors', () => {
    it('should call httpClient.get with correct parameters', async () => {
      // Arrange
      const mockParams = { page: 1, limit: 10 };
      const mockResponse = {
        data: [
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
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      };
      mockHttpClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.getInvestors(mockParams);

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/investors',
        { params: mockParams }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors correctly', async () => {
      // Arrange
      const mockParams = { page: 1, limit: 10 };
      const error = new Error('API Error');
      mockHttpClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(repository.getInvestors(mockParams)).rejects.toThrow('API Error');
    });
  });

  describe('getInvestorById', () => {
    it('should call httpClient.get with correct parameters', async () => {
      // Arrange
      const investorId = '1';
      const mockResponse = {
        data: {
          id: '1',
          wallet_address: '0x1234567890123456789012345678901234567890',
          liquidity_balance: 1000000,
          withdrawn_rewards: 50000,
          preferred_payout_token: 'ETH',
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
        }
      };
      mockHttpClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.getInvestorById({ id: investorId });

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith(`/investors/${investorId}`);
      expect(result).toEqual(mockResponse);
    });

    it('should handle investor not found error', async () => {
      // Arrange
      const investorId = 'nonexistent';
      const error = new Error('Investor not found');
      mockHttpClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(repository.getInvestorById({ id: investorId })).rejects.toThrow('Investor not found');
    });
  });

  describe('createInvestor', () => {
    it('should call httpClient.post with correct parameters', async () => {
      // Arrange
      const mockRequest = {
        wallet_address: '0x1234567890123456789012345678901234567890',
        preferred_payout_token: 'ETH',
      };
      const mockResponse = {
        data: {
          id: '2',
          ...mockRequest,
          liquidity_balance: 0,
          withdrawn_rewards: 0,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
        }
      };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.createInvestor(mockRequest);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('/investors', mockRequest);
      expect(result).toEqual(mockResponse);
    });

    it('should handle validation errors', async () => {
      // Arrange
      const mockRequest = {
        wallet_address: 'invalid-address', // Invalid format
        preferred_payout_token: 'ETH',
      };
      const error = new Error('Validation failed');
      mockHttpClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(repository.createInvestor(mockRequest)).rejects.toThrow('Validation failed');
    });
  });

  describe('updateInvestor', () => {
    it('should call httpClient.patch with correct parameters', async () => {
      // Arrange
      const investorId = '1';
      const mockRequest = {
        preferred_payout_token: 'USDC',
      };
      const mockResponse = {
        data: {
          id: '1',
          wallet_address: '0x1234567890123456789012345678901234567890',
          liquidity_balance: 1000000,
          withdrawn_rewards: 50000,
          preferred_payout_token: 'USDC', // Updated value
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-02T00:00:00Z', // Updated time
          deleted: false,
        }
      };
      mockHttpClient.patch.mockResolvedValue(mockResponse);

      // Act
      const request = { id: investorId, ...mockRequest };
      const result = await repository.updateInvestor(request);

      // Assert
      expect(mockHttpClient.patch).toHaveBeenCalledWith(`/investors/${investorId}`, mockRequest);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteInvestor', () => {
    it('should call httpClient.del with correct parameters', async () => {
      // Arrange
      const investorId = '1';
      mockHttpClient.del.mockResolvedValue({});

      // Act
      const result = await repository.deleteInvestor(investorId);

      // Assert
      expect(mockHttpClient.del).toHaveBeenCalledWith(`/investors/${investorId}`);
      expect(result).toEqual({});
    });
  });

  describe('prepareDepositLiquidity', () => {
    it('should call httpClient.post with correct parameters', async () => {
      // Arrange
      const mockRequest = {
        investor_id: '1',
        amount: 100000000,
      };
      const mockResponse = {
        data: {
          transaction_hash: '0xabcdef...',
          estimated_gas: '50000',
          gas_price: '20',
        }
      };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.prepareDepositLiquidity(mockRequest);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('/investors/prepare-deposit-liquidity', mockRequest);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('prepareWithdrawReward', () => {
    it('should call httpClient.post with correct parameters', async () => {
      // Arrange
      const mockRequest = {
        investor_id: '1',
        amount: 50000000,
      };
      const mockResponse = {
        data: {
          transaction_hash: '0x123456...',
          estimated_gas: '45000',
          gas_price: '22',
        }
      };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.prepareWithdrawReward(mockRequest);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('/investors/prepare-withdraw-reward', mockRequest);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateMePreferredToken', () => {
    it('should call httpClient.patch with correct parameters', async () => {
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
      mockHttpClient.patch.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.updateMePreferredToken(mockRequest);

      // Assert
      expect(mockHttpClient.patch).toHaveBeenCalledWith('/investors/me/preferred-token', mockRequest);
      expect(result).toEqual(mockResponse);
    });
  });
});