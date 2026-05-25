import { useState, useEffect, useCallback } from 'react';
import { Outlet, Link, useSearchParams } from 'react-router-dom';
import Search from '../components/Search';
import Results from '../components/Results';
import TestErrorButton from '../components/TestErrorButton';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Pokemon } from '../App';
import PokemonCard from '../components/PokemonCard';

const Main = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('savedSearch', '');
  const [results, setResults] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const fetchData = useCallback(async (term: string, page: number) => {
    setIsLoading(true);
    setError(null);
    const trimmed = term.trim();
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
      const url = trimmed
        ? `https://pokeapi.co/api/v2/pokemon/${trimmed.toLowerCase()}`
        : `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Not found');
      const data = await response.json();

      if (data.results) {
        const detailed = await Promise.all(
          data.results.map(async (p: { name: string; url: string }) => {
            const res = await fetch(p.url);
            return await res.json();
          })
        ).then((res) =>
          res.map((pd) => ({
            name: pd.name,
            description: `Base experience: ${pd.base_experience}`,
            image: pd.sprites.front_default,
          }))
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
    const load = async () => {
      await fetchData(searchTerm, currentPage);
    };

    load();
  }, [fetchData, searchTerm, currentPage]);

  const handleSearch = () => {
    const saved = localStorage.getItem('savedSearch') || '';

    if (searchTerm.trim() === saved.trim() && results.length > 0) return;

    setSearchParams({ page: '1' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <section
        style={{ padding: '20px', background: '#f5f5f5', borderRadius: '10px' }}
      >
        <Search
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
        />
      </section>

      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
      >
        <section
          style={{
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            {results.length > 0 && !isLoading && !error ? (
              results.map((p) => (
                <Link
                  key={p.name}
                  to={`/details/${p.name.toLowerCase()}?page=${currentPage}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                    marginBottom: '10px',
                  }}
                >
                  <PokemonCard pokemon={p} onClick={() => {}} />
                </Link>
              ))
            ) : (
              <Results results={results} isLoading={isLoading} error={error} />
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              disabled={currentPage <= 1}
              onClick={() =>
                setSearchParams({ page: (currentPage - 1).toString() })
              }
            >
              Prev
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={() =>
                setSearchParams({ page: (currentPage + 1).toString() })
              }
            >
              Next
            </button>
          </div>
          <TestErrorButton />
        </section>

        <section
          style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            background: '#fafafa',
          }}
        >
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default Main;
