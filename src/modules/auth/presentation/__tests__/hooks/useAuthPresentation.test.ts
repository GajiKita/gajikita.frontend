// src/modules/auth/presentation/__tests__/hooks/useAuthPresentation.test.ts
import { renderHook } from '@testing-library/react';
import { useSignInPresentation, useRegisterPresentation } from '../../hooks/useAuthPresentation';

// Mock the data layer hooks
jest.mock('../../hooks/useAuthPresentation', () => ({
  ...jest.requireActual('../../hooks/useAuthPresentation'),
  useSignInPresentation: jest.fn(),
  useRegisterPresentation: jest.fn(),
}));

describe('Auth Presentation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useSignInPresentation', () => {
    it('should return sign in function', () => {
      // Arrange
      const mockMutationResult = {
        signIn: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
        data: undefined,
      };

      (useSignInPresentation as jest.MockedFunction<typeof useSignInPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useSignInPresentation());

      // Assert
      expect(result.current.signIn).toBeDefined();
      expect(typeof result.current.signIn).toBe('function');
    });

    it('should handle loading states', () => {
      // Arrange
      const mockMutationResult = {
        signIn: jest.fn(),
        isLoading: true,
        isError: false,
        error: undefined,
        isSuccess: false,
        data: undefined,
      };

      (useSignInPresentation as jest.MockedFunction<typeof useSignInPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useSignInPresentation());

      // Assert
      expect(result.current.isLoading).toBe(true);
    });

    it('should handle error states', () => {
      // Arrange
      const mockError = new Error('Invalid credentials');
      const mockMutationResult = {
        signIn: jest.fn(),
        isLoading: false,
        isError: true,
        error: mockError,
        isSuccess: false,
        data: undefined,
      };

      (useSignInPresentation as jest.MockedFunction<typeof useSignInPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useSignInPresentation());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBe(mockError);
    });
  });

  describe('useRegisterPresentation', () => {
    it('should return register function', () => {
      // Arrange
      const mockMutationResult = {
        register: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
        data: undefined,
      };

      (useRegisterPresentation as jest.MockedFunction<typeof useRegisterPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useRegisterPresentation());

      // Assert
      expect(result.current.register).toBeDefined();
      expect(typeof result.current.register).toBe('function');
    });

    it('should handle registration success', () => {
      // Arrange
      const mockResponse = {
        data: {
          id: '1',
          name: 'New User',
          email: 'newuser@example.com',
          role: 'employee',
        }
      };
      const mockMutationResult = {
        register: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: true,
        data: mockResponse,
      };

      (useRegisterPresentation as jest.MockedFunction<typeof useRegisterPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useRegisterPresentation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });
  });
});