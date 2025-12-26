// src/modules/payroll-cycle/data/__tests__/payroll-cycle.mutation.test.ts
import { renderHook } from '@testing-library/react';
import { useCreatePayrollCycleMutation } from '../payroll-cycle.mutation';

// Mock the API calls directly
jest.mock('../payroll-cycle.mutation', () => ({
  ...jest.requireActual('../payroll-cycle.mutation'),
  useCreatePayrollCycleMutation: jest.fn(),
}));

describe('Payroll Cycle Mutation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCreatePayrollCycleMutation', () => {
    it('should return success on successful API call', () => {
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
          created_at: '2024-01-15T00:00:00Z',
          updated_at: '2024-01-15T00:00:00Z',
          deleted: false,
        }
      };

      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockResolvedValue(mockResponse),
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: mockResponse,
        error: undefined,
      };

      (useCreatePayrollCycleMutation as jest.MockedFunction<typeof useCreatePayrollCycleMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreatePayrollCycleMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });

    it('should handle mutation errors', () => {
      // Arrange
      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockRejectedValue(new Error('API Error')),
        isLoading: false,
        isError: true,
        isSuccess: false,
        data: undefined,
        error: new Error('API Error'),
      };

      (useCreatePayrollCycleMutation as jest.MockedFunction<typeof useCreatePayrollCycleMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreatePayrollCycleMutation());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });
  });
});