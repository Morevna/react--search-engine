import { create } from 'zustand';
import type { Pokemon } from '../App';

interface PokemonState {
  selected: Pokemon[];
  toggle: (p: Pokemon) => void;
  clear: () => void;
}

export const usePokemonStore = create<PokemonState>((set) => ({
  selected: [],
  toggle: (p) =>
    set((state) => {
      const isPresent = state.selected.some((item) => item.name === p.name);
      return {
        selected: isPresent
          ? state.selected.filter((item) => item.name !== p.name)
          : [...state.selected, p],
      };
    }),
  clear: () => set({ selected: [] }),
}));
