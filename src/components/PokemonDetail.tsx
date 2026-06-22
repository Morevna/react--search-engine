import { useParams, useNavigate } from "react-router-dom";
import { usePokemonDetails } from "../hooks/usePokemonQueries";

const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: details, isLoading } = usePokemonDetails(id);

  if (isLoading) return <div>Loading details...</div>;
  if (!details) return null;

  return (
    <div style={{ padding: "20px", position: "relative" }}>
      <button
        onClick={() => navigate("/")}
        style={{ position: "absolute", right: 10, top: 10, cursor: "pointer" }}
      >
        ✖
      </button>
      <h2 style={{ textTransform: "capitalize" }}>{details.name}</h2>
      <img
        src={details.sprites.front_default}
        alt={details.name}
        style={{ width: "150px" }}
      />
      <p>
        <strong>Weight:</strong> {details.weight}
      </p>
      <p>
        <strong>Height:</strong> {details.height}
      </p>
    </div>
  );
};

export default PokemonDetail;
