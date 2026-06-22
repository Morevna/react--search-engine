import PokemonCard from "@/components/PokemonCard";
import Link from "next/link";
import { fetchPokemonList, type Pokemon } from "@/api/pokemonService";

type Props = {
  searchParams: Promise<{
    page?: string;
    query?: string;
  }>;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page || 1);

  const query = params.query || "";

  const pokemons = await fetchPokemonList(query, page);

  return (
    <main>
      <h1>Pokemon Search</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <section>
          {pokemons.map((pokemon: Pokemon) => (
            <Link key={pokemon.name} href={`/?id=${pokemon.name}`}>
              <PokemonCard pokemon={pokemon} />
            </Link>
          ))}
        </section>

        <section
          style={{
            border: "1px solid gray",
            minHeight: "300px",
          }}
        >
          <h2>Details</h2>
        </section>
      </div>
    </main>
  );
}
