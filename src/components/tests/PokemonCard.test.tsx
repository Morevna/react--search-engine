import { render, screen } from '@testing-library/react';
import PokemonCard from '../PokemonCard';

const mockPokemon = {
  name: 'pikachu',
  description: 'Base experience: 112',
  image: 'https://raw.githubusercontent.com/.../25.png',
};

describe('PokemonCard', () => {
  it('renders pokemon data correctly', () => {
    render(<PokemonCard pokemon={mockPokemon} />);

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText(/base experience: 112/i)).toBeInTheDocument();
    const img = screen.getByAltText('pikachu');
    expect(img).toHaveAttribute('src', mockPokemon.image);
  });
});
