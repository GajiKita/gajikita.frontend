import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import {
  useSmartContractsPresentation,
  useSmartContractDetailPresentation,
  useCreateSmartContractPresentation,
  useUpdateSmartContractPresentation,
  useDeleteSmartContractPresentation
} from '../../hooks/useSmartContractPresentation';
import { SmartContractRepositoryImpl } from '../../../repository/implementation/SmartContractRepositoryImpl';

// Mock the repository
jest.mock('../../../repository/implementation/SmartContractRepositoryImpl');

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

describe('Smart Contract Presentation Hooks Tests', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  describe('useSmartContractsPresentation', () => {
    it('should return correct values', async () => {
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
        () => useSmartContractsPresentation(),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.smartContracts).toEqual(mockResponse.smart_contracts);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
        expect(result.current.error).toBeNull();
        expect(typeof result.current.refetch).toBe('function');
      });

      expect(mockRepository.getSmartContracts).toHaveBeenCalled();
    });

    it('should handle error when fetching smart contracts', async () => {
      const mockError = new Error('Failed to fetch smart contracts');

      const mockRepository = {
        getSmartContracts: jest.fn().mockRejectedValue(mockError),
      } as unknown as SmartContractRepositoryImpl;

      (SmartContractRepositoryImpl as jest.MockedClass<typeof SmartContractRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useSmartContractsPresentation(),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });

  describe('useSmartContractDetailPresentation', () => {
    it('should return correct values', async () => {
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
        () => useSmartContractDetailPresentation(mockId),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.smartContract).toEqual(mockResponse);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
        expect(result.current.error).toBeNull();
      });

      expect(mockRepository.getSmartContractById).toHaveBeenCalledWith({ id: mockId });
    });
  });

  describe('useCreateSmartContractPresentation', () => {
    it('should return correct values', async () => {
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
        () => useCreateSmartContractPresentation(),
        { wrapper }
      );

      result.current.createSmartContract(mockRequest);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockRepository.createSmartContract).toHaveBeenCalledWith(mockRequest);
    });
  });

  describe('useUpdateSmartContractPresentation', () => {
    it('should return correct values', async () => {
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
        () => useUpdateSmartContractPresentation(),
        { wrapper }
      );

      result.current.updateSmartContract({ id: mockId, ...mockRequest });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockRepository.updateSmartContract).toHaveBeenCalledWith({ id: mockId, ...mockRequest });
    });
  });

  describe('useDeleteSmartContractPresentation', () => {
    it('should return correct values', async () => {
      const mockId = 'sc-123';

      const mockRepository = {
        deleteSmartContract: jest.fn().mockResolvedValue(undefined),
      } as unknown as SmartContractRepositoryImpl;

      (SmartContractRepositoryImpl as jest.MockedClass<typeof SmartContractRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useDeleteSmartContractPresentation(),
        { wrapper }
      );

      result.current.deleteSmartContract(mockId);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockRepository.deleteSmartContract).toHaveBeenCalledWith(mockId);
    });
  });
});