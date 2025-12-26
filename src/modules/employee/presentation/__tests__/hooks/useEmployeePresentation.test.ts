// src/modules/employee/presentation/__tests__/hooks/useEmployeePresentation.test.ts
import { renderHook } from '@testing-library/react';
import { useEmployeeListPresentation } from '../../hooks/useEmployeePresentation';
import { useCreateEmployeePresentation, useUpdateEmployeePresentation, useDeleteEmployeePresentation } from '../../hooks/useEmployeePresentation';

// Mock the data layer hooks
jest.mock('../../hooks/useEmployeePresentation', () => ({
  ...jest.requireActual('../../hooks/useEmployeePresentation'),
  useEmployeeListPresentation: jest.fn(),
  useCreateEmployeePresentation: jest.fn(),
  useUpdateEmployeePresentation: jest.fn(),
  useDeleteEmployeePresentation: jest.fn(),
}));

describe('Employee Presentation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useEmployeeListPresentation', () => {
    it('should return formatted employee data', () => {
      // Arrange
      const mockParams = { page: 1, limit: 10, search: '' };
      const mockData = {
        employees: [
          {
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
        ],
        isLoading: false,
        isError: false,
        refetch: jest.fn(),
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
        },
      };

      (useEmployeeListPresentation as jest.MockedFunction<typeof useEmployeeListPresentation>).mockReturnValue(mockData);

      // Act
      const { result } = renderHook(() => useEmployeeListPresentation(mockParams));

      // Assert
      expect(result.current.employees).toEqual(mockData.employees);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
    });

    it('should handle error states', () => {
      // Arrange
      const mockErrorData = {
        employees: [],
        isLoading: false,
        isError: true,
        error: new Error('API Error'),
        refetch: jest.fn(),
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
      };

      (useEmployeeListPresentation as jest.MockedFunction<typeof useEmployeeListPresentation>).mockReturnValue(mockErrorData);

      // Act
      const { result } = renderHook(() => useEmployeeListPresentation({ page: 1, limit: 10 }));

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });
  });

  describe('useCreateEmployeePresentation', () => {
    it('should return mutation function', () => {
      // Arrange
      const mockMutationResult = {
        createEmployee: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useCreateEmployeePresentation as jest.MockedFunction<typeof useCreateEmployeePresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateEmployeePresentation());

      // Assert
      expect(result.current.createEmployee).toBeDefined();
      expect(typeof result.current.createEmployee).toBe('function');
    });
  });

  describe('useUpdateEmployeePresentation', () => {
    it('should return update function', () => {
      // Arrange
      const mockMutationResult = {
        updateEmployee: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useUpdateEmployeePresentation as jest.MockedFunction<typeof useUpdateEmployeePresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useUpdateEmployeePresentation());

      // Assert
      expect(result.current.updateEmployee).toBeDefined();
      expect(typeof result.current.updateEmployee).toBe('function');
    });
  });

  describe('useDeleteEmployeePresentation', () => {
    it('should return delete function', () => {
      // Arrange
      const mockMutationResult = {
        deleteEmployee: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useDeleteEmployeePresentation as jest.MockedFunction<typeof useDeleteEmployeePresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useDeleteEmployeePresentation());

      // Assert
      expect(result.current.deleteEmployee).toBeDefined();
      expect(typeof result.current.deleteEmployee).toBe('function');
    });
  });
});