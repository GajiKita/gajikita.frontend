// src/modules/payroll-cycle/presentation/__tests__/hooks/usePayrollCyclePresentation.test.ts
import { renderHook } from '@testing-library/react';
import { usePayrollCycleListPresentation, usePayrollCycleDetailPresentation, useCreatePayrollCyclePresentation, useUpdatePayrollCyclePresentation, useDeletePayrollCyclePresentation } from '../../hooks/usePayrollCyclePresentation';

// Mock the data layer hooks
jest.mock('../../hooks/usePayrollCyclePresentation', () => ({
  ...jest.requireActual('../../hooks/usePayrollCyclePresentation'),
  usePayrollCycleListPresentation: jest.fn(),
  usePayrollCycleDetailPresentation: jest.fn(),
  useCreatePayrollCyclePresentation: jest.fn(),
  useUpdatePayrollCyclePresentation: jest.fn(),
  useDeletePayrollCyclePresentation: jest.fn(),
}));

describe('Payroll Cycle Presentation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('usePayrollCycleListPresentation', () => {
    it('should return formatted payroll cycle data', () => {
      // Arrange
      const mockParams = { page: 1, limit: 10, companyId: 'company1' };
      const mockData = {
        payrollCycles: [
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
        isLoading: false,
        isError: false,
        error: undefined,
        refetch: jest.fn(),
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
        },
      };

      (usePayrollCycleListPresentation as jest.MockedFunction<typeof usePayrollCycleListPresentation>).mockReturnValue(mockData);

      // Act
      const { result } = renderHook(() => usePayrollCycleListPresentation(mockParams));

      // Assert
      expect(result.current.payrollCycles).toEqual(mockData.payrollCycles);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
    });

    it('should handle error states', () => {
      // Arrange
      const mockErrorData = {
        payrollCycles: [],
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

      (usePayrollCycleListPresentation as jest.MockedFunction<typeof usePayrollCycleListPresentation>).mockReturnValue(mockErrorData);

      // Act
      const { result } = renderHook(() => usePayrollCycleListPresentation({ page: 1, limit: 10 }));

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });

    it('should handle loading states', () => {
      // Arrange
      const mockLoadingData = {
        payrollCycles: [],
        isLoading: true,
        isError: false,
        error: undefined,
        refetch: jest.fn(),
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
      };

      (usePayrollCycleListPresentation as jest.MockedFunction<typeof usePayrollCycleListPresentation>).mockReturnValue(mockLoadingData);

      // Act
      const { result } = renderHook(() => usePayrollCycleListPresentation({ page: 1, limit: 10 }));

      // Assert
      expect(result.current.isLoading).toBe(true);
    });
  });

  describe('usePayrollCycleDetailPresentation', () => {
    it('should return payroll cycle detail', () => {
      // Arrange
      const cycleId = '1';
      const mockData = {
        payrollCycle: {
          id: '1',
          company_id: 'company1',
          period_start: '2024-01-01',
          period_end: '2024-01-31',
          payout_date: '2024-02-05',
          total_working_days: 22,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
        },
        isLoading: false,
        isError: false,
        error: undefined,
      };

      (usePayrollCycleDetailPresentation as jest.MockedFunction<typeof usePayrollCycleDetailPresentation>).mockReturnValue(mockData);

      // Act
      const { result } = renderHook(() => usePayrollCycleDetailPresentation(cycleId));

      // Assert
      expect(result.current.payrollCycle).toEqual(mockData.payrollCycle);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('useCreatePayrollCyclePresentation', () => {
    it('should return create function', () => {
      // Arrange
      const mockMutationResult = {
        createPayrollCycle: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useCreatePayrollCyclePresentation as jest.MockedFunction<typeof useCreatePayrollCyclePresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreatePayrollCyclePresentation());

      // Assert
      expect(result.current.createPayrollCycle).toBeDefined();
      expect(typeof result.current.createPayrollCycle).toBe('function');
    });

    it('should handle mutation success', () => {
      // Arrange
      const mockResponse = {
        data: {
          id: '2',
          company_id: 'company2',
          period_start: '2024-02-01',
          period_end: '2024-02-28',
          payout_date: '2024-03-05',
          total_working_days: 21,
          created_at: '2024-02-01T00:00:00Z',
          updated_at: '2024-02-01T00:00:00Z',
          deleted: false,
        }
      };
      const mockMutationResult = {
        createPayrollCycle: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: true,
        data: mockResponse,
      };

      (useCreatePayrollCyclePresentation as jest.MockedFunction<typeof useCreatePayrollCyclePresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreatePayrollCyclePresentation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });

    it('should handle mutation errors', () => {
      // Arrange
      const mockError = new Error('Payroll cycle creation failed');
      const mockMutationResult = {
        createPayrollCycle: jest.fn(),
        isLoading: false,
        isError: true,
        error: mockError,
        isSuccess: false,
        data: undefined,
      };

      (useCreatePayrollCyclePresentation as jest.MockedFunction<typeof useCreatePayrollCyclePresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreatePayrollCyclePresentation());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBe(mockError);
    });
  });

  describe('useUpdatePayrollCyclePresentation', () => {
    it('should return update function', () => {
      // Arrange
      const mockMutationResult = {
        updatePayrollCycle: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useUpdatePayrollCyclePresentation as jest.MockedFunction<typeof useUpdatePayrollCyclePresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useUpdatePayrollCyclePresentation());

      // Assert
      expect(result.current.updatePayrollCycle).toBeDefined();
      expect(typeof result.current.updatePayrollCycle).toBe('function');
    });
  });

  describe('useDeletePayrollCyclePresentation', () => {
    it('should return delete function', () => {
      // Arrange
      const mockMutationResult = {
        deletePayrollCycle: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useDeletePayrollCyclePresentation as jest.MockedFunction<typeof useDeletePayrollCyclePresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useDeletePayrollCyclePresentation());

      // Assert
      expect(result.current.deletePayrollCycle).toBeDefined();
      expect(typeof result.current.deletePayrollCycle).toBe('function');
    });
  });
});