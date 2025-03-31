import { useState } from "react";

// Componente que envuelve a todo el tooltip
export function TooltipProvider({ children }) {
  return <div className="relative inline-block">{children}</div>;
}

// Modificamos TooltipTrigger para usar onMouseEnter y onMouseLeave
export function TooltipTrigger({ children, onMouseEnter, onMouseLeave }) {
  return (
    <div
      className="cursor-pointer"
      onMouseEnter={onMouseEnter}
      onFocus={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onBlur={onMouseLeave}
      aria-describedby="tooltip"
    >
      {children}
    </div>
  );
}

// Sin cambios, solo recibe la visibilidad del tooltip
export function TooltipContent({ children, isVisible }) {
  return (
    <div
      id="tooltip"
      className={`absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-md shadow-lg transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } dark:bg-gray-700`}
      role="tooltip"
    >
      {children}
    </div>
  );
}

// Nuevo componente Tooltip que une la lógica de visibilidad
export function Tooltip({ children, tooltipText }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TooltipProvider>
      <TooltipTrigger
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent isVisible={isVisible}>{tooltipText}</TooltipContent>
    </TooltipProvider>
  );
}
