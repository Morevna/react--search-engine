import { Link, Outlet, useSearchParams } from 'react-router-dom';
import { usePokemons } from '../hooks/usePokemonQueries';
import { useQueryClient } from '@tanstack/react-query';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Search from '../components/Search';
import Results from '../components/Results';
import PokemonCard from '../components/PokemonCard';
import TestErrorButton from '../components/TestErrorButton';

const Main = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('savedSearch', '');
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const {
    data: results = [],
    isLoading,
    error,
  } = usePokemons(searchTerm, currentPage);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['pokemons'] });
  };

  const handleSearch = () => {
    setSearchParams({ page: '1' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <section
        style={{
          padding: '20px',
          background: '#f5f5f5',
          borderRadius: '10px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Search
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
        />
        <button
          onClick={handleRefresh}
          style={{
            padding: '10px',
            cursor: 'pointer',
            backgroundColor: '#e0e0e0',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          🔄 Refresh
        </button>
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
                  <PokemonCard pokemon={p} />
                </Link>
              ))
            ) : (
              <Results
                results={results}
                isLoading={isLoading}
                error={error ? error.message : null}
              />
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
