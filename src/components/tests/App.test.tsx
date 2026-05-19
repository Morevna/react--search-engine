import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, type Mock } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

const mockPokemonList = {
  results: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }],
};

const mockSinglePokemon = {
  name: 'pikachu',
  base_experience: 112,
  sprites: { front_default: 'pika-img' },
};

describe('App Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();

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
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
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
    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalled());
    (globalThis.fetch as Mock).mockClear();

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(globalThis.fetch).toHaveBeenCalledTimes(0);
  });

  it('handles API error gracefully', async () => {
    (globalThis.fetch as Mock).mockResolvedValueOnce({ ok: false });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText(/failed to load data. please try again./i)
      ).toBeInTheDocument();
    });
  });
});