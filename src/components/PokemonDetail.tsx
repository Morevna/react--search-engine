import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface PokemonData {
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
}

const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadPokemonDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error();
        const data: PokemonData = await res.json();
        setDetails(data);
      } catch (error) {
        console.error('Failed to fetch details', error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemonDetails();
  }, [id]);

  if (loading) return <div>Loading details...</div>;
  if (!details) return null;

  return (
    <div
      style={{
        padding: '20px',
        borderLeft: '2px solid #ccc',
        position: 'relative',
      }}
    >
      <button
        onClick={() => navigate('/')}
        style={{ position: 'absolute', right: 10, top: 10, cursor: 'pointer' }}
        aria-label="Close"
      >
        ✖
      </button>
      <h2 style={{ textTransform: 'capitalize' }}>{details.name}</h2>
      <img
        src={details.sprites.front_default}
        alt={details.name}
        style={{ width: '150px' }}
      />
      <p>
        <strong>Weight:</strong> {details.weight}
      </p>
      <p>
        <strong>Height:</strong> {details.height}
      </p>
    </div>
  );
};

export default PokemonDetail;
