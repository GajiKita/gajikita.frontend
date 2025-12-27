import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card'; // Assuming the card components are in the same directory
import { Button } from '../button';

describe('Card Component', () => {
  it('renders card structure correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <Button>Footer Button</Button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText(/card title/i)).toBeInTheDocument();
    expect(screen.getByText(/card description/i)).toBeInTheDocument();
    expect(screen.getByText(/card content/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /footer button/i })).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <Card className="custom-card" data-testid="custom-card">
        <CardHeader>
          <CardTitle>Custom Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Custom Content</p>
        </CardContent>
      </Card>
    );

    const cardElement = screen.getByTestId('custom-card');
    expect(cardElement).toHaveClass('custom-card');
  });

  it('renders card without header', () => {
    render(
      <Card>
        <CardContent>
          <p>Only Content</p>
        </CardContent>
      </Card>
    );

    expect(screen.getByText(/only content/i)).toBeInTheDocument();
    expect(screen.queryByText(/card title/i)).not.toBeInTheDocument();
  });

  it('renders card without footer', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Content without footer</p>
        </CardContent>
      </Card>
    );

    expect(screen.getByText(/card title/i)).toBeInTheDocument();
    expect(screen.getByText(/content without footer/i)).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders card with only content', () => {
    render(
      <Card>
        <CardContent>
          <p>Just Content</p>
        </CardContent>
      </Card>
    );

    expect(screen.getByText(/just content/i)).toBeInTheDocument();
  });

  it('renders multiple cards correctly', () => {
    render(
      <>
        <Card data-testid="card-1">
          <CardHeader>
            <CardTitle>Card 1</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Content 1</p>
          </CardContent>
        </Card>
        <Card data-testid="card-2">
          <CardHeader>
            <CardTitle>Card 2</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Content 2</p>
          </CardContent>
        </Card>
      </>
    );

    expect(screen.getByTestId('card-1')).toBeInTheDocument();
    expect(screen.getByTestId('card-2')).toBeInTheDocument();
    expect(screen.getByText(/card 1/i)).toBeInTheDocument();
    expect(screen.getByText(/card 2/i)).toBeInTheDocument();
    expect(screen.getByText(/content 1/i)).toBeInTheDocument();
    expect(screen.getByText(/content 2/i)).toBeInTheDocument();
  });

  it('renders card with all sections', () => {
    render(
      <Card>
        <CardHeader className="header-section">
          <CardTitle>Complete Card</CardTitle>
          <CardDescription>Complete Description</CardDescription>
        </CardHeader>
        <CardContent className="content-section">
          <p>Complete Content</p>
        </CardContent>
        <CardFooter className="footer-section">
          <Button>Complete Button</Button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText(/complete card/i)).toBeInTheDocument();
    expect(screen.getByText(/complete description/i)).toBeInTheDocument();
    expect(screen.getByText(/complete content/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /complete button/i })).toBeInTheDocument();
  });
});