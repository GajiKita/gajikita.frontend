import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../dialog'; // Assuming the dialog components are in the same directory
import { Button } from '../button';

describe('Dialog Component', () => {
  it('renders dialog trigger correctly', () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
          <p>Dialog Content</p>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByRole('button', { name: /open dialog/i })).toBeInTheDocument();
  });

  it('opens dialog when trigger is clicked', async () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
          </DialogHeader>
          <p>Dialog Content</p>
        </DialogContent>
      </Dialog>
    );

    const triggerButton = screen.getByRole('button', { name: /open dialog/i });
    fireEvent.click(triggerButton);

    await waitFor(() => {
      expect(screen.getByText(/dialog title/i)).toBeInTheDocument();
      expect(screen.getByText(/dialog description/i)).toBeInTheDocument();
      expect(screen.getByText(/dialog content/i)).toBeInTheDocument();
    });
  });

  it('closes dialog when close button is clicked', async () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          <p>Dialog Content</p>
        </DialogContent>
      </Dialog>
    );

    const triggerButton = screen.getByRole('button', { name: /open dialog/i });
    fireEvent.click(triggerButton);

    await waitFor(() => {
      expect(screen.getByText(/dialog title/i)).toBeInTheDocument();
    });

    // Find and click the close button (usually an X icon)
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText(/dialog title/i)).not.toBeInTheDocument();
    });
  });

  it('renders with custom title and description', async () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Custom Title</DialogTitle>
            <DialogDescription>Custom Description</DialogDescription>
          </DialogHeader>
          <p>Custom Content</p>
        </DialogContent>
      </Dialog>
    );

    const triggerButton = screen.getByRole('button', { name: /open dialog/i });
    fireEvent.click(triggerButton);

    await waitFor(() => {
      expect(screen.getByText(/custom title/i)).toBeInTheDocument();
      expect(screen.getByText(/custom description/i)).toBeInTheDocument();
      expect(screen.getByText(/custom content/i)).toBeInTheDocument();
    });
  });

  it('renders dialog footer when provided', async () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          <p>Dialog Content</p>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const triggerButton = screen.getByRole('button', { name: /open dialog/i });
    fireEvent.click(triggerButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
    });
  });

  it('does not render dialog content when not open', () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          <p>Dialog Content</p>
        </DialogContent>
      </Dialog>
    );

    expect(screen.queryByText(/dialog title/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/dialog content/i)).not.toBeInTheDocument();
  });
});