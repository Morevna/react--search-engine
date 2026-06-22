"use client";
import { useState } from "react";

const TestErrorButton = ({}) => {
  const [hasError, setHasError] = useState(false);

  const handleClick = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error("Test Error");
  }

  return (
    <button
      onClick={handleClick}
      style={{
        position: "fixed",
        left: "20px",
        bottom: "10px",
        padding: "12px 16px",
        border: "none",
        borderRadius: "8px",
        background: "crimson",
        color: "white",
        cursor: "pointer",
        zIndex: 9999,
      }}
    >
      Test Error
    </button>
  );
};

export default TestErrorButton;
