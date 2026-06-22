interface Props {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const Search = ({ value, onChange, onSearch }: Props) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
      }}
    >
      <input
        type="text"
        value={value}
        placeholder="Search pokemon..."
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          flex: 1,
          padding: "10px",
        }}
      />

      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default Search;
