import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import {
  useSmartContractsQuery,
  useSmartContractQuery,
  useCreateSmartContractMutation,
  useUpdateSmartContractMutation,
  useDeleteSmartContractMutation
} from '../../data/smart-contract.query';
import { SmartContractRepositoryImpl } from '../../repository/implementation/SmartContractRepositoryImpl';

// Mock the repository
jest.mock('../../repository/implementation/SmartContractRepositoryImpl');

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

describe('Smart Contract Data Layer Tests', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  describe('useSmartContractsQuery', () => {
    it('should fetch smart contracts successfully', async () => {
      const mockResponse = {
        smart_contracts: [
          {
            id: 'sc-123',
            name: 'GajiKita Main',
            contract_address: '0x123...',
            chain_id: 421614,
            abi: {},
            created_at: '2025-01-15T10:00:00Z',
            updated_at: '2025-01-15T10:00:00Z',
          },
        ],
      };

      const mockRepository = {
        getSmartContracts: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as SmartContractRepositoryImpl;

      (SmartContractRepositoryImpl as jest.MockedClass<typeof SmartContractRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useSmartContractsQuery({}),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockRepository.getSmartContracts).toHaveBeenCalled();
    });

    it('should handle error when fetching smart contracts', async () => {
      const mockError = new Error('Failed to fetch smart contracts');

      const mockRepository = {
        getSmartContracts: jest.fn().mockRejectedValue(mockError),
      } as unknown as SmartContractRepositoryImpl;

      (SmartContractRepositoryImpl as jest.MockedClass<typeof SmartContractRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useSmartContractsQuery({}),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });

  describe('useSmartContractQuery', () => {
    it('should fetch smart contract by ID successfully', async () => {
      const mockId = 'sc-123';
      const mockResponse = {
        id: 'sc-123',
        name: 'GajiKita Main',
        contract_address: '0x123...',
        chain_id: 421614,
        abi: {},
        created_at: '2025-01-15T10:00:00Z',
        updated_at: '2025-01-15T10:00:00Z',
      };

      const mockRepository = {
        getSmartContractById: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as SmartContractRepositoryImpl;

      (SmartContractRepositoryImpl as jest.MockedClass<typeof SmartContractRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useSmartContractQuery({ id: mockId }),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockRepository.getSmartContractById).toHaveBeenCalledWith({ id: mockId });
    });
  });

  describe('useCreateSmartContractMutation', () => {
    it('should create smart contract successfully', async () => {
      const mockRequest = {
        name: 'New Contract',
        contract_address: '0x456...',
        chain_id: 421614,
        abi: {},
      };
      const mockResponse = {
        id: 'sc-456',
        ...mockRequest,
        created_at: '2025-01-15T10:00:00Z',
        updated_at: '2025-01-15T10:00:00Z',
      };

      const mockRepository = {
        createSmartContract: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as SmartContractRepositoryImpl;

      (SmartContractRepositoryImpl as jest.MockedClass<typeof SmartContractRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useCreateSmartContractMutation(),
        { wrapper }
      );

      result.current.mutate(mockRequest);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockRepository.createSmartContract).toHaveBeenCalledWith(mockRequest);
    });
  });

  describe('useUpdateSmartContractMutation', () => {
    it('should update smart contract successfully', async () => {
      const mockId = 'sc-123';
      const mockRequest = {
        name: 'Updated Contract',
        contract_address: '0x789...',
        chain_id: 421614,
        abi: {},
      };
      const mockResponse = {
        id: 'sc-123',
        ...mockRequest,
        created_at: '2025-01-15T10:00:00Z',
        updated_at: '2025-01-15T11:00:00Z',
      };

      const mockRepository = {
        updateSmartContract: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as SmartContractRepositoryImpl;

      (SmartContractRepositoryImpl as jest.MockedClass<typeof SmartContractRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useUpdateSmartContractMutation(),
        { wrapper }
      );

      result.current.mutate({ id: mockId, ...mockRequest });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockRepository.updateSmartContract).toHaveBeenCalledWith({ id: mockId, ...mockRequest });
    });
  });

  describe('useDeleteSmartContractMutation', () => {
    it('should delete smart contract successfully', async () => {
      const mockId = 'sc-123';

      const mockRepository = {
        deleteSmartContract: jest.fn().mockResolvedValue(undefined),
      } as unknown as SmartContractRepositoryImpl;

      (SmartContractRepositoryImpl as jest.MockedClass<typeof SmartContractRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useDeleteSmartContractMutation(),
        { wrapper }
      );

      result.current.mutate(mockId);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockRepository.deleteSmartContract).toHaveBeenCalledWith(mockId);
    });
  });
});