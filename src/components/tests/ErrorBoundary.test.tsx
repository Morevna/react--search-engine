import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';
import { vi } from 'vitest';

const ProblemChild = () => {
  throw new Error('Crashed!');
};

describe('ErrorBoundary', () => {
  it('catches error and displays fallback UI', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    spy.mockRestore();
  });
});
