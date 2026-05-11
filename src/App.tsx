import { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import TestErrorButton from './components/TestErrorButton';

export interface Pokemon {
  name: string;
  description: string;
  image: string;
}

interface State {
  searchTerm: string;
  results: Pokemon[];
  isLoading: boolean;
  error: string | null;
}

class App extends Component<object, State> {
  constructor(props: object) {
    super(props);

    this.state = {
      searchTerm: localStorage.getItem('savedSearch') || '',
      results: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount(): void {
    this.fetchData();
  }

  fetchData = async (): Promise<void> => {
    this.setState({
      isLoading: true,
      error: null,
    });

    const trimmed = this.state.searchTerm.trim();

    try {
      const url = trimmed
        ? `https://pokeapi.co/api/v2/pokemon/${trimmed.toLowerCase()}`
        : `https://pokeapi.co/api/v2/pokemon?limit=10`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Pokemon not found');
      }

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

        this.setState({
          results: detailed,
          isLoading: false,
        });
      } else {
        this.setState({
          results: [
            {
              name: data.name,
              description: `Base experience: ${data.base_experience}`,
              image: data.sprites.front_default,
            },
          ],
          isLoading: false,
        });
      }
    } catch {
      this.setState({
        error: 'Failed to load data. Please try again.',
        results: [],
        isLoading: false,
      });
    }
  };

  handleInputChange = (value: string): void => {
    this.setState({
      searchTerm: value,
    });
  };

  handleSearch = (): void => {
    const trimmed = this.state.searchTerm.trim();
    const saved = localStorage.getItem('savedSearch');

    if (trimmed === saved) {
      return;
    }

    localStorage.setItem('savedSearch', trimmed);

    this.setState(
      {
        searchTerm: trimmed,
      },
      this.fetchData
    );
  };

  render() {
    const { searchTerm, results, isLoading, error } = this.state;

    return (
      <div
        style={{
          padding: '20px',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
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
            onChange={this.handleInputChange}
            onSearch={this.handleSearch}
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
  }
}

export default App;
