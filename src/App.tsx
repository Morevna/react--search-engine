import Search from './components/Search';
import Results from './components/Results';
import TestErrorButton from './components/TestErrorButton';
import { useState, useEffect, useCallback } from 'react';

export interface Pokemon {
  name: string;
  description: string;
  image: string;
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('savedSearch') || ''
  );
  const [results, setResults] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (term: string) => {
    setIsLoading(true);
    setError(null);

    const trimmed = term.trim();

    try {
      const url = trimmed
        ? `https://pokeapi.co/api/v2/pokemon/${trimmed.toLowerCase()}`
        : `https://pokeapi.co/api/v2/pokemon?limit=10`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Pokemon not found');

      const data = await response.json();

      if (data.results) {
        const detailed = await Promise.all(
          data.results.map(async (pokemon: { name: string; url: string }) => {
            const res = await fetch(pokemon.url);
            const pokemonData = await res.json();
            return {
              name: pokemonData.name,
              description: `Base experience: ${pokemonData.base_experience}`,
              image: pokemonData.sprites.front_default,
            };
          })
        );
        setResults(detailed);
      } else {
        setResults([
          {
            name: data.name,
            description: `Base experience: ${data.base_experience}`,
            image: data.sprites.front_default,
          },
        ]);
      }
    } catch {
      setError('Failed to load data. Please try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initFetch = async () => {
      if (isMounted) {
        await fetchData(searchTerm);
      }
    };

    initFetch();

    return () => {
      isMounted = false;
    };
  }, [fetchData, searchTerm]);

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    localStorage.setItem('savedSearch', trimmed);
    fetchData(trimmed);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <section
        style={{
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          marginBottom: '20px',
          background: '#f5f5f5',
        }}
      >
        <Search
          value={searchTerm}
          onChange={handleInputChange}
          onSearch={handleSearch}
        />
      </section>

      <section
        style={{
          minHeight: '400px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '10px',
        }}
      >
        <Results results={results} isLoading={isLoading} error={error} />
        <TestErrorButton />
      </section>
    </div>
  );
};

export default App;
