import { Link } from 'react-router-dom';
import AppRouter from './AppRouter';

export interface Pokemon {
  name: string;
  description: string;
  image: string;
}

const App = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <header>
        <nav style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
          <Link to="/">Main</Link>
          <Link to="/about">About Us</Link>
        </nav>
      </header>

      <main>
        <AppRouter />
      </main>
    </div>
  );
};

export default App;