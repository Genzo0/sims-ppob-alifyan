import React, { useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface IconInputProps extends React.ComponentProps<"input"> {
  icon: React.ElementType;
}

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  IconInputProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ className, type, icon: Icon, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 transform" />
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("pe-10 ps-10", className)}
        ref={ref}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        title={showPassword ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
      >
        {showPassword ? (
          <EyeOff className="size-5" />
        ) : (
          <Eye className="size-5" />
        )}
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
