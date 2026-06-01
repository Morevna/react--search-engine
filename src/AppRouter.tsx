import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import About from './pages/About';
import NotFound from './pages/NotFound';
import PokemonDetail from './components/PokemonDetail';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Main />}>
      <Route path="details/:id" element={<PokemonDetail />} />
    </Route>
    <Route path="/about" element={<About />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
export default AppRouter;