"use client";

import { usePokemonStore } from "../store/usePokemonStore";
import { exportPokemonCsv } from "@/actions/exportCsv";
import { useActionState, useEffect } from "react";

const Flyout = () => {
  const { selected, clear } = usePokemonStore();
  const [state, formAction] = useActionState(exportPokemonCsv, null);

  useEffect(() => {
    if (state?.csv) {
      const blob = new Blob(["\uFEFF" + state.csv], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${state.data?.length || "export"}_pokemons.csv`,
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [state]);

  if (selected.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#333",
        color: "white",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div>
        <strong>{selected.length}</strong> selected
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={clear}
          style={{
            padding: "8px 12px",
            background: "#555",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Unselect all
        </button>

        <form action={formAction}>
          <input
            type="hidden"
            name="pokemons"
            value={JSON.stringify(selected)}
          />
          <button
            type="submit"
            style={{
              padding: "8px 12px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Download CSV
          </button>
        </form>
      </div>
    </div>
  );
};

export default Flyout;
