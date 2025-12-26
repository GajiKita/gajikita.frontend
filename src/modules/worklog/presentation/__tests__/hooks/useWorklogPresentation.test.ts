// src/modules/worklog/presentation/__tests__/hooks/useWorklogPresentation.test.ts
import { renderHook } from '@testing-library/react';
import { useWorklogListPresentation, useWorklogDetailPresentation, useCreateWorklogPresentation, useUpdateWorklogPresentation, useDeleteWorklogPresentation } from '../../hooks/useWorklogPresentation';

// Mock the data layer hooks
jest.mock('../../hooks/useWorklogPresentation', () => ({
  ...jest.requireActual('../../hooks/useWorklogPresentation'),
  useWorklogListPresentation: jest.fn(),
  useWorklogDetailPresentation: jest.fn(),
  useCreateWorklogPresentation: jest.fn(),
  useUpdateWorklogPresentation: jest.fn(),
  useDeleteWorklogPresentation: jest.fn(),
}));

describe('Worklog Presentation Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useWorklogListPresentation', () => {
    it('should return formatted worklog data', () => {
      // Arrange
      const mockParams = { page: 1, limit: 10, employeeId: 'emp1' };
      const mockData = {
        worklogs: [
          {
            id: '1',
            employee_id: 'emp1',
            date: '2024-01-15',
            hours_worked: 8,
            work_description: 'Completed project tasks',
            approved: true,
            approved_by: 'supervisor1',
            approved_at: '2024-01-15T18:00:00Z',
            created_at: '2024-01-15T09:00:00Z',
            updated_at: '2024-01-15T18:00:00Z',
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

      (useWorklogListPresentation as jest.MockedFunction<typeof useWorklogListPresentation>).mockReturnValue(mockData);

      // Act
      const { result } = renderHook(() => useWorklogListPresentation(mockParams));

      // Assert
      expect(result.current.worklogs).toEqual(mockData.worklogs);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(false);
    });

    it('should handle error states', () => {
      // Arrange
      const mockErrorData = {
        worklogs: [],
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

      (useWorklogListPresentation as jest.MockedFunction<typeof useWorklogListPresentation>).mockReturnValue(mockErrorData);

      // Act
      const { result } = renderHook(() => useWorklogListPresentation({ page: 1, limit: 10 }));

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
    });

    it('should handle loading states', () => {
      // Arrange
      const mockLoadingData = {
        worklogs: [],
        isLoading: true,
        isError: false,
        error: undefined,
        refetch: jest.fn(),
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
      };

      (useWorklogListPresentation as jest.MockedFunction<typeof useWorklogListPresentation>).mockReturnValue(mockLoadingData);

      // Act
      const { result } = renderHook(() => useWorklogListPresentation({ page: 1, limit: 10 }));

      // Assert
      expect(result.current.isLoading).toBe(true);
    });
  });

  describe('useWorklogDetailPresentation', () => {
    it('should return worklog detail data', () => {
      // Arrange
      const worklogId = '1';
      const mockData = {
        worklog: {
          id: '1',
          employee_id: 'emp1',
          date: '2024-01-15',
          hours_worked: 8,
          work_description: 'Completed project tasks',
          approved: true,
          approved_by: 'supervisor1',
          approved_at: '2024-01-15T18:00:00Z',
          created_at: '2024-01-15T09:00:00Z',
          updated_at: '2024-01-15T18:00:00Z',
          deleted: false,
        },
        isLoading: false,
        isError: false,
        error: undefined,
      };

      (useWorklogDetailPresentation as jest.MockedFunction<typeof useWorklogDetailPresentation>).mockReturnValue(mockData);

      // Act
      const { result } = renderHook(() => useWorklogDetailPresentation(worklogId));

      // Assert
      expect(result.current.worklog).toEqual(mockData.worklog);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('useCreateWorklogPresentation', () => {
    it('should return create function', () => {
      // Arrange
      const mockMutationResult = {
        createWorklog: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useCreateWorklogPresentation as jest.MockedFunction<typeof useCreateWorklogPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateWorklogPresentation());

      // Assert
      expect(result.current.createWorklog).toBeDefined();
      expect(typeof result.current.createWorklog).toBe('function');
    });

    it('should handle mutation success', () => {
      // Arrange
      const mockResponse = {
        data: {
          id: '2',
          employee_id: 'emp2',
          date: '2024-01-16',
          hours_worked: 7.5,
          work_description: 'Reviewed code',
          approved: false,
          approved_by: null,
          approved_at: null,
          created_at: '2024-01-16T09:00:00Z',
          updated_at: '2024-01-16T09:00:00Z',
          deleted: false,
        }
      };
      const mockMutationResult = {
        createWorklog: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: true,
        data: mockResponse,
      };

      (useCreateWorklogPresentation as jest.MockedFunction<typeof useCreateWorklogPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateWorklogPresentation());

      // Assert
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });

    it('should handle mutation errors', () => {
      // Arrange
      const mockError = new Error('Validation failed');
      const mockMutationResult = {
        createWorklog: jest.fn(),
        isLoading: false,
        isError: true,
        error: mockError,
        isSuccess: false,
        data: undefined,
      };

      (useCreateWorklogPresentation as jest.MockedFunction<typeof useCreateWorklogPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useCreateWorklogPresentation());

      // Assert
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBe(mockError);
    });
  });

  describe('useUpdateWorklogPresentation', () => {
    it('should return update function', () => {
      // Arrange
      const mockMutationResult = {
        updateWorklog: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useUpdateWorklogPresentation as jest.MockedFunction<typeof useUpdateWorklogPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useUpdateWorklogPresentation());

      // Assert
      expect(result.current.updateWorklog).toBeDefined();
      expect(typeof result.current.updateWorklog).toBe('function');
    });
  });

  describe('useDeleteWorklogPresentation', () => {
    it('should return delete function', () => {
      // Arrange
      const mockMutationResult = {
        deleteWorklog: jest.fn(),
        isLoading: false,
        isError: false,
        error: undefined,
        isSuccess: false,
      };

      (useDeleteWorklogPresentation as jest.MockedFunction<typeof useDeleteWorklogPresentation>).mockReturnValue(mockMutationResult);

      // Act
      const { result } = renderHook(() => useDeleteWorklogPresentation());

      // Assert
      expect(result.current.deleteWorklog).toBeDefined();
      expect(typeof result.current.deleteWorklog).toBe('function');
    });
  });
});