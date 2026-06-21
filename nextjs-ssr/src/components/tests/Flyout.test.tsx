import { render, screen, fireEvent, act } from '@testing-library/react';
import Flyout from '../Flyout';
import { usePokemonStore } from '../../store/usePokemonStore';
import { expect, test, vi } from 'vitest';

test('Flyout actions work', async () => {
  act(() => {
    usePokemonStore.setState({ 
      selected: [{ name: 'bulbasaur', description: 'test', image: '' }] 
    });
  });

  const { rerender } = render(<Flyout />);
  const downloadBtn = screen.getByText(/Download/i);
  expect(downloadBtn).toBeInTheDocument();

  vi.stubGlobal('URL', {
    createObjectURL: vi.fn(() => 'mock-url'),
    revokeObjectURL: vi.fn(),
  });
  
  fireEvent.click(downloadBtn);
  expect(URL.createObjectURL).toHaveBeenCalled();

  const clearBtn = screen.getByText(/Unselect all/i);
  act(() => {
    fireEvent.click(clearBtn);
  });

  rerender(<Flyout />);
  expect(screen.queryByText(/Download/i)).not.toBeInTheDocument();
});