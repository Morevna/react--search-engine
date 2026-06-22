"use client";

import { type Pokemon } from "../api/pokemonService";
import { usePokemonStore } from "../store/usePokemonStore";
import Image from "next/image";

interface Props {
  pokemon: Pokemon;
  onClick?: () => void;
}

const PokemonCard = ({ pokemon, onClick }: Props) => {
  const { selected, toggle } = usePokemonStore();
  const isChecked = selected.some((p: Pokemon) => p.name === pokemon.name);

  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        textAlign: "center",
        background: "#fafafa",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => {
          e.stopPropagation();
          toggle(pokemon);
        }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 100,
          cursor: "pointer",
        }}
      />

      <Image
        src={pokemon.image}
        alt={pokemon.name}
        width={120}
        height={120}
        unoptimized
      />
      <h3>{pokemon.name}</h3>
      <p>{pokemon.description}</p>
    </div>
  );
};

export default PokemonCard;
