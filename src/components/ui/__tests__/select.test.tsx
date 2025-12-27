import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../select'; // Assuming the select components are in the same directory

describe('Select Component', () => {
  it('renders select trigger correctly', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByText(/select an option/i)).toBeInTheDocument();
  });

  it('opens select when trigger is clicked', async () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    fireEvent.focus(trigger); // Focus to trigger the dropdown
    fireEvent.keyDown(trigger, { key: 'ArrowDown' }); // Open the dropdown

    await waitFor(() => {
      expect(screen.getByRole('option', { name: /option 1/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /option 2/i })).toBeInTheDocument();
    });
  });

  it('selects an option', async () => {
    const handleChange = jest.fn();
    
    const TestSelect = () => {
      return (
        <Select onValueChange={handleChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      );
    };

    render(<TestSelect />);

    const trigger = screen.getByRole('combobox');
    fireEvent.focus(trigger);
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });

    await waitFor(() => {
      expect(screen.getByRole('option', { name: /option 1/i })).toBeInTheDocument();
    });

    const option1 = screen.getByRole('option', { name: /option 1/i });
    fireEvent.click(option1);

    expect(handleChange).toHaveBeenCalledWith('option1');
    expect(screen.getByText(/option 1/i)).toBeInTheDocument();
  });

  it('renders with default value', () => {
    render(
      <Select defaultValue="option2">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByText(/option 2/i)).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose a country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByText(/choose a country/i)).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeDisabled();
  });

  it('renders with multiple options correctly', async () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    fireEvent.focus(trigger);
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });

    await waitFor(() => {
      expect(screen.getByRole('option', { name: /apple/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /banana/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /orange/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /grape/i })).toBeInTheDocument();
    });
  });
});