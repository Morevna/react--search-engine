import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>404 - Страница не найдена</h1>
      <p>Похоже, вы заблудились. Больше так не делайте. Если потерялись — всегда идите домой </p>
      <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>Вернуться</Link>
    </div>
  );
};

export default NotFound;