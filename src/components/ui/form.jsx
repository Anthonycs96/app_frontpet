"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import Label from "@/components/ui/label";

const Form = React.forwardRef(
  ({ className, onSubmit, children, ...props }, ref) => {
    return (
      <form
        ref={ref}
        onSubmit={onSubmit}
        className={cn("space-y-6", className)}
        {...props}
      >
        {children}
      </form>
    );
  }
);
Form.displayName = "Form";

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-2", className)} {...props} />;
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <Label
      ref={ref}
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef(({ ...props }, ref) => {
  return <div ref={ref} className="mt-1" {...props} />;
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm font-medium text-destructive", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
FormMessage.displayName = "FormMessage";

const FormField = ({ name, control, render }) => {
  const formContext = useFormContext();

  if (!formContext && !control) {
    const error = new Error(
      "FormField debe usarse dentro de un Form con FormProvider o con un control explícito"
    );
    error.name = "FormFieldError";
    throw error;
  }

  const controllerProps = control ? { control } : {};

  return (
    <Controller
      name={name}
      {...controllerProps}
      render={({ field, fieldState }) => render({ field, fieldState })}
    />
  );
};

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
