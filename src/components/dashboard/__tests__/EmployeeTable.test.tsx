import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EmployeeTable } from '../EmployeeTable';

// Create a test query client
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Mock the useEmployeeListPresentation hook
const mockUseEmployeeListPresentation = jest.fn();
jest.mock('../../../modules/employee/presentation/hooks/useEmployeePresentation', () => ({
  useEmployeeListPresentation: (...args: any[]) => mockUseEmployeeListPresentation(...args),
}));

describe('EmployeeTable Component', () => {
  const renderWithProviders = (ui: React.ReactElement, options?: any) => {
    const testQueryClient = createTestQueryClient();
    const customRenderOptions = {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={testQueryClient}>
          {children}
        </QueryClientProvider>
      ),
      ...options,
    };

    return render(ui, customRenderOptions);
  };

  beforeEach(() => {
    mockUseEmployeeListPresentation.mockReturnValue({
      employees: [],
      isLoading: false,
      isError: false,
      error: null,
    });
  });

  it('renders with default structure', () => {
    renderWithProviders(<EmployeeTable />);

    expect(screen.getByText(/payroll status/i)).toBeInTheDocument();
    expect(screen.getByText(/overview of employee salary advances/i)).toBeInTheDocument();
    expect(screen.getByText(/view all/i)).toBeInTheDocument();
  });

  it('renders table headers correctly', () => {
    renderWithProviders(<EmployeeTable />);

    expect(screen.getByText(/karyawan/i)).toBeInTheDocument();
    expect(screen.getByText(/gaji bulanan/i)).toBeInTheDocument();
    expect(screen.getByText(/withdrawable/i)).toBeInTheDocument();
    expect(screen.getByText(/already withdrawn/i)).toBeInTheDocument();
    expect(screen.getByText(/limit/i)).toBeInTheDocument();
    expect(screen.getByText(/sbt status/i)).toBeInTheDocument();
  });

  it('renders loading state when isLoading is true', () => {
    mockUseEmployeeListPresentation.mockReturnValue({
      employees: [],
      isLoading: true,
      isError: false,
      error: null,
    });

    renderWithProviders(<EmployeeTable />);

    // Check for skeleton elements by looking for elements with animate-pulse class
    const skeletonElements = screen.getAllByRole('cell');
    const skeletonRows = skeletonElements.filter(el =>
      el.querySelector('.animate-pulse') !== null
    );
    expect(skeletonRows.length).toBeGreaterThan(0);
  });

  it('renders error state when isError is true', () => {
    mockUseEmployeeListPresentation.mockReturnValue({
      employees: [],
      isLoading: false,
      isError: true,
      error: { message: 'Failed to load employees' },
    });

    renderWithProviders(<EmployeeTable />);

    expect(screen.getByText(/error loading employee data/i)).toBeInTheDocument();
  });
});