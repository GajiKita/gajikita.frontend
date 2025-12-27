import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { 
  useRepaymentsPresentation,
  useProcessCyclePresentation,
  usePreparePlatformFeeWithdrawalPresentation
} from '../hooks/useRepaymentsPresentation';
import { RepaymentRepositoryImpl } from '../../../repository/implementation/RepaymentRepositoryImpl';

// Mock the repository
jest.mock('../../../repository/implementation/RepaymentRepositoryImpl');

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

describe('Repayments Presentation Hooks Tests', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  describe('useProcessCyclePresentation', () => {
    it('should return correct values', async () => {
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
        () => useProcessCyclePresentation(),
        { wrapper }
      );

      result.current.processCycle(mockCycleId);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
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
        () => useProcessCyclePresentation(),
        { wrapper }
      );

      result.current.processCycle(mockCycleId);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });

  describe('usePreparePlatformFeeWithdrawalPresentation', () => {
    it('should return correct values', async () => {
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
        () => usePreparePlatformFeeWithdrawalPresentation(),
        { wrapper }
      );

      result.current.preparePlatformFeeWithdrawal(mockRequest);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
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
        () => usePreparePlatformFeeWithdrawalPresentation(),
        { wrapper }
      );

      result.current.preparePlatformFeeWithdrawal(mockRequest);

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });

  describe('useRepaymentsPresentation', () => {
    it('should return processCycle and preparePlatformFeeWithdrawal functions', () => {
      const { result } = renderHook(
        () => useRepaymentsPresentation(),
        { wrapper }
      );

      expect(typeof result.current.processCycle).toBe('function');
      expect(typeof result.current.preparePlatformFeeWithdrawal).toBe('function');
      expect(typeof result.current.isLoading).toBe('boolean');
      expect(typeof result.current.isError).toBe('boolean');
      expect(result.current.error).toBeNull;
    });
  });
});