import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuPortal } from '../dropdown-menu'; // Assuming the dropdown components are in the same directory
import { Button } from '../button';

describe('DropdownMenu Component', () => {
  it('renders dropdown trigger correctly', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Option 1</DropdownMenuItem>
          <DropdownMenuItem>Option 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  it('opens dropdown when trigger is clicked', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Option 1</DropdownMenuItem>
          <DropdownMenuItem>Option 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const triggerButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(triggerButton);

    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: /option 1/i })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /option 2/i })).toBeInTheDocument();
    });
  });

  it('closes dropdown when clicking outside', async () => {
    render(
      <>
        <div data-testid="outside">Outside Content</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Option 1</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );

    const triggerButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(triggerButton);

    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: /option 1/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('outside'));

    await waitFor(() => {
      expect(screen.queryByRole('menuitem', { name: /option 1/i })).not.toBeInTheDocument();
    });
  });

  it('renders dropdown with labels and separators', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const triggerButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(triggerButton);

    await waitFor(() => {
      expect(screen.getByText(/account/i)).toBeInTheDocument();
      expect(screen.getByText(/profile/i)).toBeInTheDocument();
      expect(screen.getByText(/billing/i)).toBeInTheDocument();
      expect(screen.getByText(/settings/i)).toBeInTheDocument();
      expect(screen.getByText(/keyboard shortcuts/i)).toBeInTheDocument();
    });
  });

  it('handles dropdown menu item clicks', async () => {
    const handleOption1Click = jest.fn();
    const handleOption2Click = jest.fn();

    const TestDropdown = () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleOption1Click}>Option 1</DropdownMenuItem>
            <DropdownMenuItem onClick={handleOption2Click}>Option 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    };

    render(<TestDropdown />);

    const triggerButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(triggerButton);

    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: /option 1/i })).toBeInTheDocument();
    });

    const option1 = screen.getByRole('menuitem', { name: /option 1/i });
    fireEvent.click(option1);
    expect(handleOption1Click).toHaveBeenCalledTimes(1);

    const option2 = screen.getByRole('menuitem', { name: /option 2/i });
    fireEvent.click(option2);
    expect(handleOption2Click).toHaveBeenCalledTimes(1);
  });

  it('renders dropdown with portal when specified', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent>
            <DropdownMenuItem>Portal Option</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    );

    const triggerButton = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(triggerButton);

    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: /portal option/i })).toBeInTheDocument();
    });
  });
});