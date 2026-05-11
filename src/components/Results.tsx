import { Component } from 'react';
import PokemonCard from './PokemonCard';
import Loader from './Loader';
import type { Pokemon } from '../App';

interface Props {
  results: Pokemon[];
  isLoading: boolean;
  error: string | null;
}

class Results extends Component<Props> {
  render() {
    const { results, isLoading, error } = this.props;

    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return (
        <p
          style={{
            color: 'red',
          }}
        >
          {error}
        </p>
      );
    }

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
        }}
      >
        {results.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    );
  }
}

export default Results;
