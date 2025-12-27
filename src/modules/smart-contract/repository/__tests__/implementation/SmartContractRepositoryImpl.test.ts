// src/modules/smart-contract/repository/__tests__/implementation/SmartContractRepositoryImpl.test.ts
import { SmartContractRepositoryImpl } from '../../implementation/SmartContractRepositoryImpl';
import { httpClient } from '@/core/utils/http/httpClient';

// Mock the http client
jest.mock('@/core/utils/http/httpClient');

describe('SmartContractRepositoryImpl', () => {
  let repository: SmartContractRepositoryImpl;
  const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>;

  beforeEach(() => {
    repository = new SmartContractRepositoryImpl();
    jest.clearAllMocks();
  });

  describe('getSmartContracts', () => {
    it('should call httpClient.get with correct parameters', async () => {
      // Arrange
      const mockParams = { page: 1, limit: 10 };
      const mockResponse = {
        data: [
          {
            id: '1',
            name: 'Payroll Contract',
            address: '0x1234567890123456789012345678901234567890',
            abi: '{}',
            bytecode: '0x...',
            deployed_at: '2024-01-01T00:00:00Z',
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
      const result = await repository.getSmartContracts(mockParams);

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/smart-contracts',
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
      await expect(repository.getSmartContracts(mockParams)).rejects.toThrow('API Error');
    });
  });

  describe('getSmartContractById', () => {
    it('should call httpClient.get with correct parameters', async () => {
      // Arrange
      const contractId = '1';
      const mockResponse = {
        data: {
          id: '1',
          name: 'Payroll Contract',
          address: '0x1234567890123456789012345678901234567890',
          abi: '{}',
          bytecode: '0x...',
          deployed_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
        }
      };
      mockHttpClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.getSmartContractById({ id: contractId });

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith(`/smart-contracts/${contractId}`);
      expect(result).toEqual(mockResponse);
    });

    it('should handle smart contract not found error', async () => {
      // Arrange
      const contractId = 'nonexistent';
      const error = new Error('Smart contract not found');
      mockHttpClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(repository.getSmartContractById({ id: contractId })).rejects.toThrow('Smart contract not found');
    });
  });

  describe('createSmartContract', () => {
    it('should call httpClient.post with correct parameters', async () => {
      // Arrange
      const mockRequest = {
        name: 'New Payroll Contract',
        abi: '{}',
        bytecode: '0x...',
        deployed_at: '2024-01-01T00:00:00Z',
      };
      const mockResponse = {
        data: {
          id: '2',
          address: '0xabcdef123456789012345678901234567890',
          ...mockRequest,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
        }
      };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.createSmartContract(mockRequest);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('/smart-contracts', mockRequest);
      expect(result).toEqual(mockResponse);
    });

    it('should handle validation errors', async () => {
      // Arrange
      const mockRequest = {
        name: '', // Invalid - empty name
        abi: null, // Invalid - null ABI
        bytecode: '0x', // Invalid - too short bytecode
      };
      const error = new Error('Validation failed');
      mockHttpClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(repository.createSmartContract(mockRequest)).rejects.toThrow('Validation failed');
    });
  });

  describe('updateSmartContract', () => {
    it('should call httpClient.patch with correct parameters', async () => {
      // Arrange
      const contractId = '1';
      const mockRequest = {
        name: 'Updated Contract Name',
        abi: '{"updated": true}',
      };
      const mockResponse = {
        data: {
          id: '1',
          name: 'Updated Contract Name', // Updated value
          address: '0x1234567890123456789012345678901234567890',
          abi: '{"updated": true}', // Updated value
          bytecode: '0x...', // Unchanged
          deployed_at: '2024-01-01T00:00:00Z', // Unchanged
          created_at: '2024-01-01T00:00:00Z', // Unchanged
          updated_at: '2024-01-02T00:00:00Z', // Updated time
          deleted: false, // Unchanged
        }
      };
      mockHttpClient.patch.mockResolvedValue(mockResponse);

      // Act
      const request = { id: contractId, ...mockRequest };
      const result = await repository.updateSmartContract(request);

      // Assert
      expect(mockHttpClient.patch).toHaveBeenCalledWith(`/smart-contracts/${contractId}`, mockRequest);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteSmartContract', () => {
    it('should call httpClient.del with correct parameters', async () => {
      // Arrange
      const contractId = '1';
      mockHttpClient.del.mockResolvedValue({});

      // Act
      const result = await repository.deleteSmartContract(contractId);

      // Assert
      expect(mockHttpClient.del).toHaveBeenCalledWith(`/smart-contracts/${contractId}`);
      expect(result).toEqual({});
    });
  });
});