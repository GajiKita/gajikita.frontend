// src/modules/payroll-cycle/repository/__tests__/implementation/PayrollCycleRepositoryImpl.test.ts
import { PayrollCycleRepositoryImpl } from '../../implementation/PayrollCycleRepositoryImpl';
import { httpClient } from '@/core/utils/http/httpClient';

// Mock the http client
jest.mock('@/core/utils/http/httpClient');

describe('PayrollCycleRepositoryImpl', () => {
  let repository: PayrollCycleRepositoryImpl;
  const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>;

  beforeEach(() => {
    repository = new PayrollCycleRepositoryImpl();
    jest.clearAllMocks();
  });

  describe('getPayrollCycles', () => {
    it('should call httpClient.get with correct parameters', async () => {
      // Arrange
      const mockParams = { page: 1, limit: 10 };
      const mockResponse = {
        data: [
          {
            id: '1',
            company_id: 'company1',
            period_start: '2024-01-01',
            period_end: '2024-01-31',
            payout_date: '2024-02-05',
            total_working_days: 22,
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
      const result = await repository.getPayrollCycles(mockParams);

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/payroll-cycles',
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
      await expect(repository.getPayrollCycles(mockParams)).rejects.toThrow('API Error');
    });
  });

  describe('getPayrollCycleById', () => {
    it('should call httpClient.get with correct parameters', async () => {
      // Arrange
      const cycleId = '1';
      const mockResponse = {
        data: {
          id: '1',
          company_id: 'company1',
          period_start: '2024-01-01',
          period_end: '2024-01-31',
          payout_date: '2024-02-05',
          total_working_days: 22,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
        }
      };
      mockHttpClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.getPayrollCycleById({ id: cycleId });

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith(`/payroll-cycles/${cycleId}`);
      expect(result).toEqual(mockResponse);
    });

    it('should handle payroll cycle not found error', async () => {
      // Arrange
      const cycleId = 'nonexistent';
      const error = new Error('Payroll cycle not found');
      mockHttpClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(repository.getPayrollCycleById({ id: cycleId })).rejects.toThrow('Payroll cycle not found');
    });
  });

  describe('createPayrollCycle', () => {
    it('should call httpClient.post with correct parameters', async () => {
      // Arrange
      const mockRequest = {
        company_id: 'company1',
        period_start: '2024-02-01',
        period_end: '2024-02-28',
        payout_date: '2024-03-05',
        total_working_days: 21,
      };
      const mockResponse = {
        data: {
          id: '2',
          ...mockRequest,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
        }
      };
      mockHttpClient.post.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.createPayrollCycle(mockRequest);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('/payroll-cycles', mockRequest);
      expect(result).toEqual(mockResponse);
    });

    it('should handle validation errors', async () => {
      // Arrange
      const mockRequest = {
        company_id: '', // Invalid - empty company ID
        period_start: '2024-02-01',
        period_end: '2024-01-31', // Invalid - end date before start date
        payout_date: '2024-03-05',
        total_working_days: -5, // Invalid - negative days
      };
      const error = new Error('Validation failed');
      mockHttpClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(repository.createPayrollCycle(mockRequest)).rejects.toThrow('Validation failed');
    });
  });

  describe('updatePayrollCycle', () => {
    it('should call httpClient.patch with correct parameters', async () => {
      // Arrange
      const cycleId = '1';
      const mockRequest = {
        payout_date: '2024-02-10',
        total_working_days: 23,
      };
      const mockResponse = {
        data: {
          id: '1',
          company_id: 'company1',
          period_start: '2024-01-01',
          period_end: '2024-01-31',
          payout_date: '2024-02-10', // Updated value
          total_working_days: 23, // Updated value
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-02T00:00:00Z', // Updated time
          deleted: false,
        }
      };
      mockHttpClient.patch.mockResolvedValue(mockResponse);

      // Act
      const request = { id: cycleId, ...mockRequest };
      const result = await repository.updatePayrollCycle(request);

      // Assert
      expect(mockHttpClient.patch).toHaveBeenCalledWith(`/payroll-cycles/${cycleId}`, mockRequest);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deletePayrollCycle', () => {
    it('should call httpClient.del with correct parameters', async () => {
      // Arrange
      const cycleId = '1';
      mockHttpClient.del.mockResolvedValue({});

      // Act
      const result = await repository.deletePayrollCycle(cycleId);

      // Assert
      expect(mockHttpClient.del).toHaveBeenCalledWith(`/payroll-cycles/${cycleId}`);
      expect(result).toEqual({});
    });
  });
});