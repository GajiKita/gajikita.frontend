import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from '../Sidebar';

describe('Sidebar Component', () => {
  it('renders navigation links correctly', () => {
    render(<Sidebar />);

    // The HR role has specific navigation links
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /karyawan/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /companies/i })).toBeInTheDocument();
  });

  it('renders with active navigation item', () => {
    render(<Sidebar />);

    // Default active item would be based on current route
    const activeLink = screen.getByRole('link', { name: /dashboard/i });
    expect(activeLink).toHaveClass('bg-sidebar-primary');
  });

  it('renders logo section', () => {
    render(<Sidebar />);

    expect(screen.getByAltText(/gajikita/i)).toBeInTheDocument();
  });

  it('handles role switching', () => {
    const onRoleChange = jest.fn();
    render(<Sidebar role="hr" onRoleChange={onRoleChange} />);

    const roleSwitchButton = screen.getByText(/switch role/i);
    fireEvent.click(roleSwitchButton);

    expect(onRoleChange).toHaveBeenCalledWith('employee');
  });

  it('renders with collapsible functionality', () => {
    render(<Sidebar collapsed={false} />);

    const sidebar = screen.getByText(/gajikita/i).closest('aside');
    expect(sidebar).toHaveClass('w-64');

    render(<Sidebar collapsed={true} />);
    const collapsedSidebar = screen.getByText(/gajikita/i).closest('aside');
    expect(collapsedSidebar).toHaveClass('w-20');
  });

  it('renders with mobile menu toggle', () => {
    render(<Sidebar />);

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
  });

  it('renders different menu items based on user role', () => {
    // HR role menu items
    render(<Sidebar role="hr" />);
    expect(screen.getByText(/karyawan/i)).toBeInTheDocument();

    // Employee role menu items
    render(<Sidebar role="employee" />);
    expect(screen.getByText(/withdraw/i)).toBeInTheDocument();
  });

  it('renders role switch section', () => {
    render(<Sidebar role="hr" />);

    expect(screen.getByText(/hr admin/i)).toBeInTheDocument();
    expect(screen.getByText(/switch role/i)).toBeInTheDocument();
  });

  it('renders with custom collapsed behavior', () => {
    render(<Sidebar collapsed={true} />);

    const sidebar = screen.getByText(/gajikita/i).closest('aside');
    expect(sidebar).toHaveClass('w-20');
  });

  it('renders navigation items correctly', () => {
    render(<Sidebar role="hr" />);

    // Check if navigation items are present
    const navItems = screen.getAllByRole('link');
    expect(navItems.length).toBeGreaterThan(5); // More than 5 navigation items for HR
  });
});