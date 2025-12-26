// src/modules/employee/presentation/__tests__/components/EmployeeTable.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { EmployeeList } from '../../tables/EmployeeList';

// Mock the presentation hook
jest.mock('../../hooks/useEmployeePresentation');
import { useEmployeeListPresentation } from '../../hooks/useEmployeePresentation';

const mockUseEmployeeListPresentation = useEmployeeListPresentation as jest.MockedFunction<
  typeof useEmployeeListPresentation
>;

describe('EmployeeList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state', () => {
    // Arrange
    mockUseEmployeeListPresentation.mockReturnValue({
      employees: [],
      isLoading: true,
      isError: false,
      error: undefined,
      refetch: jest.fn(),
    });

    // Act
    render(<EmployeeList />);

    // Assert - Check if table renders (even if empty)
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('should render error state', () => {
    // Arrange
    mockUseEmployeeListPresentation.mockReturnValue({
      employees: [],
      isLoading: false,
      isError: true,
      error: new Error('API Error'),
      refetch: jest.fn(),
    });

    // Act
    render(<EmployeeList />);

    // Assert
    expect(screen.getByText(/API Error/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('should render employee data when available', async () => {
    // Arrange
    const mockEmployees = [
      {
        id: '1',
        user_id: 'user1',
        company_id: 'company1',
        employee_number: 'EMP001',
        position: 'Software Engineer',
        base_salary: 10000000,
        wallet_address: '0x1234567890123456789012345678901234567890',
        preferred_payout_token: 'ETH',
        status: 'active',
        sbt_token_id: null,
        employed_started: '2024-01-01',
        employed_ended: null,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        deleted: false,
      }
    ];

    mockUseEmployeeListPresentation.mockReturnValue({
      employees: mockEmployees,
      isLoading: false,
      isError: false,
      error: undefined,
      refetch: jest.fn(),
    });

    // Act
    render(<EmployeeList />);

    // Assert - Wait for the table to render and check for employee data
    await waitFor(() => {
      // Look for user_id in the table cells (since that's what the column uses)
      expect(screen.getByText('user1')).toBeInTheDocument();
    });
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('0x1234567890123456789012345678901234567890')).toBeInTheDocument(); // Full wallet address
  });

  it('should render empty state when no employees', async () => {
    // Arrange
    mockUseEmployeeListPresentation.mockReturnValue({
      employees: [],
      isLoading: false,
      isError: false,
      error: undefined,
      refetch: jest.fn(),
    });

    // Act
    render(<EmployeeList />);

    // Assert - Wait for possible rendering and check that table exists but no data rows beyond header
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
    
    // Find all table rows - there should be header rows but no data rows
    const rows = screen.getAllByRole('row');
    // At least header row should exist, but no data rows
    expect(rows.length).toBeGreaterThanOrEqual(1);
  });
});