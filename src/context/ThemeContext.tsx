import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ 
        backgroundColor: theme === 'light' ? '#fff' : '#222', 
        color: theme === 'light' ? '#000' : '#1825bd',
        minHeight: '100vh',
        transition: 'all 0.3s ease' 
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export { ThemeContext };