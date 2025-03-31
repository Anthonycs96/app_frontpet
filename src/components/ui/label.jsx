"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

const Label = React.forwardRef(({ className = "", ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "block text-sm font-medium leading-none",
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      "md:text-sm md:font-roboto",
      "lg:text-sm lg:font-roboto",
      "xl:text-sm xl:font-roboto",
      "transition-colors duration-100",
      "hover:opacity-90",
      "mb-2",
      className
    )}
    aria-label="Label"
    {...props}
  />
));

Label.displayName = "Label";

export default Label;
