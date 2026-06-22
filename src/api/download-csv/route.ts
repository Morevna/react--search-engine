import { NextResponse } from "next/server";
import { type Pokemon } from "@/api/pokemonService";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const pokemonsJson = formData.get("pokemons") as string;

    if (!pokemonsJson) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    const selectedPokemons: Pokemon[] = JSON.parse(pokemonsJson);

    const headers = "Name,Description,URL\n";
    const rows = selectedPokemons
      .map(
        (p) =>
          `${p.name},"${p.description || ""}","https://pokeapi.co/api/v2/pokemon/${p.name.toLowerCase()}"`,
      )
      .join("\n");

    const csvContent = headers + rows;

    const BOM = "\uFEFF";

    return new NextResponse(BOM + csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${selectedPokemons.length}_items.csv"`,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to generate CSV" },
      { status: 500 },
    );
  }
}
