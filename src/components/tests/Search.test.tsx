import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Search from '../Search';

describe('Search Component', () => {
  const mockProps = {
    value: '',
    onChange: vi.fn(),
    onSearch: vi.fn(),
  };

  it('renders input and button', () => {
    render(<Search {...mockProps} />);
    expect(screen.getByPlaceholderText(/search pokemon/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    render(<Search {...mockProps} />);
    const input = screen.getByPlaceholderText(/search pokemon/i);
    fireEvent.change(input, { target: { value: 'pikachu' } });
    expect(mockProps.onChange).toHaveBeenCalledWith('pikachu');
  });

  it('calls onSearch on button click', () => {
    render(<Search {...mockProps} />);
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);
    expect(mockProps.onSearch).toHaveBeenCalled();
  });

  it('triggers onSearch when Enter key is pressed', () => {
    const onSearchMock = vi.fn();
    render(<Search value="test" onChange={vi.fn()} onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText(/search pokemon/i);
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(onSearchMock).toHaveBeenCalledTimes(1);
  });
});
