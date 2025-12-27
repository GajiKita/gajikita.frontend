import { GetEmployeesByCompany } from '../../implementation/GetEmployeesByCompany';
import { GetEmployeesByMyCompany } from '../../implementation/GetEmployeesByMyCompany';
import type { EmployeeRepository } from '../../repository/interface/EmployeeRepository';

// Mock repository
const mockRepository: jest.Mocked<EmployeeRepository> = {
  createEmployee: jest.fn(),
  getEmployees: jest.fn(),
  getEmployeesByCompany: jest.fn(),
  getEmployeesByMyCompany: jest.fn(),
  getEmployeeById: jest.fn(),
  updateEmployee: jest.fn(),
  deleteEmployee: jest.fn(),
  updateMePreferredToken: jest.fn(),
};

describe('Employee Usecase Tests', () => {
  describe('GetEmployeesByCompany', () => {
    it('should call repository with correct parameters', async () => {
      const usecase = new GetEmployeesByCompany(mockRepository);
      const mockCompanyId = 'company-123';
      const mockResponse = {
        employees: [
          {
            id: 'emp-1',
            user_id: 'user-1',
            company_id: 'company-123',
            employee_number: 'EMP001',
            position: 'Developer',
            base_salary: 5000,
            wallet_address: '0x123...',
            status: 'ACTIVE',
            sbt_token_id: 'sbt-1',
            employed_started: '2023-01-01',
            employed_ended: '2025-12-31',
          },
        ],
      };

      mockRepository.getEmployeesByCompany.mockResolvedValue(mockResponse);

      const result = await usecase.execute(mockCompanyId);

      expect(mockRepository.getEmployeesByCompany).toHaveBeenCalledWith(mockCompanyId);
      expect(result).toEqual(mockResponse);
    });

    it('should handle repository error', async () => {
      const usecase = new GetEmployeesByCompany(mockRepository);
      const mockCompanyId = 'company-123';
      const mockError = new Error('Repository error');

      mockRepository.getEmployeesByCompany.mockRejectedValue(mockError);

      await expect(usecase.execute(mockCompanyId)).rejects.toThrow(mockError);
    });
  });

  describe('GetEmployeesByMyCompany', () => {
    it('should call repository without parameters', async () => {
      const usecase = new GetEmployeesByMyCompany(mockRepository);
      const mockResponse = {
        employees: [
          {
            id: 'emp-1',
            user_id: 'user-1',
            company_id: 'company-123',
            employee_number: 'EMP001',
            position: 'Developer',
            base_salary: 5000,
            wallet_address: '0x123...',
            status: 'ACTIVE',
            sbt_token_id: 'sbt-1',
            employed_started: '2023-01-01',
            employed_ended: '2025-12-31',
          },
        ],
      };

      mockRepository.getEmployeesByMyCompany.mockResolvedValue(mockResponse);

      const result = await usecase.execute();

      expect(mockRepository.getEmployeesByMyCompany).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });

    it('should handle repository error', async () => {
      const usecase = new GetEmployeesByMyCompany(mockRepository);
      const mockError = new Error('Repository error');

      mockRepository.getEmployeesByMyCompany.mockRejectedValue(mockError);

      await expect(usecase.execute()).rejects.toThrow(mockError);
    });
  });
});