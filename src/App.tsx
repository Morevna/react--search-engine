import { Component } from 'react';

interface Entity {
  name: string;
  url: string;
}

interface State {
  searchTerm: string;
  results: Entity[];
  isLoading: boolean;
}

class App extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('savedSearch') || '',
      results: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ isLoading: true });
    const { searchTerm } = this.state;

    try {
      const url = searchTerm
        ? `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase().trim()}`
        : 'https://pokeapi.co/api/v2/pokemon?limit=10';

      const response = await fetch(url);
      const data = await response.json();

      const results = data.results
        ? data.results
        : [{ name: data.name, url: '' }];
      this.setState({ results, isLoading: false });
    } catch (error) {
      console.error(error);
      this.setState({ results: [], isLoading: false });
    }
  };

  handleSearch = () => {
    const trimmed = this.state.searchTerm.trim();
    if (trimmed !== localStorage.getItem('savedSearch')) {
      localStorage.setItem('savedSearch', trimmed);
      this.fetchData();
    }
  };

  render() {
    return (
      <div style={{ padding: '20px' }}>
        <section
          style={{ borderBottom: '1px solid #ccc', paddingBottom: '20px' }}
        >
          <input
            type="text"
            value={this.state.searchTerm}
            onChange={(e) => this.setState({ searchTerm: e.target.value })}
            placeholder="Например: pikachu"
          />
          <button onClick={this.handleSearch}>Search</button>
        </section>

        <section style={{ marginTop: '20px' }}>
          {this.state.isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {this.state.results.map((item, index) => (
                <li key={index}>
                  <strong>{item.name}</strong>
                  <p>URL: {item.url || 'Detail view'}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    );
  }
}

export default App;
