import { NextResponse } from "next/server";
import { type Pokemon } from "@/app/api/pokemonService";

export async function POST(request: Request) {
  try {
    const { pokemons } = await request.json();
    if (!pokemons || !Array.isArray(pokemons)) {
      return NextResponse.json({ error: "No data" }, { status: 400 });
    }

    const headers = "Name,Description,URL\n";
    const rows = pokemons
      .map(
        (p: Pokemon) =>
          `${p.name},"${p.description || ""}","https://pokeapi.co/api/v2/pokemon/${p.name.toLowerCase()}"`,
      )
      .join("\n");

    const csvContent = headers + rows;

    return new NextResponse("\uFEFF" + csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="exported_pokemons.csv"',
      },
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
