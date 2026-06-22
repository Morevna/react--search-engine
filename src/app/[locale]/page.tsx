import PokemonCard from "@/components/PokemonCard";
import PokemonDetail from "@/components/PokemonDetail";
import { Link } from "@/navigation";
import { redirect } from "next/navigation";
import { fetchPokemonList, type Pokemon } from "@/api/pokemonService";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    query?: string;
    id?: string;
  }>;
};

export default async function Home({ params, searchParams }: Props) {
  const { locale } = await params;
  const isRu = locale === "ru";
  
  const p = await searchParams;
  const page = Number(p.page || 1);
  const query = p.query || "";
  const selectedId = p.id;

  const pokemons = await fetchPokemonList(query, page);

  async function handleSearch(formData: FormData) {
    "use server";
    const term = formData.get("term") as string;
    redirect(`/?query=${encodeURIComponent(term || "")}&page=1`);
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>{isRu ? "Поиск Покемонов" : "Pokemon Search"}</h1>

      <form action={handleSearch} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          name="term"
          defaultValue={query}
          placeholder={isRu ? "Искать покемона..." : "Search pokemon..."}
          style={{ flex: 1, padding: "10px", color: "black" }}
        />
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          {isRu ? "Найти" : "Search"}
        </button>
      </form>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
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

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            {page > 1 && (
              <Link
                href={`/?query=${query}&page=${page - 1}`}
                style={{ padding: "5px 10px", border: "1px solid #ccc" }}
              >
                Back
              </Link>
            )}
            <Link
              href={`/?query=${query}&page=${page + 1}`}
              style={{ padding: "5px 10px", border: "1px solid #ccc" }}
            >
              Next
            </Link>
          </div>
        </section>

        <section
          style={{
            border: "1px solid gray",
            minHeight: "300px",
            borderRadius: "10px",
            background: "var(--bg-detail, #fff)",
          }}
        >
          <PokemonDetail id={selectedId} />
        </section>
      </div>
    </main>
  );
}
