import React from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface IconInputProps extends React.ComponentProps<"input"> {
  icon: React.ElementType;
}

const IconInput = React.forwardRef<
  HTMLInputElement,
  IconInputProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ className, type, icon: Icon, ...props }, ref) => {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 transform" />
      <Input className={cn("ps-10", className)} ref={ref} {...props} />
    </div>
  );
});

IconInput.displayName = "IconInput";

export { IconInput };
