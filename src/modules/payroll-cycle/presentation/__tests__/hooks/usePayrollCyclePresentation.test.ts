import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { 
  usePayrollCyclesPresentation,
  usePayrollCycleDetailPresentation,
  useCreatePayrollCyclePresentation,
  useUpdatePayrollCyclePresentation,
  useDeletePayrollCyclePresentation
} from '../hooks/usePayrollCyclePresentation';
import { PayrollCycleRepositoryImpl } from '../../repository/implementation/PayrollCycleRepositoryImpl';
import { GetPayrollCycles } from '../../usecase/implementation/GetPayrollCycles';
import { GetPayrollCycleById } from '../../usecase/implementation/GetPayrollCycleById';
import { CreatePayrollCycle } from '../../usecase/implementation/CreatePayrollCycle';
import { UpdatePayrollCycle } from '../../usecase/implementation/UpdatePayrollCycle';
import { DeletePayrollCycle } from '../../usecase/implementation/DeletePayrollCycle';

// Mock the repository
jest.mock('../../repository/implementation/PayrollCycleRepositoryImpl');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('Payroll Cycle Presentation Hooks Tests', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  describe('usePayrollCyclesPresentation', () => {
    it('should return correct values', async () => {
      const mockResponse = {
        payroll_cycles: [
          {
            id: 'pc-123',
            company_id: 'c-456',
            period_start: '2025-01-01',
            period_end: '2025-01-31',
            payout_date: '2025-02-05',
            total_working_days: 22,
            status: 'ACTIVE',
          },
        ],
      };

      const mockRepository = {
        getPayrollCycles: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as PayrollCycleRepositoryImpl;

      (PayrollCycleRepositoryImpl as jest.MockedClass<typeof PayrollCycleRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => usePayrollCyclesPresentation({ companyId: 'c-456' }),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.payrollCycles).toEqual(mockResponse.payroll_cycles);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
        expect(result.current.error).toBeNull();
        expect(typeof result.current.refetch).toBe('function');
      });

      expect(mockRepository.getPayrollCycles).toHaveBeenCalledWith({ companyId: 'c-456' });
    });

    it('should handle error when fetching payroll cycles', async () => {
      const mockError = new Error('Failed to fetch payroll cycles');

      const mockRepository = {
        getPayrollCycles: jest.fn().mockRejectedValue(mockError),
      } as unknown as PayrollCycleRepositoryImpl;

      (PayrollCycleRepositoryImpl as jest.MockedClass<typeof PayrollCycleRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => usePayrollCyclesPresentation({}),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });

  describe('usePayrollCycleDetailPresentation', () => {
    it('should return correct values', async () => {
      const mockId = 'pc-123';
      const mockResponse = {
        id: 'pc-123',
        company_id: 'c-456',
        period_start: '2025-01-01',
        period_end: '2025-01-31',
        payout_date: '2025-02-05',
        total_working_days: 22,
        status: 'ACTIVE',
      };

      const mockRepository = {
        getPayrollCycleById: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as PayrollCycleRepositoryImpl;

      (PayrollCycleRepositoryImpl as jest.MockedClass<typeof PayrollCycleRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => usePayrollCycleDetailPresentation(mockId),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.payrollCycle).toEqual(mockResponse);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
        expect(result.current.error).toBeNull();
      });

      expect(mockRepository.getPayrollCycleById).toHaveBeenCalledWith({ id: mockId });
    });
  });

  describe('useCreatePayrollCyclePresentation', () => {
    it('should return correct values', async () => {
      const mockRequest = {
        company_id: 'c-456',
        period_start: '2025-01-01',
        period_end: '2025-01-31',
        payout_date: '2025-02-05',
        total_working_days: 22,
      };
      const mockResponse = {
        id: 'pc-789',
        ...mockRequest,
        status: 'ACTIVE',
      };

      const mockRepository = {
        createPayrollCycle: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as PayrollCycleRepositoryImpl;

      (PayrollCycleRepositoryImpl as jest.MockedClass<typeof PayrollCycleRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useCreatePayrollCyclePresentation(),
        { wrapper }
      );

      result.current.createPayrollCycle(mockRequest);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockRepository.createPayrollCycle).toHaveBeenCalledWith(mockRequest);
    });
  });

  describe('useUpdatePayrollCyclePresentation', () => {
    it('should return correct values', async () => {
      const mockId = 'pc-123';
      const mockRequest = {
        period_start: '2025-02-01',
        period_end: '2025-02-28',
        payout_date: '2025-03-05',
        total_working_days: 21,
      };
      const mockResponse = {
        id: 'pc-123',
        company_id: 'c-456',
        ...mockRequest,
        status: 'ACTIVE',
      };

      const mockRepository = {
        updatePayrollCycle: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as PayrollCycleRepositoryImpl;

      (PayrollCycleRepositoryImpl as jest.MockedClass<typeof PayrollCycleRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useUpdatePayrollCyclePresentation(),
        { wrapper }
      );

      result.current.updatePayrollCycle({ id: mockId, ...mockRequest });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockRepository.updatePayrollCycle).toHaveBeenCalledWith({ id: mockId, ...mockRequest });
    });
  });

  describe('useDeletePayrollCyclePresentation', () => {
    it('should return correct values', async () => {
      const mockId = 'pc-123';

      const mockRepository = {
        deletePayrollCycle: jest.fn().mockResolvedValue(undefined),
      } as unknown as PayrollCycleRepositoryImpl;

      (PayrollCycleRepositoryImpl as jest.MockedClass<typeof PayrollCycleRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useDeletePayrollCyclePresentation(),
        { wrapper }
      );

      result.current.deletePayrollCycle(mockId);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockRepository.deletePayrollCycle).toHaveBeenCalledWith(mockId);
    });
  });
});