import React from "react";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef(
  ({ className, value = 0, max = 100, ...props }, ref) => {
    const percent = (Math.min(Math.max(value, 0), max) / max) * 100;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-muted",
          className
        )}
        {...props}
      >
        <div
          className="h-full w-full transition-all bg-primary"
          style={{ transform: `translateX(-${100 - percent}%)` }}
        />
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
