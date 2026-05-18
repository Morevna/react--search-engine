import { useState, useEffect, useCallback } from 'react';
import Search from '../components/Search';
import Results from '../components/Results';
import TestErrorButton from '../components/TestErrorButton';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Pokemon } from '../App';

const Main = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('savedSearch', '');
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
          data.results.map(async (p: { name: string; url: string }) => {
            const res = await fetch(p.url);
            const pd = await res.json();
            return {
              name: pd.name,
              description: `Base experience: ${pd.base_experience}`,
              image: pd.sprites.front_default,
            };
          })
        );
        setResults(detailed);
      } else {
        setResults([{
          name: data.name,
          description: `Base experience: ${data.base_experience}`,
          image: data.sprites.front_default,
        }]);
      }
    } catch {
      setError('Failed to load data. Please try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await fetchData(searchTerm);
    };
    
    loadData();
  }, [fetchData, searchTerm]);

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (trimmed === localStorage.getItem('savedSearch')) return;
    fetchData(trimmed);
  };

  return (
    <>
      <section style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px', marginBottom: '20px', background: '#f5f5f5' }}>
        <Search value={searchTerm} onChange={setSearchTerm} onSearch={handleSearch} />
      </section>
      <section style={{ minHeight: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
        <Results results={results} isLoading={isLoading} error={error} />
        <TestErrorButton />
      </section>
    </>
  );
};

export default Main;