import * as React from "react"
import * as ToastPrimitive from "@radix-ui/react-toast"

import { cn } from "@/lib/utils"

export function Toast({ children, ...props }) {
  return (
    <ToastPrimitive.Provider>
      <ToastPrimitive.Root {...props}>
        {children}
      </ToastPrimitive.Root>
    </ToastPrimitive.Provider>
  );
}

export function ToastTitle({ children, className, ...props }) {
  return (
    <ToastPrimitive.Title
      className={cn("text-sm font-semibold text-gray-900 dark:text-gray-100", className)}
      {...props}
    >
      {children}
    </ToastPrimitive.Title>
  );
}

export function ToastDescription({ children, className, ...props }) {
  return (
    <ToastPrimitive.Description
      className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
      {...props}
    >
      {children}
    </ToastPrimitive.Description>
  );
}

export function ToastAction({ children, className, ...props }) {
  return (
    <ToastPrimitive.Action
      className={cn("text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline", className)}
      {...props}
    >
      {children}
    </ToastPrimitive.Action>
  );
}

export function ToastClose({ children, className, ...props }) {
  return (
    <ToastPrimitive.Close
      className={cn("text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100", className)}
      {...props}
    >
      {children}
    </ToastPrimitive.Close>
  );
}
