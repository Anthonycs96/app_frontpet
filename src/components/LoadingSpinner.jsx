// LoadingSpinner.jsx
"use client";

import { useEffect, useState } from "react";

export default function LoadingSpinner({ size = 40, color = "var(--primary)" }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div
        className="animate-spin rounded-full border-b-2"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderTopColor: color,
          borderLeftColor: color,
          borderBottomColor: color,
          borderRightColor: "transparent",
        }}
      />
    </div>
  );
}
