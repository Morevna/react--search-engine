import { render, screen, fireEvent } from '@testing-library/react';
import TestErrorButton from '../TestErrorButton';

describe('TestErrorButton', () => {
  it('throws error when clicked', () => {
    render(<TestErrorButton />);
    const button = screen.getByRole('button', { name: /test error/i });

    expect(() => fireEvent.click(button)).toThrow('Test Error');
  });
});
