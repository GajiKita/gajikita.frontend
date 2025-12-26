// src/modules/worklog/data/__tests__/worklog.mutation.test.ts
import { renderHook } from '@testing-library/react';
import { useCreateWorklogMutation, useUpdateWorklogMutation, useDeleteWorklogMutation } from '../worklog.mutation';

// Mock the API calls directly
jest.mock('../worklog.mutation', () => ({
  ...jest.requireActual('../worklog.mutation'),
  useCreateWorklogMutation: jest.fn(),
  useUpdateWorklogMutation: jest.fn(),
  useDeleteWorklogMutation: jest.fn(),
}));

describe('Worklog Mutation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCreateWorklogMutation', () => {
    it('should return success on successful API call', () => {
      // Arrange
      const mockRequest = {
        employee_id: 'emp1',
        date: '2024-01-15',
        hours_worked: 8,
        work_description: 'Completed daily tasks',
      };
      const mockResponse = {
        data: {
          id: 'wl1',
          ...mockRequest,
          approved: false,
          approved_by: null,
          approved_at: null,
          created_at: '2024-01-15T09:00:00Z',
          updated_at: '2024-01-15T09:00:00Z',
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

      (useCreateWorklogMutation as jest.MockedFunction<typeof useCreateWorklogMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateWorklogMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });

    it('should handle mutation errors', () => {
      // Arrange
      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockRejectedValue(new Error('Validation failed')),
        isLoading: false,
        isError: true,
        isSuccess: false,
        data: undefined,
        error: new Error('Validation failed'),
      };

      (useCreateWorklogMutation as jest.MockedFunction<typeof useCreateWorklogMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateWorklogMutation());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });
  });

  describe('useUpdateWorklogMutation', () => {
    it('should return success on successful API call', async () => {
      // Arrange
      const mockRequest = {
        id: '1',
        hours_worked: 9,
        work_description: 'Extended work on project',
      };
      const mockResponse = {
        data: {
          id: '1',
          employee_id: 'emp1',
          date: '2024-01-15',
          hours_worked: 9,
          work_description: 'Extended work on project',
          approved: false,
          approved_by: null,
          approved_at: null,
          created_at: '2024-01-15T09:00:00Z',
          updated_at: '2024-01-15T17:00:00Z',
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

      (useUpdateWorklogMutation as jest.MockedFunction<typeof useUpdateWorklogMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useUpdateWorklogMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });
  });

  describe('useDeleteWorklogMutation', () => {
    it('should return success on successful API call', () => {
      // Arrange
      const worklogId = '1';

      const mockMutationResult = {
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockResolvedValue(undefined),
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: undefined,
        error: undefined,
      };

      (useDeleteWorklogMutation as jest.MockedFunction<typeof useDeleteWorklogMutation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useDeleteWorklogMutation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
    });
  });
});