import * as React from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

import { cn } from "@/lib/utils"

export function Dropdown({ children, ...props }) {
  return (
    <DropdownMenu.Root {...props}>
      {children}
    </DropdownMenu.Root>
  );
}

export function DropdownTrigger({ children, className, ...props }) {
  return (
    <DropdownMenu.Trigger
      className={cn("flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors", className)}
      {...props}
    >
      {children}
    </DropdownMenu.Trigger>
  );
}

export function DropdownContent({ children, className, ...props }) {
  return (
    <DropdownMenu.Content
      className={cn(
        "min-w-[220px] bg-white dark:bg-gray-800 rounded-md p-2 shadow-lg border border-gray-200 dark:border-gray-700",
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenu.Content>
  );
}

export function DropdownItem({ children, className, ...props }) {
  return (
    <DropdownMenu.Item
      className={cn(
        "px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenu.Item>
  );
}
