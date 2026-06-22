"use client";

import { usePokemonStore } from "../store/usePokemonStore";
import { useRef } from "react";

const Flyout = () => {
  const { selected, clear } = usePokemonStore();
  const formRef = useRef<HTMLFormElement>(null);

  if (selected.length === 0) return null;

  const handleDownload = () => {
    formRef.current?.submit();
  };

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
        boxShadow: "0 -2px 10px rgba(0,0,0,0.3)",
      }}
    >
      <form
        ref={formRef}
        action="/api/download-csv"
        method="POST"
        style={{ display: "none" }}
      >
        <input type="hidden" name="pokemons" value={JSON.stringify(selected)} />
      </form>

      <div>
        <strong>{selected.length}</strong> выбрано
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={clear}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
            background: "#555",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Unselect all
        </button>

        <button
          onClick={handleDownload}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Flyout;
