"use client";

export default function TitleBar({ isExpanded, setIsExpanded }) {
  return (
    <div
      className="fixed top-4 right-4 z-50 hidden sm:block"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center gap-2">
        {!isExpanded && (
          <h1 className="text-2xl font-bold text-[var(--foreground)] px-4 py-2 rounded-lg shadow-lg">
            VetListo+
          </h1>
        )}
      </div>
    </div>
  );
}
