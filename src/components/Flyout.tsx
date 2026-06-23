"use client";

import { usePokemonStore } from "../store/usePokemonStore";

const Flyout = () => {
  const { selected, clear } = usePokemonStore();

  const handleDownload = async () => {
    if (selected.length === 0) return;

    const response = await fetch("/api/export-csv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pokemons: selected }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selected.length}_pokemons.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  if (selected.length === 0) return null;

  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#333", color: "white", padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 1000 }}>
      <div><strong>{selected.length}</strong> selected</div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={clear} style={{ padding: "8px 12px", background: "#555", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Unselect all
        </button>
        <button onClick={handleDownload} style={{ padding: "8px 12px", background: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Download CSV
        </button>
      </div>
    </div>
  );
};

export default Flyout;