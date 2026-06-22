import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList, fetchPokemonDetail } from "../api/pokemonService";

export const usePokemons = (searchTerm: string, page: number) => {
  return useQuery({
    queryKey: ["pokemons", searchTerm, page],
    queryFn: () => fetchPokemonList(searchTerm, page),
    enabled: true,
  });
};

export const usePokemonDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: ["pokemonDetail", id],
    queryFn: () => fetchPokemonDetail(id!),
    enabled: !!id,
  });
};
