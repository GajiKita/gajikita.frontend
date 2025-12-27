import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SBTCard } from '../SBTCard';

describe('SBTCard Component', () => {
  it('renders SBT information correctly', () => {
    render(<SBTCard />);

    expect(screen.getByText(/payroll sbt/i)).toBeInTheDocument();
    expect(screen.getByText(/soulbound token • erc-721/i)).toBeInTheDocument();
    expect(screen.getByText(/ahmad rizki/i)).toBeInTheDocument();
  });

  it('renders SBT attributes', () => {
    render(<SBTCard />);

    expect(screen.getByText(/employee/i)).toBeInTheDocument();
    expect(screen.getByText(/ahmad rizki/i)).toBeInTheDocument();
    expect(screen.getByText(/company/i)).toBeInTheDocument();
    expect(screen.getByText(/pt\. techindo global/i)).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<SBTCard className="custom-sbt" />);

    const card = screen.getByText(/payroll sbt/i).closest('.sbt-card');
    expect(card).toHaveClass('custom-sbt');
  });

  it('renders with action buttons', () => {
    render(<SBTCard />);

    expect(screen.getByRole('button', { name: /view on explorer/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
  });

  it('renders with status badge', () => {
    render(<SBTCard />);

    expect(screen.getByText(/active/i)).toBeInTheDocument();
  });

  it('renders with metadata info', () => {
    render(<SBTCard />);

    expect(screen.getByText(/ipfs metadata/i)).toBeInTheDocument();
    expect(screen.getByText(/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/i)).toBeInTheDocument();
  });

  it('handles copy button click', () => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      }
    });

    render(<SBTCard />);

    const copyButton = screen.getByRole('button', { name: /copy/i });
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("ipfs://Qm...xyz789");
  });

  it('renders mini version when mini prop is true', () => {
    render(<SBTCard mini={true} />);

    expect(screen.getByText(/payroll sbt/i)).toBeInTheDocument();
    // Mini version should have different styling
  });

  it('renders with default mini prop as false', () => {
    render(<SBTCard />);

    // Full version should be rendered by default
    expect(screen.getByText(/employee/i)).toBeInTheDocument();
    expect(screen.getByText(/ahmad rizki/i)).toBeInTheDocument();
  });
});