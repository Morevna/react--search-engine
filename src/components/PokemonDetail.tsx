import Image from "next/image";
import { fetchPokemonDetail } from "../api/pokemonService";

interface Props {
  id?: string;
}

export default async function PokemonDetail({ id }: Props) {
  if (!id) {
    return (
      <div style={{ padding: "20px", color: "gray" }}>
        Выберите покемона из списка для просмотра деталей.
      </div>
    );
  }

  let details = null;

  try {
    details = await fetchPokemonDetail(id);
  } catch {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        Ошибка загрузки деталей покемона.
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", position: "relative" }}>
      <h2 style={{ textTransform: "capitalize" }}>{details.name}</h2>

      <Image
        src={details.sprites.front_default}
        alt={details.name}
        width={150}
        height={150}
        unoptimized
      />

      <p>
        <strong>Weight:</strong> {details.weight}
      </p>
      <p>
        <strong>Height:</strong> {details.height}
      </p>
    </div>
  );
}
