import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export function Modal({ children, ...props }) {
  return <Dialog.Root {...props}>{children}</Dialog.Root>;
}

export function ModalTrigger({ children, className, ...props }) {
  return (
    <Dialog.Trigger
      className={cn(
        "flex items-center justify-center p-2 rounded-md hover:bg-[var(--background-secondary)] transition-colors duration-300",
        className
      )}
      {...props}
    >
      {children}
    </Dialog.Trigger>
  );
}

export function ModalContent({ children, className, ...props }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 transition-opacity duration-300" />
      <Dialog.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-lg bg-[var(--background-secondary)] text-[var(--foreground)] p-6 transition-all duration-300 border border-[var(--border)]",
          className
        )}
        {...props}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export function ModalTitle({ children, className, ...props }) {
  return (
    <Dialog.Title
      className={cn("text-xl font-bold mb-2 text-center", className)}
      {...props}
    >
      {children}
    </Dialog.Title>
  );
}

export function ModalDescription({ children, className, ...props }) {
  return (
    <Dialog.Description
      className={cn("text-sm text-muted-foreground text-center", className)}
      {...props}
    >
      {children}
    </Dialog.Description>
  );
}

export function ModalFooter({ children, className = "" }) {
  return (
    <div className={cn("mt-4 flex justify-center gap-2", className)}>
      {children}
    </div>
  );
}
