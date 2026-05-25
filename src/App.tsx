import { Link } from 'react-router-dom';
import AppRouter from './AppRouter';
import Flyout from './components/Flyout';
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';

export interface Pokemon {
  name: string;
  description: string;
  image: string;
}

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '900px',
        margin: '0 auto',
        paddingBottom: '80px',
      }}
    >
      <button onClick={toggleTheme} style={{ float: 'right' }}>
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>

      <header>
        <nav style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
          <Link to="/">Main</Link>
          <Link to="/about">About Us</Link>
        </nav>
      </header>

      <main>
        <AppRouter />
      </main>
      <Flyout />
    </div>
  );
};

export default App;
