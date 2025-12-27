import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '../badge';

describe('Badge Component', () => {
  it('renders badge with default props', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText(/default badge/i);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-primary');
  });

  it('renders badge with different variants', () => {
    render(
      <>
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </>
    );

    expect(screen.getByText(/default/i)).toHaveClass('bg-primary');
    expect(screen.getByText(/secondary/i)).toHaveClass('bg-secondary');
    expect(screen.getByText(/destructive/i)).toHaveClass('bg-destructive');
    expect(screen.getByText(/outline/i)).toHaveClass('text-foreground');
  });

  it('renders badge with custom className', () => {
    render(<Badge className="custom-badge">Custom Badge</Badge>);
    const badge = screen.getByText(/custom badge/i);
    expect(badge).toHaveClass('custom-badge');
  });

  it('renders badge with default variant', () => {
    render(<Badge>Default Variant</Badge>);
    const badge = screen.getByText(/default variant/i);
    expect(badge).toHaveClass('border-transparent');
    expect(badge).toHaveClass('bg-primary');
    expect(badge).toHaveClass('text-primary-foreground');
    expect(badge).toHaveClass('hover:bg-primary/80');
  });

  it('renders badge with icon', () => {
    const BadgeWithIcon = () => (
      <Badge>
        <span role="img" aria-label="check">
          ✅
        </span>
        Success
      </Badge>
    );

    render(<BadgeWithIcon />);
    const badge = screen.getByText(/success/i);
    expect(badge).toBeInTheDocument();
    expect(screen.getByLabelText(/check/i)).toBeInTheDocument();
  });

  it('renders badge with custom styling', () => {
    render(
      <Badge style={{ backgroundColor: 'red', color: 'white' }}>
        Styled Badge
      </Badge>
    );
    const badge = screen.getByText(/styled badge/i);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveStyle('background-color: red');
    expect(badge).toHaveStyle('color: white');
  });

  it('renders with additional props', () => {
    render(<Badge id="test-badge" data-testid="badge-test">Test Badge</Badge>);
    const badge = screen.getByTestId('badge-test');
    expect(badge).toHaveAttribute('id', 'test-badge');
  });

  it('renders badge with complex content', () => {
    render(
      <Badge>
        Status: <strong>Active</strong>
      </Badge>
    );

    expect(screen.getByText(/status:/i)).toBeInTheDocument();
    const strongElement = screen.getByText(/active/i);
    expect(strongElement).toBeInTheDocument();
    expect(strongElement.tagName).toBe('STRONG');
  });
});