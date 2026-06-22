"use server";

import { type Pokemon } from "@/api/pokemonService";

type ActionState = {
  csv?: string;
  data?: Pokemon[];
  error?: string;
} | null;

export async function exportPokemonCsv(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const pokemonsJson = formData.get("pokemons") as string;
  if (!pokemonsJson) return { error: "No data" };

  const selectedPokemons: Pokemon[] = JSON.parse(pokemonsJson);
  const headers = "Name,Description,URL\n";
  const rows = selectedPokemons
    .map(p => `${p.name},"${p.description || ""}","https://pokeapi.co/api/v2/pokemon/${p.name.toLowerCase()}"`)
    .join("\n");

  return { csv: headers + rows, data: selectedPokemons };
}