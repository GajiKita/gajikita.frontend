import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useExecuteWithdrawMutation } from '../withdraw.mutation';
import { WithdrawRepositoryImpl } from '../../repository/implementation/WithdrawRepositoryImpl';

// Mock the repository
jest.mock('../../repository/implementation/WithdrawRepositoryImpl');

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

describe('Withdraw Mutation Tests', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  describe('useExecuteWithdrawMutation', () => {
    it('should execute withdraw successfully', async () => {
      const mockId = 'withdraw-123';
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
        () => useExecuteWithdrawMutation(),
        { wrapper }
      );

      result.current.mutate({ id: mockId, request: mockRequest });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockRepository.executeWithdraw).toHaveBeenCalledWith(mockId, mockRequest.approved_amount, mockRequest.extra_aave_fee);
    });

    it('should handle error when executing withdraw', async () => {
      const mockId = 'withdraw-123';
      const mockRequest = {
        approved_amount: 1000,
      };
      const mockError = new Error('Failed to execute withdrawal');

      const mockRepository = {
        executeWithdraw: jest.fn().mockRejectedValue(mockError),
      } as unknown as WithdrawRepositoryImpl;

      (WithdrawRepositoryImpl as jest.MockedClass<typeof WithdrawRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useExecuteWithdrawMutation(),
        { wrapper }
      );

      result.current.mutate({ id: mockId, request: mockRequest });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });

    it('should execute withdraw without extra_aave_fee when not provided', async () => {
      const mockId = 'withdraw-123';
      const mockRequest = {
        approved_amount: 1000,
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
        () => useExecuteWithdrawMutation(),
        { wrapper }
      );

      result.current.mutate({ id: mockId, request: mockRequest });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockRepository.executeWithdraw).toHaveBeenCalledWith(mockId, mockRequest.approved_amount, undefined);
    });
  });
});