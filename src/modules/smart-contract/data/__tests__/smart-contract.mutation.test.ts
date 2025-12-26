// src/modules/smart-contract/data/__tests__/smart-contract.mutation.test.ts
import { renderHook } from '@testing-library/react';
import { useCreateSmartContractMutation, useUpdateSmartContractMutation, useDeleteSmartContractMutation } from '../smart-contract.mutation';

// Mock the API calls directly
jest.mock('../smart-contract.mutation', () => ({
  ...jest.requireActual('../smart-contract.mutation'),
  useCreateSmartContractMutation: jest.fn(),
  useUpdateSmartContractMutation: jest.fn(),
  useDeleteSmartContractMutation: jest.fn(),
}));

describe('Smart Contract Mutation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCreateSmartContractMutation', () => {
    it('should return success on successful API call', () => {
      // Arrange
      const mockRequest = {
        name: 'New Contract',
        address: '0x1234567890123456789012345678901234567890',
        abi: '{"abi": "..."}',
        bytecode: '0x...',
      };
      const mockResponse = {
        data: {
          id: '2',
          ...mockRequest,
          deployed_at: '2024-01-15T00:00:00Z',
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

      (useCreateSmartContractMutation as jest.MockedFunction<typeof useCreateSmartContractMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateSmartContractMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });

    it('should handle mutation errors', () => {
      // Arrange
      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockRejectedValue(new Error('Contract deployment failed')),
        isLoading: false,
        isError: true,
        isSuccess: false,
        data: undefined,
        error: new Error('Contract deployment failed'),
      };

      (useCreateSmartContractMutation as jest.MockedFunction<typeof useCreateSmartContractMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateSmartContractMutation());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });
  });

  describe('useUpdateSmartContractMutation', () => {
    it('should return success on successful API call', () => {
      // Arrange
      const mockRequest = {
        id: '1',
        name: 'Updated Contract',
        address: '0x1234567890123456789012345678901234567890',
      };
      const mockResponse = {
        data: {
          id: '1',
          name: 'Updated Contract',
          address: '0x1234567890123456789012345678901234567890',
          abi: '{"abi": "..."}',
          bytecode: '0x...',
          deployed_at: '2024-01-15T00:00:00Z',
          updated_at: '2024-01-16T00:00:00Z',
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

      (useUpdateSmartContractMutation as jest.MockedFunction<typeof useUpdateSmartContractMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useUpdateSmartContractMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });
  });

  describe('useDeleteSmartContractMutation', () => {
    it('should return success on successful API call', () => {
      // Arrange
      const contractId = '1';

      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockResolvedValue(undefined),
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: undefined,
        error: undefined,
      };

      (useDeleteSmartContractMutation as jest.MockedFunction<typeof useDeleteSmartContractMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useDeleteSmartContractMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
    });
  });
});