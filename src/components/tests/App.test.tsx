import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, type Mock } from 'vitest';
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
    render(<App />);

    const input = screen.getByPlaceholderText(/search pokemon/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'pikachu' } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });

    expect(localStorage.getItem('savedSearch')).toBe('pikachu');
  });

  it('does not trigger a new fetch if search term is the same as saved', async () => {
    localStorage.setItem('savedSearch', 'pikachu');
    render(<App />);

    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.click(button);

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it('handles API error gracefully', async () => {
    (globalThis.fetch as Mock).mockResolvedValueOnce({ ok: false });

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText(/failed to load data. please try again./i)
      ).toBeInTheDocument();
    });
  });
});
