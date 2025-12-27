import React from 'react';
import { render, screen } from '@testing-library/react';
import { DashboardLayout } from '../DashboardLayout';

describe('DashboardLayout Component', () => {
  it('renders children correctly', () => {
    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );

    expect(screen.getByText(/test content/i)).toBeInTheDocument();
  });

  it('renders header and sidebar', () => {
    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );

    // Assuming the layout has header and sidebar elements
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
    expect(screen.getByRole('complementary')).toBeInTheDocument(); // Sidebar
  });

  it('renders with custom className', () => {
    render(
      <DashboardLayout className="custom-layout">
        <div>Test Content</div>
      </DashboardLayout>
    );

    expect(screen.getByRole('main')).toHaveClass('custom-layout');
  });

  it('renders main content area', () => {
    render(
      <DashboardLayout>
        <div data-testid="main-content">Main Content</div>
      </DashboardLayout>
    );

    const mainContent = screen.getByTestId('main-content');
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toHaveTextContent(/main content/i);
  });

  it('renders navigation links in sidebar', () => {
    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );

    // Assuming there are navigation links in the sidebar
    const navLinks = screen.getAllByRole('link');
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it('renders user profile section in header', () => {
    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );

    // Assuming there's a user profile section in the header
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders with sidebar collapsed state', () => {
    render(
      <DashboardLayout sidebarCollapsed={true}>
        <div>Test Content</div>
      </DashboardLayout>
    );

    expect(screen.getByRole('complementary')).toHaveClass('collapsed');
  });

  it('renders with mobile sidebar state', () => {
    render(
      <DashboardLayout isMobile={true}>
        <div>Test Content</div>
      </DashboardLayout>
    );

    expect(screen.getByRole('complementary')).toHaveClass('mobile');
  });
});