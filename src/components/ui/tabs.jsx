import * as React from "react";

export function Tabs({ value, onValueChange, children, className }) {
  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { value, onValueChange })
      )}
    </div>
  );
}

export function TabsContent({ value, tab, children, className }) {
  if (value !== tab) return null;

  return (
    <div
      role="tabpanel"
      className={`p-4 rounded-md border border-gray-200 dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
}

export function TabsList({ children, className }) {
  return (
    <div
      className={`flex space-x-2 border-b border-gray-200 dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, onValueChange, children, className }) {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 ${
        value === children
          ? "text-gray-900 border-b-2 border-gray-900 dark:text-gray-100 dark:border-gray-100"
          : ""
      } ${className}`}
      onClick={() => onValueChange(children)}
      role="tab"
      aria-selected={value === children}
    >
      {children}
    </button>
  );
}
