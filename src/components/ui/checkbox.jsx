import React from "react";

const Checkbox = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      className={`form-checkbox h-5 w-5 text-blue-600 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
