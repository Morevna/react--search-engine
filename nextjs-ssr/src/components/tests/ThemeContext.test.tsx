import { render, screen, fireEvent } from '@testing-library/react';
import { useContext } from 'react';
import { ThemeProvider, ThemeContext } from '../../context/ThemeContext';
import { expect, test } from 'vitest';

const TestComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Change</button>
    </div>
  );
};

test('ThemeContext toggles theme', () => {
  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );

  expect(screen.getByTestId('theme').textContent).toBe('light');
  fireEvent.click(screen.getByText('Change'));
  expect(screen.getByTestId('theme').textContent).toBe('dark');
});
