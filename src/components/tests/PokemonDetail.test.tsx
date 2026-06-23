import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PokemonDetail from '../PokemonDetail';
import { expect, test, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

test('renders pokemon details', async () => {
  const queryClient = createTestQueryClient();

  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        name: 'pikachu',
        weight: 60,
        height: 4,
        sprites: { front_default: 'url' },
      }),
    })
  );

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/details/pikachu']}>
        <Routes>
          <Route path="/details/:id" element={<PokemonDetail />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  expect(screen.getByText(/Weight:/)).toBeInTheDocument();
  expect(screen.getByText(/60/)).toBeInTheDocument();
});
