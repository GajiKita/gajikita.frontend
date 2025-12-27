import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import {
  useProcessCycleMutation,
  usePreparePlatformFeeWithdrawalMutation
} from '../../data/repayments.mutation';
import { RepaymentRepositoryImpl } from '../../repository/implementation/RepaymentRepositoryImpl';

// Mock the repository
jest.mock('../../repository/implementation/RepaymentRepositoryImpl');

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

describe('Repayments Data Layer Tests', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  describe('useProcessCycleMutation', () => {
    it('should process cycle successfully', async () => {
      const mockCycleId = 'pc-123';
      const mockResponse = {
        success: true,
        message: 'Cycle processed successfully',
        processed_count: 5,
      };

      const mockRepository = {
        processCycle: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as RepaymentRepositoryImpl;

      (RepaymentRepositoryImpl as jest.MockedClass<typeof RepaymentRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useProcessCycleMutation(),
        { wrapper }
      );

      result.current.mutate(mockCycleId);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockRepository.processCycle).toHaveBeenCalledWith(mockCycleId);
    });

    it('should handle error when processing cycle', async () => {
      const mockCycleId = 'pc-123';
      const mockError = new Error('Failed to process cycle');

      const mockRepository = {
        processCycle: jest.fn().mockRejectedValue(mockError),
      } as unknown as RepaymentRepositoryImpl;

      (RepaymentRepositoryImpl as jest.MockedClass<typeof RepaymentRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useProcessCycleMutation(),
        { wrapper }
      );

      result.current.mutate(mockCycleId);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });

  describe('usePreparePlatformFeeWithdrawalMutation', () => {
    it('should prepare platform fee withdrawal successfully', async () => {
      const mockRequest = {
        amount: 1000,
        cid: 'c-456',
      };
      const mockResponse = {
        to: '0x123...',
        data: '0x...',
        value: '0',
      };

      const mockRepository = {
        preparePlatformFeeWithdrawal: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as RepaymentRepositoryImpl;

      (RepaymentRepositoryImpl as jest.MockedClass<typeof RepaymentRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => usePreparePlatformFeeWithdrawalMutation(),
        { wrapper }
      );

      result.current.mutate(mockRequest);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockRepository.preparePlatformFeeWithdrawal).toHaveBeenCalledWith(mockRequest);
    });

    it('should handle error when preparing platform fee withdrawal', async () => {
      const mockRequest = {
        amount: 1000,
        cid: 'c-456',
      };
      const mockError = new Error('Failed to prepare platform fee withdrawal');

      const mockRepository = {
        preparePlatformFeeWithdrawal: jest.fn().mockRejectedValue(mockError),
      } as unknown as RepaymentRepositoryImpl;

      (RepaymentRepositoryImpl as jest.MockedClass<typeof RepaymentRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => usePreparePlatformFeeWithdrawalMutation(),
        { wrapper }
      );

      result.current.mutate(mockRequest);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });
});