export const fetchPokemonList = async (term: string, page: number) => {
  const trimmed = term.trim();
  const limit = 10;
  const offset = (page - 1) * limit;

  const url = trimmed
    ? `https://pokeapi.co/api/v2/pokemon/${trimmed.toLowerCase()}`
    : `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Pokemon not found');
  const data = await response.json();

  if (!data.results) {
    return [
      {
        name: data.name,
        description: `Base experience: ${data.base_experience}`,
        image: data.sprites.front_default,
      },
    ];
  }

  const detailed = await Promise.all(
    data.results.map(async (p: { url: string }) => {
      const res = await fetch(p.url);
      const pd = await res.json();
      return {
        name: pd.name,
        description: `Base experience: ${pd.base_experience}`,
        image: pd.sprites.front_default,
      };
    })
  );
  return detailed;
};

export const fetchPokemonDetail = async (id: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error('Details not found');
  return res.json();
};
