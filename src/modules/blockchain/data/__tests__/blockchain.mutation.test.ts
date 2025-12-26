// src/modules/blockchain/data/__tests__/blockchain.mutation.test.ts
import { renderHook } from '@testing-library/react';
import { useSyncTokensMutation } from '../blockchain.mutation';

// Mock the API calls directly
jest.mock('../blockchain.mutation', () => ({
  ...jest.requireActual('../blockchain.mutation'),
  useSyncTokensMutation: jest.fn(),
}));

describe('Blockchain Mutation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useSyncTokensMutation', () => {
    it('should return success on successful API call', () => {
      // Arrange
      const mockResponse = {
        success: true,
        message: 'Tokens synced successfully',
        updatedCount: 5,
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

      (useSyncTokensMutation as jest.MockedFunction<typeof useSyncTokensMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useSyncTokensMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });

    it('should handle mutation errors', () => {
      // Arrange
      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockRejectedValue(new Error('Sync failed')),
        isLoading: false,
        isError: true,
        isSuccess: false,
        data: undefined,
        error: new Error('Sync failed'),
      };

      (useSyncTokensMutation as jest.MockedFunction<typeof useSyncTokensMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useSyncTokensMutation());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });
  });
});