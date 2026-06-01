import { usePokemonStore } from '../store/usePokemonStore';
import type { Pokemon } from '../App';

const Flyout = () => {
  const { selected, clear } = usePokemonStore();

  const handleDownload = () => {
    const headers = 'Name,Description,URL\n';

    const rows = selected
      .map(
        (p: Pokemon) =>
          `${p.name},"${p.description}","https://pokeapi.co/api/v2/pokemon/${p.name.toLowerCase()}"`
      )
      .join('\n');

    const csvContent = headers + rows;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${selected.length}_items.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  if (selected.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#333',
        color: 'white',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.3)',
      }}
    >
      <div>
        <strong>{selected.length}</strong> выбрано
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={clear}
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            background: '#555',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Unselect all
        </button>

        <button
          onClick={handleDownload}
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Flyout;
