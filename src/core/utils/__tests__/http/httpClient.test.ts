import { httpClient, ApiError } from '@/core/utils/http/httpClient';

// Mock the fetch API
global.fetch = jest.fn();

describe('HttpClient Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET requests', () => {
    it('should make a successful GET request', async () => {
      // Arrange
      const mockResponse = { data: 'test data' };
      (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
        status: 200,
      } as Response);

      // Act
      const result = await httpClient.get('/test');

      // Assert
      expect(global.fetch).toHaveBeenCalledWith('/api/proxy/test', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle GET request with query parameters', async () => {
      // Arrange
      const mockResponse = { data: 'filtered data' };
      (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
        status: 200,
      } as Response);

      // Act
      const result = await httpClient.get('/test', { params: { page: 1, limit: 10 } });

      // Assert
      expect(global.fetch).toHaveBeenCalledWith('/api/proxy/test?page=1&limit=10', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw ApiError for failed GET requests', async () => {
      // Arrange
      (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ message: 'Resource not found' }),
      } as Response);

      // Act & Assert
      await expect(httpClient.get('/test')).rejects.toThrow(ApiError);
      await expect(httpClient.get('/test')).rejects.toMatchObject({
        status: 404,
        message: 'Resource not found',
      });
    });
  });

  describe('POST requests', () => {
    it('should make a successful POST request', async () => {
      // Arrange
      const requestBody = { name: 'test', value: 123 };
      const mockResponse = { id: 1, ...requestBody };
      (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
        status: 201,
      } as Response);

      // Act
      const result = await httpClient.post('/test', requestBody);

      // Assert
      expect(global.fetch).toHaveBeenCalledWith('/api/proxy/test', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle empty POST request body', async () => {
      // Arrange
      const mockResponse = { success: true };
      (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
        status: 200,
      } as Response);

      // Act
      const result = await httpClient.post('/test');

      // Assert
      expect(global.fetch).toHaveBeenCalledWith('/api/proxy/test', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(undefined),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should throw ApiError for failed POST requests', async () => {
      // Arrange
      const requestBody = { name: 'test' };
      (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ message: 'Bad request', field: 'name' }),
      } as Response);

      // Act & Assert
      await expect(httpClient.post('/test', requestBody)).rejects.toThrow(ApiError);
      await expect(httpClient.post('/test', requestBody)).rejects.toMatchObject({
        status: 400,
        message: 'Bad request',
        data: { message: 'Bad request', field: 'name' },
      });
    });
  });

  describe('PATCH requests', () => {
    it('should make a successful PATCH request', async () => {
      // Arrange
      const requestBody = { name: 'updated name' };
      const mockResponse = { id: 1, ...requestBody };
      (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
        status: 200,
      } as Response);

      // Act
      const result = await httpClient.patch('/test/1', requestBody);

      // Assert
      expect(global.fetch).toHaveBeenCalledWith('/api/proxy/test/1', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify(requestBody),
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('DELETE requests', () => {
    it('should make a successful DELETE request', async () => {
      // Arrange
      (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
        ok: true,
        json: async () => ({}),
        status: 204,
      } as Response);

      // Act
      const result = await httpClient.del('/test/1');

      // Assert
      expect(global.fetch).toHaveBeenCalledWith('/api/proxy/test/1', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      });
      expect(result).toEqual({});
    });
  });

  describe('ApiError', () => {
    it('should create ApiError with correct properties', () => {
      // Act
      const error = new ApiError(401, 'Unauthorized', { code: 'AUTH_001' });

      // Assert
      expect(error).toBeInstanceOf(ApiError);
      expect(error.status).toBe(401);
      expect(error.message).toBe('Unauthorized');
      expect(error.data).toEqual({ code: 'AUTH_001' });
      expect(error.name).toBe('ApiError');
    });
  });

  describe('Request with custom headers', () => {
    it('should include custom headers in the request', async () => {
      // Arrange
      const mockResponse = { data: 'test' };
      (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
        status: 200,
      } as Response);

      // Act
      const result = await httpClient.get('/test', {
        headers: {
          'Authorization': 'Bearer token123',
          'X-Custom-Header': 'custom-value',
        },
      });

      // Assert
      expect(global.fetch).toHaveBeenCalledWith('/api/proxy/test', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token123',
          'X-Custom-Header': 'custom-value',
        },
        method: 'GET',
      });
      expect(result).toEqual(mockResponse);
    });
  });
});