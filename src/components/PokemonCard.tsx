import type { Pokemon } from '../App';

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '15px',
        textAlign: 'center',
        background: '#fafafa',
      }}
    >
      <img src={pokemon.image} alt={pokemon.name} width="120" />

      <h3>{pokemon.name}</h3>

      <p>{pokemon.description}</p>
    </div>
  );
};

export default PokemonCard;
