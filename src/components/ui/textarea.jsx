import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        "text-neutral-900 dark:text-neutral-100 leading-6 bg-white dark:bg-neutral-800",
        "transition duration-200 ease-in-out",
        "invalid:border-red-500 invalid:text-red-500",
        "resize-none",
        className
      )}
      ref={ref}
      aria-label="Textarea"
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
