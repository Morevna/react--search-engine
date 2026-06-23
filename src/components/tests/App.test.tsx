import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, type Mock } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockPokemonList = {
  results: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }],
};

const mockSinglePokemon = {
  name: 'pikachu',
  base_experience: 112,
  sprites: { front_default: 'pika-img' },
};

describe('App Integration', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();

    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: Infinity,
        },
      },
    });

    globalThis.fetch = vi.fn((url: string) => {
      if (url.includes('limit=10')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonList),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSinglePokemon),
      });
    }) as Mock;
  });

  it('performs search and updates localStorage', async () => {
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>
        </QueryClientProvider>
      );
    });

    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalled());

    const input = screen.getByPlaceholderText(/search pokemon/i);
    const button = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      fireEvent.change(input, { target: { value: 'pikachu' } });
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });

    expect(localStorage.getItem('savedSearch')).toBe('pikachu');
  });

  it('does not trigger a new fetch if search term is the same as saved', async () => {
    localStorage.setItem('savedSearch', 'pikachu');

    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/?page=1']}>
            <App />
          </MemoryRouter>
        </QueryClientProvider>
      );
    });

    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalled());
    const initialCallCount = (globalThis.fetch as Mock).mock.calls.length;

    const button = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect((globalThis.fetch as Mock).mock.calls.length).toBe(initialCallCount);
  });

  it('handles API error gracefully', async () => {
    (globalThis.fetch as Mock).mockResolvedValueOnce({ ok: false });

    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>
        </QueryClientProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/pokemon not found/i)).toBeInTheDocument();
    });
  });
});
