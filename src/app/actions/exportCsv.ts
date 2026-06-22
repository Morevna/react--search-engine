"use server";

import { type Pokemon } from "@/api/pokemonService";

export async function exportPokemonCsv(selectedPokemons: Pokemon[]) {
  const headers = "Name,Description,URL\n";
  const rows = selectedPokemons
    .map(
      (p) =>
        `${p.name},"${p.description}","https://pokeapi.co/api/v2/pokemon/${p.name.toLowerCase()}"`,
    )
    .join("\n");

  const csvContent = headers + rows;

  return csvContent;
}

