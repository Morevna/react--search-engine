import { expect, test } from 'vitest';
import { usePokemonStore } from '../../store/usePokemonStore';

test('Zustand store logic', () => {
  const { toggle, clear } = usePokemonStore.getState();
  const pokemon = { name: 'pikachu', description: 'electric', image: 'url' };

  toggle(pokemon);
  expect(usePokemonStore.getState().selected).toHaveLength(1);

  toggle(pokemon); 
  expect(usePokemonStore.getState().selected).toHaveLength(0);

  toggle(pokemon);
  clear();
  expect(usePokemonStore.getState().selected).toHaveLength(0);
});