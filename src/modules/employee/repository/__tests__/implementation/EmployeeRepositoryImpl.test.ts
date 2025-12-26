// src/modules/employee/repository/__tests__/implementation/EmployeeRepositoryImpl.test.ts
import { EmployeeRepositoryImpl } from '../../implementation/EmployeeRepositoryImpl';
import { httpClient } from '@/core/utils/http/httpClient';

// Mock the http client
jest.mock('@/core/utils/http/httpClient');

describe('EmployeeRepositoryImpl', () => {
  let repository: EmployeeRepositoryImpl;
  const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>;

  beforeEach(() => {
    repository = new EmployeeRepositoryImpl();
    jest.clearAllMocks();
  });

  describe('getEmployees', () => {
    it('should call httpClient.get with correct parameters', async () => {
      // Arrange
      const params = { page: 1, limit: 10 };
      const expectedResponse = {
        data: [],
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
      };
      mockHttpClient.get.mockResolvedValue(expectedResponse);

      // Act
      const result = await repository.getEmployees(params);

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith(
        '/employees',
        { params }
      );
      expect(result).toEqual(expectedResponse);
    });

    it('should handle API errors correctly', async () => {
      // Arrange
      const params = { page: 1, limit: 10 };
      const error = new Error('API Error');
      mockHttpClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(repository.getEmployees(params)).rejects.toThrow('API Error');
    });
  });

  describe('getEmployeeById', () => {
    it('should call httpClient.get with correct parameters', async () => {
      // Arrange
      const request = { id: '1' };
      const expectedResponse = {
        data: {
          id: '1',
          user_id: 'user1',
          company_id: 'company1',
          employee_number: 'EMP001',
          position: 'Software Engineer',
          base_salary: 10000000,
          wallet_address: '0x1234567890123456789012345678901234567890',
          preferred_payout_token: 'ETH',
          status: 'active',
          sbt_token_id: null,
          employed_started: '2024-01-01',
          employed_ended: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
        }
      };
      mockHttpClient.get.mockResolvedValue(expectedResponse);

      // Act
      const result = await repository.getEmployeeById(request);

      // Assert
      expect(mockHttpClient.get).toHaveBeenCalledWith(`/employees/${request.id}`);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('createEmployee', () => {
    it('should call httpClient.post with correct parameters', async () => {
      // Arrange
      const request = {
        user_id: 'user1',
        company_id: 'company1',
        employee_number: 'EMP001',
        position: 'Software Engineer',
        base_salary: 10000000,
        wallet_address: '0x1234567890123456789012345678901234567890',
        status: 'active',
      };
      const expectedResponse = {
        data: {
          id: '1',
          ...request,
          preferred_payout_token: null,
          sbt_token_id: null,
          employed_started: null,
          employed_ended: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
        }
      };
      mockHttpClient.post.mockResolvedValue(expectedResponse);

      // Act
      const result = await repository.createEmployee(request);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith('/employees', request);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('updateEmployee', () => {
    it('should call httpClient.patch with correct parameters', async () => {
      // Arrange
      const request = {
        id: '1',
        position: 'Senior Software Engineer',
        base_salary: 12000000,
      };
      const expectedResponse = {
        data: {
          id: '1',
          user_id: 'user1',
          company_id: 'company1',
          employee_number: 'EMP001',
          position: 'Senior Software Engineer',
          base_salary: 12000000,
          wallet_address: '0x1234567890123456789012345678901234567890',
          preferred_payout_token: null,
          status: 'active',
          sbt_token_id: null,
          employed_started: null,
          employed_ended: null,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-02T00:00:00Z',
          deleted: false,
        }
      };
      mockHttpClient.patch.mockResolvedValue(expectedResponse);

      // Act
      const result = await repository.updateEmployee(request);

      // Assert
      expect(mockHttpClient.patch).toHaveBeenCalledWith(`/employees/${request.id}`, {
        position: 'Senior Software Engineer',
        base_salary: 12000000,
      });
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('deleteEmployee', () => {
    it('should call httpClient.del with correct parameters', async () => {
      // Arrange
      const id = '1';
      const expectedResponse = {};
      mockHttpClient.del.mockResolvedValue(expectedResponse);

      // Act
      const result = await repository.deleteEmployee(id);

      // Assert
      expect(mockHttpClient.del).toHaveBeenCalledWith(`/employees/${id}`);
      expect(result).toEqual(expectedResponse);
    });
  });
});