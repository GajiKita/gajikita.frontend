import React from 'react';
import { render, screen } from '@testing-library/react';
import { BalanceCard } from '../BalanceCard';

describe('BalanceCard Component', () => {
  it('renders with balance information', () => {
    render(
      <BalanceCard 
        balance={5000000} 
        currency="IDR" 
        title="Available Balance" 
      />
    );
    
    expect(screen.getByText(/available balance/i)).toBeInTheDocument();
    expect(screen.getByText(/5,000,000/i)).toBeInTheDocument();
    expect(screen.getByText(/idr/i)).toBeInTheDocument();
  });

  it('renders with different balance types', () => {
    render(
      <BalanceCard 
        balance={2500} 
        currency="ETH" 
        title="Wallet Balance" 
        type="wallet"
      />
    );
    
    expect(screen.getByText(/wallet balance/i)).toBeInTheDocument();
    expect(screen.getByText(/2,500/i)).toBeInTheDocument();
  });

  it('renders with loading state', () => {
    render(<BalanceCard balance={0} currency="IDR" title="Loading" loading={true} />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders with error state', () => {
    render(<BalanceCard balance={0} currency="IDR" title="Error" error={true} />);
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it('renders with custom formatter', () => {
    render(
      <BalanceCard 
        balance={1234.567} 
        currency="USD" 
        title="Formatted Balance" 
        formatter={(value) => `$${value.toFixed(2)}`}
      />
    );
    
    expect(screen.getByText(/\$1234\.57/i)).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(
      <BalanceCard 
        balance={1000000} 
        currency="IDR" 
        title="Balance with Icon" 
        icon="💰"
      />
    );
    
    expect(screen.getByText(/💰/)).toBeInTheDocument();
  });

  it('renders with trend indicator', () => {
    render(
      <BalanceCard 
        balance={5000000} 
        currency="IDR" 
        title="Trending Balance" 
        trend={5.2}
      />
    );
    
    expect(screen.getByText(/\+5\.2%/i)).toBeInTheDocument();
  });

  it('renders with custom styling', () => {
    render(
      <BalanceCard 
        balance={1000000} 
        currency="IDR" 
        title="Styled Balance" 
        className="custom-balance"
      />
    );
    
    expect(screen.getByRole('article')).toHaveClass('custom-balance');
  });

  it('renders with additional info', () => {
    render(
      <BalanceCard 
        balance={5000000} 
        currency="IDR" 
        title="Balance with Info" 
        additionalInfo="Available for withdrawal"
      />
    );
    
    expect(screen.getByText(/available for withdrawal/i)).toBeInTheDocument();
  });

  it('renders with action button', () => {
    render(
      <BalanceCard 
        balance={5000000} 
        currency="IDR" 
        title="Balance with Action" 
        action={{ label: 'Withdraw', onClick: jest.fn() }}
      />
    );
    
    expect(screen.getByRole('button', { name: /withdraw/i })).toBeInTheDocument();
  });
});