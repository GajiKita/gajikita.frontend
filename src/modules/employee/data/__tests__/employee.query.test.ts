import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useEmployeesByCompanyQuery, useEmployeesByMyCompanyQuery } from '../employee.query';
import { EmployeeRepositoryImpl } from '../../repository/implementation/EmployeeRepositoryImpl';
import { GetEmployeesByCompany } from '../../usecase/implementation/GetEmployeesByCompany';
import { GetEmployeesByMyCompany } from '../../usecase/implementation/GetEmployeesByMyCompany';

// Mock the repository
jest.mock('../../repository/implementation/EmployeeRepositoryImpl');

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

describe('Employee Query Tests', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  describe('useEmployeesByCompanyQuery', () => {
    it('should fetch employees by company successfully', async () => {
      const mockCompanyId = 'company-123';
      const mockResponse = {
        employees: [
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
        ],
      };

      const mockRepository = {
        getEmployeesByCompany: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as EmployeeRepositoryImpl;

      // Mock the repository implementation
      (EmployeeRepositoryImpl as jest.MockedClass<typeof EmployeeRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useEmployeesByCompanyQuery(mockCompanyId),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockRepository.getEmployeesByCompany).toHaveBeenCalledWith(mockCompanyId);
    });

    it('should handle error when fetching employees by company', async () => {
      const mockCompanyId = 'company-123';
      const mockError = new Error('Failed to fetch employees');

      const mockRepository = {
        getEmployeesByCompany: jest.fn().mockRejectedValue(mockError),
      } as unknown as EmployeeRepositoryImpl;

      (EmployeeRepositoryImpl as jest.MockedClass<typeof EmployeeRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useEmployeesByCompanyQuery(mockCompanyId),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });

  describe('useEmployeesByMyCompanyQuery', () => {
    it('should fetch employees by my company successfully', async () => {
      const mockResponse = {
        employees: [
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
        ],
      };

      const mockRepository = {
        getEmployeesByMyCompany: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as EmployeeRepositoryImpl;

      (EmployeeRepositoryImpl as jest.MockedClass<typeof EmployeeRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useEmployeesByMyCompanyQuery(),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockRepository.getEmployeesByMyCompany).toHaveBeenCalled();
    });

    it('should handle error when fetching employees by my company', async () => {
      const mockError = new Error('Failed to fetch employees');

      const mockRepository = {
        getEmployeesByMyCompany: jest.fn().mockRejectedValue(mockError),
      } as unknown as EmployeeRepositoryImpl;

      (EmployeeRepositoryImpl as jest.MockedClass<typeof EmployeeRepositoryImpl>).mockImplementation(() => mockRepository);

      const { result } = renderHook(
        () => useEmployeesByMyCompanyQuery(),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });
});