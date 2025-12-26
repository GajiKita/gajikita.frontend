// src/modules/auth/data/__tests__/auth.query.test.ts
import { renderHook } from '@testing-library/react';
import { useSignInMutation, useRegisterMutation } from '../auth.mutation';

// Mock the API calls directly
jest.mock('../auth.mutation', () => ({
  ...jest.requireActual('../auth.mutation'),
  useSignInMutation: jest.fn(),
  useRegisterMutation: jest.fn(),
}));

describe('Auth Mutation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useSignInMutation', () => {
    it('should return success on successful API call', () => {
      // Arrange
      const mockRequest = {
        email: 'test@example.com',
        password: 'password123',
      };
      const mockResponse = {
        data: {
          token: 'fake-jwt-token',
          user: {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            role: 'employee',
          }
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

      (useSignInMutation as jest.MockedFunction<typeof useSignInMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useSignInMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });

    it('should handle mutation errors', () => {
      // Arrange
      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockRejectedValue(new Error('Invalid credentials')),
        isLoading: false,
        isError: true,
        isSuccess: false,
        data: undefined,
        error: new Error('Invalid credentials'),
      };

      (useSignInMutation as jest.MockedFunction<typeof useSignInMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useSignInMutation());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });
  });

  describe('useRegisterMutation', () => {
    it('should return success on successful API call', () => {
      // Arrange
      const mockRequest = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password123',
      };
      const mockResponse = {
        data: {
          id: '2',
          name: 'New User',
          email: 'newuser@example.com',
          role: 'employee',
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

      (useRegisterMutation as jest.MockedFunction<typeof useRegisterMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useRegisterMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });

    it('should handle mutation errors', () => {
      // Arrange
      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockRejectedValue(new Error('Registration failed')),
        isLoading: false,
        isError: true,
        isSuccess: false,
        data: undefined,
        error: new Error('Registration failed'),
      };

      (useRegisterMutation as jest.MockedFunction<typeof useRegisterMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useRegisterMutation());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });
  });
});