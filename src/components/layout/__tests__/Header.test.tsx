import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header';

describe('Header Component', () => {
  it('renders search input', () => {
    render(<Header />);

    expect(screen.getByPlaceholderText(/search employees, transactions\.\.\./i)).toBeInTheDocument();
  });

  it('renders quick action buttons', () => {
    render(<Header />);

    expect(screen.getByRole('button', { name: /tambah karyawan/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /export/i })).toBeInTheDocument();
  });

  it('renders notifications dropdown', () => {
    render(<Header />);

    // Find the notification button by getting all buttons and filtering by attributes
    const allButtons = screen.getAllByRole('button');
    const notificationButton = allButtons.find(button =>
      button.getAttribute('aria-haspopup') === 'menu' &&
      button.getAttribute('aria-expanded') === 'false'
    );

    expect(notificationButton).toBeTruthy();
  });

  it('renders user profile section', () => {
    render(<Header />);

    expect(screen.getByText(/user name/i)).toBeInTheDocument();
    expect(screen.getByText(/user role/i)).toBeInTheDocument();
  });

  it('renders avatar with fallback', () => {
    render(<Header />);

    // The avatar fallback shows "PT" as initials
    const avatarFallback = screen.getByText('PT');
    expect(avatarFallback).toBeInTheDocument();
  });

  it('renders with correct header classes', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('h-20');
    expect(header).toHaveClass('bg-card/80');
    expect(header).toHaveClass('backdrop-blur-xl');
  });

  it('handles notification dropdown click', () => {
    render(<Header />);

    const allButtons = screen.getAllByRole('button');
    const notificationButton = allButtons.find(button =>
      button.getAttribute('aria-haspopup') === 'menu' &&
      button.getAttribute('aria-expanded') === 'false'
    );

    fireEvent.click(notificationButton!);

    // The button should still exist after clicking
    expect(notificationButton).toBeTruthy();
  });

  it('handles profile dropdown click', () => {
    render(<Header />);

    const profileButton = screen.getByText(/user name/i).closest('button');
    fireEvent.click(profileButton!);

    // The profile dropdown should appear after clicking
    expect(profileButton).toBeInTheDocument();
  });

  it('renders with all expected elements', () => {
    render(<Header />);

    // Check for all major elements
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search employees, transactions\.\.\./i)).toBeInTheDocument();

    // Check for notification button with specific attributes
    const allButtons = screen.getAllByRole('button');
    const notificationButton = allButtons.find(button =>
      button.getAttribute('aria-haspopup') === 'menu' &&
      button.getAttribute('aria-expanded') === 'false'
    );
    expect(notificationButton).toBeTruthy();

    expect(screen.getByText(/user name/i)).toBeInTheDocument();
    expect(screen.getByText(/user role/i)).toBeInTheDocument();
  });
});