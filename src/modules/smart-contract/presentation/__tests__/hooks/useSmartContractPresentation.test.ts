// src/modules/smart-contract/presentation/__tests__/hooks/useSmartContractPresentation.test.ts
import { renderHook } from '@testing-library/react';
import { useSmartContractListPresentation, useSmartContractDetailPresentation, useCreateSmartContractPresentation, useUpdateSmartContractPresentation, useDeleteSmartContractPresentation } from '../../hooks/useSmartContractPresentation';

// Mock the data layer hooks
jest.mock('../../hooks/useSmartContractPresentation', () => ({
  ...jest.requireActual('../../hooks/useSmartContractPresentation'),
  useSmartContractListPresentation: jest.fn(),
  useSmartContractDetailPresentation: jest.fn(),
  useCreateSmartContractPresentation: jest.fn(),
  useUpdateSmartContractPresentation: jest.fn(),
  useDeleteSmartContractPresentation: jest.fn(),
}));

describe('Smart Contract Presentation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useSmartContractListPresentation', () => {
    it('should return formatted smart contract data', () => {
      // Arrange
      const mockParams = { page: 1, limit: 10 };
      const mockData = {
        smartContracts: [
          {
            id: '1',
            name: 'Payroll Contract',
            address: '0x1234567890123456789012345678901234567890',
            abi: '{}',
            bytecode: '0x...',
            deployed_at: '2024-01-01T00:00:00Z',
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

      (useSmartContractListPresentation as jest.MockedFunction<typeof useSmartContractListPresentation>).mockReturnValue(mockData);

      // Act
      const { result } = renderHook(() => useSmartContractListPresentation(mockParams));

      // Assert
      expect(result.current.smartContracts).toEqual(mockData.smartContracts);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
    });

    it('should handle error states', () => {
      // Arrange
      const mockErrorData = {
        smartContracts: [],
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

      (useSmartContractListPresentation as jest.MockedFunction<typeof useSmartContractListPresentation>).mockReturnValue(mockErrorData);

      // Act
      const { result } = renderHook(() => useSmartContractListPresentation({ page: 1, limit: 10 }));

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });
  });

  describe('useSmartContractDetailPresentation', () => {
    it('should return smart contract detail', () => {
      // Arrange
      const contractId = '1';
      const mockData = {
        smartContract: {
          id: '1',
          name: 'Payroll Contract',
          address: '0x1234567890123456789012345678901234567890',
          abi: '{}',
          bytecode: '0x...',
          deployed_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
          deleted: false,
        },
        isLoading: false,
        isError: false,
        error: undefined,
      };

      (useSmartContractDetailPresentation as jest.MockedFunction<typeof useSmartContractDetailPresentation>).mockReturnValue(mockData);

      // Act
      const { result } = renderHook(() => useSmartContractDetailPresentation(contractId));

      // Assert
      expect(result.current.smartContract).toEqual(mockData.smartContract);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('useCreateSmartContractPresentation', () => {
    it('should return create function', () => {
      // Arrange
      const mockMutationResult = {
        createSmartContract: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useCreateSmartContractPresentation as jest.MockedFunction<typeof useCreateSmartContractPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateSmartContractPresentation());

      // Assert
      expect(result.current.createSmartContract).toBeDefined();
      expect(typeof result.current.createSmartContract).toBe('function');
    });
  });

  describe('useUpdateSmartContractPresentation', () => {
    it('should return update function', () => {
      // Arrange
      const mockMutationResult = {
        updateSmartContract: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useUpdateSmartContractPresentation as jest.MockedFunction<typeof useUpdateSmartContractPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useUpdateSmartContractPresentation());

      // Assert
      expect(result.current.updateSmartContract).toBeDefined();
      expect(typeof result.current.updateSmartContract).toBe('function');
    });
  });

  describe('useDeleteSmartContractPresentation', () => {
    it('should return delete function', () => {
      // Arrange
      const mockMutationResult = {
        deleteSmartContract: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useDeleteSmartContractPresentation as jest.MockedFunction<typeof useDeleteSmartContractPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useDeleteSmartContractPresentation());

      // Assert
      expect(result.current.deleteSmartContract).toBeDefined();
      expect(typeof result.current.deleteSmartContract).toBe('function');
    });
  });
});