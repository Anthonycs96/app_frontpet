import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

export function Popover({ children, ...props }) {
  return (
    <PopoverPrimitive.Root {...props}>
      {children}
    </PopoverPrimitive.Root>
  );
}

export function PopoverTrigger({ children, className, ...props }) {
  return (
    <PopoverPrimitive.Trigger
      className={cn("flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors", className)}
      {...props}
    >
      {children}
    </PopoverPrimitive.Trigger>
  );
}

export function PopoverContent({ children, className, ...props }) {
  return (
    <PopoverPrimitive.Content
      className={cn(
        "min-w-[220px] bg-white dark:bg-gray-800 rounded-md p-2 shadow-lg border border-gray-200 dark:border-gray-700",
        className
      )}
      {...props}
    >
      {children}
    </PopoverPrimitive.Content>
  );
}
