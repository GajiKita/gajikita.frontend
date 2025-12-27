import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEmployeesByCompanyPresentation, useEmployeesByMyCompanyPresentation } from '../useEmployeePresentation';

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

describe('Employee Presentation Hooks Tests', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  describe('useEmployeesByCompanyPresentation', () => {
    it('should return correct values', async () => {
      const mockCompanyId = 'company-123';
      const mockResponse = [
        {
          id: 'emp-1',
          user_id: 'user-1',
          company_id: 'company-123',
          employee_number: 'EMP001',
          position: 'Developer',
          base_salary: 5000,
          wallet_address: '0x123...',
          status: 'ACTIVE',
          sbt_token_id: 'sbt-1',
          employed_started: '2023-01-01',
          employed_ended: '2025-12-31',
        },
      ];

      jest.mock('../../../data/employee.query', () => ({
        useEmployeesByCompanyQuery: jest.fn(() => ({
          data: mockResponse,
          isLoading: false,
          isError: false,
          error: null,
          refetch: jest.fn(),
        })),
      }));

      const { useEmployeesByCompanyQuery } = require('../../../data/employee.query');
      const { result } = renderHook(
        () => useEmployeesByCompanyPresentation(mockCompanyId),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.employees).toEqual(mockResponse);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
        expect(result.current.error).toBeNull();
        expect(typeof result.current.refetch).toBe('function');
      });

      expect(useEmployeesByCompanyQuery).toHaveBeenCalledWith(mockCompanyId);
    });
  });

  describe('useEmployeesByMyCompanyPresentation', () => {
    it('should return correct values', async () => {
      const mockResponse = [
        {
          id: 'emp-1',
          user_id: 'user-1',
          company_id: 'company-123',
          employee_number: 'EMP001',
          position: 'Developer',
          base_salary: 5000,
          wallet_address: '0x123...',
          status: 'ACTIVE',
          sbt_token_id: 'sbt-1',
          employed_started: '2023-01-01',
          employed_ended: '2025-12-31',
        },
      ];

      jest.mock('../../../data/employee.query', () => ({
        useEmployeesByMyCompanyQuery: jest.fn(() => ({
          data: mockResponse,
          isLoading: false,
          isError: false,
          error: null,
          refetch: jest.fn(),
        })),
      }));

      const { useEmployeesByMyCompanyQuery } = require('../../../data/employee.query');
      const { result } = renderHook(
        () => useEmployeesByMyCompanyPresentation(),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.employees).toEqual(mockResponse);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
        expect(result.current.error).toBeNull();
        expect(typeof result.current.refetch).toBe('function');
      });

      expect(useEmployeesByMyCompanyQuery).toHaveBeenCalledWith();
    });
  });
});
