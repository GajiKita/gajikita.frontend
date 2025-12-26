// src/modules/employee/usecase/__tests__/implementation/GetEmployees.test.ts
import { GetEmployees } from '../../implementation/GetEmployees';
import { EmployeeRepositoryImpl } from '../../../../repository/implementation/EmployeeRepositoryImpl';
import { GetEmployeesRequest } from '../../../domain/req/GetEmployeesRequest';

describe('GetEmployees Usecase', () => {
  let usecase: GetEmployees;
  let mockRepository: jest.Mocked<EmployeeRepositoryImpl>;

  beforeEach(() => {
    mockRepository = {
      getEmployees: jest.fn(),
    } as any;

    usecase = new GetEmployees(mockRepository as any);
  });

  describe('execute', () => {
    it('should validate input and call repository', async () => {
      // Arrange
      const request: GetEmployeesRequest = { page: 1, limit: 10 };
      const expectedResponse = {
        data: [],
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
      };
      mockRepository.getEmployees.mockResolvedValue(expectedResponse);

      // Act
      const result = await usecase.execute(request);

      // Assert
      expect(mockRepository.getEmployees).toHaveBeenCalledWith(request);
      expect(result).toEqual(expectedResponse);
    });

    it('should handle repository errors', async () => {
      // Arrange
      const request: GetEmployeesRequest = { page: 1, limit: 10 };
      const error = new Error('Repository Error');
      mockRepository.getEmployees.mockRejectedValue(error);

      // Act & Assert
      await expect(usecase.execute(request)).rejects.toThrow('Repository Error');
    });
  });
});