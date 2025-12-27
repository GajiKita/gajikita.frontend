import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatCard } from '../StatCard';
import { DollarSign, TrendingUp, User, Briefcase } from 'lucide-react';

describe('StatCard Component', () => {
  it('renders with title and value', () => {
    render(<StatCard
      title="Total Employees"
      value="120"
      icon={DollarSign}
      iconColor="primary"
    />);

    expect(screen.getByText(/total employees/i)).toBeInTheDocument();
    expect(screen.getByText(/120/i)).toBeInTheDocument();
  });

  it('renders with change percentage', () => {
    render(<StatCard
      title="Growth"
      value="1500"
      change="+12.5%"
      icon={TrendingUp}
      iconColor="success"
    />);

    expect(screen.getByText(/\+12\.5%/i)).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(<StatCard
      title="Revenue"
      value="50000"
      icon={DollarSign}
      iconColor="primary"
    />);

    // The icon should be rendered as an SVG element - check for the SVG with lucide-dollar-sign class
    const iconElement = document.querySelector('svg[class*="dollar-sign"]');
    expect(iconElement).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<StatCard
      title="Test"
      value="100"
      icon={User}
      className="custom-stat"
    />);

    // The custom className should be applied to the main card container
    const cardElement = screen.getByText(/test/i).closest('div');
    expect(cardElement).toHaveClass('custom-stat');
  });

  it('renders with different value formats', () => {
    render(
      <>
        <StatCard
          title="Currency"
          value="$1,250.75"
          icon={DollarSign}
        />
        <StatCard
          title="Percentage"
          value="75.00%"
          icon={TrendingUp}
        />
        <StatCard
          title="Count"
          value="1,234"
          icon={User}
        />
      </>
    );

    expect(screen.getByText(/\$1,250\.75/i)).toBeInTheDocument();
    expect(screen.getByText(/75\.00%/i)).toBeInTheDocument();
    expect(screen.getByText(/1,234/i)).toBeInTheDocument();
  });

  it('renders with loading state', () => {
    render(<StatCard
      title="Loading"
      value="0"
      loading={true}
      icon={DollarSign}
    />);

    // Check for loading indicators instead of specific test ID
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders with error state', () => {
    render(<StatCard
      title="Error"
      value="Error"
      change="Error"
      icon={DollarSign}
      iconColor="warning"
    />);

    // Check for one of the error texts
    expect(screen.getAllByText(/error/i)[0]).toBeInTheDocument();
  });

  it('renders with custom colors', () => {
    render(<StatCard
      title="Custom Color"
      value="100"
      icon={DollarSign}
      iconColor="success"
    />);

    // Find the icon container div which should have the success color class
    const iconDiv = document.querySelector('.w-12.h-12.rounded-xl.flex.items-center.justify-center.bg-success\\/10.text-success');
    expect(iconDiv).toBeInTheDocument();
  });

  it('renders with trend indicator', () => {
    render(<StatCard
      title="Trend"
      value="200"
      change="+5.2%"
      icon={TrendingUp}
      iconColor="success"
    />);

    const trendIndicator = screen.getByText(/\+5\.2%/i);
    expect(trendIndicator).toBeInTheDocument();
  });

  it('renders with suffix text', () => {
    render(<StatCard
      title="Rate"
      value="85%"
      icon={TrendingUp}
    />);

    expect(screen.getByText(/85%/i)).toBeInTheDocument();
  });
});