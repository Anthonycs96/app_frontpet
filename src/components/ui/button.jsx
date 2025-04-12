"use client";

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
  isLoading = false,
  variant = "primary", // ✅ nueva prop
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-busy={isLoading}
      disabled={isLoading}
      className={`
        px-4 py-2 rounded-lg shadow-md
        transition-all duration-300
        disabled:opacity-50 disabled:pointer-events-none
        ${className}
      `}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4zm2 5.29A7.96 7.96 0 004 12h2v5.29z"
            ></path>
          </svg>
          Cargando...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
