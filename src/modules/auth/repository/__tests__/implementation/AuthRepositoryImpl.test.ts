// src/modules/auth/repository/__tests__/implementation/AuthRepositoryImpl.test.ts
import { AuthRepositoryImpl } from '../../implementation/AuthRepositoryImpl';
import { httpClient } from '@/core/utils/http/httpClient';

// Mock the http client
jest.mock('@/core/utils/http/httpClient');

describe('AuthRepositoryImpl', () => {
  let repository: AuthRepositoryImpl;
  const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>;

  beforeEach(() => {
    repository = new AuthRepositoryImpl();
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should call httpClient.post with correct parameters', async () => {
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
      mockHttpClient.post.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.signIn(mockRequest);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/auth/sign-in',
        mockRequest
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors correctly', async () => {
      // Arrange
      const mockRequest = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };
      const error = new Error('Invalid credentials');
      mockHttpClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(repository.signIn(mockRequest)).rejects.toThrow('Invalid credentials');
    });
  });

  describe('register', () => {
    it('should call httpClient.post with correct parameters', async () => {
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
      mockHttpClient.post.mockResolvedValue(mockResponse);

      // Act
      const result = await repository.register(mockRequest);

      // Assert
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        '/auth/register',
        mockRequest
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle registration errors', async () => {
      // Arrange
      const mockRequest = {
        name: 'New User',
        email: 'invalid-email',
        password: '123',
      };
      const error = new Error('Validation failed');
      mockHttpClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(repository.register(mockRequest)).rejects.toThrow('Validation failed');
    });
  });
});