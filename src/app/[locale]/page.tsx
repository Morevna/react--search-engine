import PokemonCard from "@/components/PokemonCard";
import PokemonDetail from "@/components/PokemonDetail";
import { Link } from "@/navigation"; 
import { fetchPokemonList, type Pokemon } from "@/api/pokemonService";

type Props = {
  searchParams: Promise<{
    page?: string;
    query?: string;
    id?: string;
  }>;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page || 1);
  const query = params.query || "";
  const selectedId = params.id;

  const pokemons = await fetchPokemonList(query, page);

  return (
    <main style={{ padding: "20px" }}>
      <h1>Pokemon Search</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <section>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {pokemons.map((pokemon: Pokemon) => (
              <Link
                key={pokemon.name}
                href={`/?query=${query}&page=${page}&id=${pokemon.name}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <PokemonCard pokemon={pokemon} />
              </Link>
            ))}
          </div>
        </section>

        <section
          style={{
            border: "1px solid gray",
            minHeight: "300px",
            borderRadius: "10px",
            background: "#fff",
          }}
        >
          <PokemonDetail id={selectedId} />
        </section>
      </div>
    </main>
  );
}
