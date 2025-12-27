// src/modules/company/repository/__tests__/implementation/CompanyRepositoryImpl.test.ts
import { CompanyRepositoryImpl } from '../../implementation/CompanyRepositoryImpl';
import { httpClient } from '@/core/utils/http/httpClient';

// Mock the http client
jest.mock('@/core/utils/http/httpClient');

describe('CompanyRepositoryImpl', () => {
  let repository: CompanyRepositoryImpl;
  const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>;

  beforeEach(() => {
    repository = new CompanyRepositoryImpl();
    jest.clearAllMocks();
  });

  describe('getCompanies', () => {
    it('should call httpClient.get with correct parameters', async () => {
      // Arrange
      const mockParams = { page: 1, limit: 10 };
      const mockResponse = {
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
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      };
      mockHttpClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.getCompanies(mockParams);

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/companies',
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
      await expect(repository.getCompanies(mockParams)).rejects.toThrow('API Error');
    });
  });

  describe('getCompanyById', () => {
    it('should call httpClient.get with correct parameters', async () => {
      // Arrange
      const companyId = '1';
      const mockResponse = {
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
      mockHttpClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.getCompanyById({ id: companyId });

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith(`/companies/${companyId}`);
      expect(result).toEqual(mockResponse);
    });

    it('should handle company not found error', async () => {
      // Arrange
      const companyId = 'nonexistent';
      const error = new Error('Company not found');
      mockHttpClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(repository.getCompanyById({ id: companyId })).rejects.toThrow('Company not found');
    });
  });

  describe('createCompany', () => {
    it('should call httpClient.post with correct parameters', async () => {
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
          id: '2',
          ...mockRequest,
          reward_balance: 0,
          withdrawn_rewards: 0,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
        }
      };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.createCompany(mockRequest);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('/companies', mockRequest);
      expect(result).toEqual(mockResponse);
    });

    it('should handle validation errors', async () => {
      // Arrange
      const mockRequest = {
        name: '', // Invalid - empty name
        address: 'Address',
        wallet_address: '0x...',
      };
      const error = new Error('Validation failed');
      mockHttpClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(repository.createCompany(mockRequest)).rejects.toThrow('Validation failed');
    });
  });

  describe('updateCompany', () => {
    it('should call httpClient.patch with correct parameters', async () => {
      // Arrange
      const companyId = '1';
      const mockRequest = {
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
          updated_at: '2024-01-02T00:00:00Z', // Updated time
          deleted: false,
        }
      };
      mockHttpClient.patch.mockResolvedValue(mockResponse);

      // Act
      const request = { id: companyId, ...mockRequest };
      const result = await repository.updateCompany(request);

      // Assert
      expect(mockHttpClient.patch).toHaveBeenCalledWith(`/companies/${companyId}`, mockRequest);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteCompany', () => {
    it('should call httpClient.del with correct parameters', async () => {
      // Arrange
      const companyId = '1';
      mockHttpClient.del.mockResolvedValue({});

      // Act
      const result = await repository.deleteCompany(companyId);

      // Assert
      expect(mockHttpClient.del).toHaveBeenCalledWith(`/companies/${companyId}`);
      expect(result).toEqual({});
    });
  });

  describe('prepareLockLiquidity', () => {
    it('should call httpClient.post with correct parameters', async () => {
      // Arrange
      const mockRequest = {
        company_id: '1',
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
      const result = await repository.prepareLockLiquidity(mockRequest);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('/companies/prepare-lock-liquidity', mockRequest);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('prepareWithdrawReward', () => {
    it('should call httpClient.post with correct parameters', async () => {
      // Arrange
      const mockRequest = {
        company_id: '1',
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
      expect(mockHttpClient.post).toHaveBeenCalledWith('/companies/prepare-withdraw-reward', mockRequest);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updatePreferredToken', () => {
    it('should call httpClient.patch with correct parameters', async () => {
      // Arrange
      const companyId = '1';
      const mockRequest = {
        token_address: 'USDC',
      };
      const mockResponse = {
        data: {
          success: true,
          message: 'Preferred token updated successfully',
        }
      };
      mockHttpClient.patch.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.updatePreferredToken(companyId, mockRequest);

      // Assert
      expect(mockHttpClient.patch).toHaveBeenCalledWith(`/companies/${companyId}/preferred-token`, mockRequest);
      expect(result).toEqual(mockResponse);
    });
  });
});