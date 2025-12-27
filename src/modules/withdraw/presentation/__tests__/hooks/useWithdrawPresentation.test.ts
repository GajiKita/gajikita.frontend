import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import {
  useWithdrawsPresentation,
  useWithdrawDetailPresentation,
  useCreateWithdrawPresentation,
  useExecuteWithdrawPresentation
} from '../../hooks/useWithdrawPresentation';
import { WithdrawRepositoryImpl } from '../../../repository/implementation/WithdrawRepositoryImpl';

// Mock the repository
jest.mock('../../../repository/implementation/WithdrawRepositoryImpl');

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

describe('Withdraw Presentation Hooks Tests', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  describe('useWithdrawsPresentation', () => {
    it('should return correct values', async () => {
      const mockEmployeeId = 'emp-123';
      const mockResponse = {
        withdraw_requests: [
          {
            id: 'wr-123',
            employee_id: 'emp-123',
            payroll_cycle_id: 'pc-456',
            requested_amount: 1000,
            status: 'PENDING',
            created_at: '2025-01-15T10:00:00Z',
          },
        ],
      };

      const mockRepository = {
        getWithdrawRequests: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as WithdrawRepositoryImpl;

      (WithdrawRepositoryImpl as jest.MockedClass<typeof WithdrawRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useWithdrawsPresentation({ employeeId: mockEmployeeId }),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.withdraws).toEqual(mockResponse.withdraw_requests);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
        expect(result.current.error).toBeNull();
        expect(typeof result.current.refetch).toBe('function');
      });

      expect(mockRepository.getWithdrawRequests).toHaveBeenCalledWith({ employee_id: mockEmployeeId });
    });

    it('should handle error when fetching withdraws', async () => {
      const mockEmployeeId = 'emp-123';
      const mockError = new Error('Failed to fetch withdraw requests');

      const mockRepository = {
        getWithdrawRequests: jest.fn().mockRejectedValue(mockError),
      } as unknown as WithdrawRepositoryImpl;

      (WithdrawRepositoryImpl as jest.MockedClass<typeof WithdrawRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useWithdrawsPresentation({ employeeId: mockEmployeeId }),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });

  describe('useWithdrawDetailPresentation', () => {
    it('should return correct values', async () => {
      const mockId = 'wr-123';
      const mockResponse = {
        id: 'wr-123',
        employee_id: 'emp-123',
        payroll_cycle_id: 'pc-456',
        requested_amount: 1000,
        status: 'PENDING',
        created_at: '2025-01-15T10:00:00Z',
      };

      const mockRepository = {
        getWithdrawRequestById: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as WithdrawRepositoryImpl;

      (WithdrawRepositoryImpl as jest.MockedClass<typeof WithdrawRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useWithdrawDetailPresentation(mockId),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.withdraw).toEqual(mockResponse);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
        expect(result.current.error).toBeNull();
      });

      expect(mockRepository.getWithdrawRequestById).toHaveBeenCalledWith({ id: mockId });
    });
  });

  describe('useCreateWithdrawPresentation', () => {
    it('should return correct values', async () => {
      const mockRequest = {
        employee_id: 'emp-123',
        payroll_cycle_id: 'pc-456',
        requested_amount: 1000,
      };
      const mockResponse = {
        to: '0x123...',
        data: '0x...',
      };

      const mockRepository = {
        createWithdrawRequest: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as WithdrawRepositoryImpl;

      (WithdrawRepositoryImpl as jest.MockedClass<typeof WithdrawRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useCreateWithdrawPresentation(),
        { wrapper }
      );

      result.current.createWithdrawRequest(mockRequest);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockRepository.createWithdrawRequest).toHaveBeenCalledWith(mockRequest);
    });
  });

  describe('useExecuteWithdrawPresentation', () => {
    it('should return correct values', async () => {
      const mockId = 'wr-123';
      const mockRequest = {
        approved_amount: 1000,
        extra_aave_fee: 50,
      };
      const mockResponse = {
        success: true,
        message: 'Withdrawal executed successfully',
      };

      const mockRepository = {
        executeWithdraw: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as WithdrawRepositoryImpl;

      (WithdrawRepositoryImpl as jest.MockedClass<typeof WithdrawRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useExecuteWithdrawPresentation(),
        { wrapper }
      );

      result.current.executeWithdraw({ id: mockId, request: mockRequest });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockRepository.executeWithdraw).toHaveBeenCalledWith(
        mockId,
        mockRequest.approved_amount,
        mockRequest.extra_aave_fee
      );
    });
  });
});