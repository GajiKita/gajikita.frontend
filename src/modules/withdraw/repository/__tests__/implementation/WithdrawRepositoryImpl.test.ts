// src/modules/withdraw/repository/__tests__/implementation/WithdrawRepositoryImpl.test.ts
import { WithdrawRepositoryImpl } from '../../implementation/WithdrawRepositoryImpl';
import { httpClient } from '@/core/utils/http/httpClient';

// Mock the http client
jest.mock('@/core/utils/http/httpClient');

describe('WithdrawRepositoryImpl', () => {
  let repository: WithdrawRepositoryImpl;
  const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>;

  beforeEach(() => {
    repository = new WithdrawRepositoryImpl();
    jest.clearAllMocks();
  });

  describe('simulateWithdraw', () => {
    it('should call httpClient.get with correct parameters', async () => {
      // Arrange
      const mockParams = {
        employee_id: 'emp1',
        payroll_cycle_id: 'cycle1',
        requested_amount: 5000000,
      };
      const mockResponse = {
        data: {
          simulated_amount: 4750000, // After fees
          fees: {
            platform_fee: 150000, // 3% of 5M
            gas_fee: 100000,
          },
          estimated_completion_time: '24h',
          token_rate: 0.000000000000000001, // ETH per IDR
        }
      };
      mockHttpClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.simulateWithdraw(mockParams);

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/withdraws/simulate',
        { params: mockParams }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors correctly', async () => {
      // Arrange
      const mockParams = {
        employee_id: 'emp1',
        payroll_cycle_id: 'cycle1',
        requested_amount: 5000000,
      };
      const error = new Error('API Error');
      mockHttpClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(repository.simulateWithdraw(mockParams)).rejects.toThrow('API Error');
    });
  });

  describe('createWithdrawRequest', () => {
    it('should call httpClient.post with correct parameters', async () => {
      // Arrange
      const mockRequest = {
        employee_id: 'emp1',
        payroll_cycle_id: 'cycle1',
        requested_amount: 5000000,
        reason: 'Emergency funds',
      };
      const mockResponse = {
        data: {
          id: 'withdraw1',
          employee_id: 'emp1',
          payroll_cycle_id: 'cycle1',
          requested_amount: 5000000,
          processed_amount: 4750000, // After fees
          status: 'pending',
          transaction_hash: null,
          requested_at: '2024-01-15T10:00:00Z',
          processed_at: null,
          completed_at: null,
        }
      };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.createWithdrawRequest(mockRequest);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('/withdraws/request', mockRequest);
      expect(result).toEqual(mockResponse);
    });

    it('should handle validation errors', async () => {
      // Arrange
      const mockRequest = {
        employee_id: 'invalid-employee-id', // May not exist
        payroll_cycle_id: 'invalid-cycle-id', // May not exist
        requested_amount: -1000000, // Invalid - negative amount
        reason: '', // May be required
      };
      const error = new Error('Validation failed');
      mockHttpClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(repository.createWithdrawRequest(mockRequest)).rejects.toThrow('Validation failed');
    });
  });

  describe('getWithdrawRequests', () => {
    it('should call httpClient.get with correct parameters', async () => {
      // Arrange
      const mockParams = { page: 1, limit: 10, employee_id: 'emp1' };
      const mockResponse = {
        data: [
          {
            id: '1',
            employee_id: 'emp1',
            payroll_cycle_id: 'cycle1',
            requested_amount: 5000000,
            processed_amount: 4750000,
            status: 'completed',
            transaction_hash: '0x1234567890abcdef',
            requested_at: '2024-01-15T10:00:00Z',
            processed_at: '2024-01-15T12:00:00Z',
            completed_at: '2024-01-15T14:00:00Z',
          }
        ],
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      };
      mockHttpClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.getWithdrawRequests(mockParams);

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/withdraws',
        { params: mockParams }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle pagination parameters correctly', async () => {
      // Arrange
      const mockParams = { page: 2, limit: 20, status: 'pending' };
      const mockResponse = { data: [], page: 2, limit: 20, total: 0, totalPages: 0 };
      mockHttpClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.getWithdrawRequests(mockParams);

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/withdraws',
        { params: mockParams }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getWithdrawRequestById', () => {
    it('should call httpClient.get with correct parameters', async () => {
      // Arrange
      const requestId = '1';
      const mockResponse = {
        data: {
          id: '1',
          employee_id: 'emp1',
          payroll_cycle_id: 'cycle1',
          requested_amount: 5000000,
          processed_amount: 4750000,
          status: 'pending',
          transaction_hash: null,
          requested_at: '2024-01-15T10:00:00Z',
          processed_at: null,
          completed_at: null,
        }
      };
      mockHttpClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.getWithdrawRequestById({ id: requestId });

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith(`/withdraws/${requestId}`);
      expect(result).toEqual(mockResponse);
    });

    it('should handle withdraw request not found error', async () => {
      // Arrange
      const requestId = 'nonexistent';
      const error = new Error('Withdraw request not found');
      mockHttpClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(repository.getWithdrawRequestById({ id: requestId })).rejects.toThrow('Withdraw request not found');
    });
  });

  describe('updateWithdrawRequest', () => {
    it('should call httpClient.patch with correct parameters', async () => {
      // Arrange
      const requestId = '1';
      const mockRequest = {
        status: 'approved',
        processed_amount: 4750000,
      };
      const mockResponse = {
        data: {
          id: '1',
          employee_id: 'emp1',
          payroll_cycle_id: 'cycle1',
          requested_amount: 5000000,
          processed_amount: 4750000, // Updated value
          status: 'approved', // Updated value
          transaction_hash: null,
          requested_at: '2024-01-15T10:00:00Z',
          processed_at: '2024-01-15T12:00:00Z', // Updated
          completed_at: null,
        }
      };
      mockHttpClient.patch.mockResolvedValue(mockResponse);

      // Act
      const request = { id: requestId, ...mockRequest };
      const result = await repository.updateWithdrawRequest(request);

      // Assert
      expect(mockHttpClient.patch).toHaveBeenCalledWith(`/withdraws/${requestId}`, mockRequest);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteWithdrawRequest', () => {
    it('should call httpClient.del with correct parameters', async () => {
      // Arrange
      const requestId = '1';
      mockHttpClient.del.mockResolvedValue({});

      // Act
      const result = await repository.deleteWithdrawRequest(requestId);

      // Assert
      expect(mockHttpClient.del).toHaveBeenCalledWith(`/withdraws/${requestId}`);
      expect(result).toEqual({});
    });
  });
});