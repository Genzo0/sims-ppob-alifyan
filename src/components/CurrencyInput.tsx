import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Banknote } from "lucide-react";

const moneyFormatter = Intl.NumberFormat("id-ID", {
  currency: "IDR",
});

type CurrencyInputProps = {
  className?: string;
  initialValue?: string;
  onCallback?: (value: number) => void;
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  CurrencyInputProps;

const CurrencyInput = React.forwardRef<HTMLInputElement, InputProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ className, onCallback, value: propValue, onChange, ...props }, ref) => {
    const [value, setValue] = React.useState<string>("");

    React.useEffect(() => {
      if (propValue !== undefined) {
        const digits = String(propValue).replace(/\D/g, "");
        setValue(moneyFormatter.format(Number(digits)));
      }
    }, [propValue]);

    function handleChange(formattedValue: string) {
      const digits = formattedValue.replace(/\D/g, "");
      const realValue = Number(digits);
      onCallback?.(realValue);
    }

    return (
      <div className="relative">
        <Banknote className="absolute left-3 top-1/2 size-4 -translate-y-1/2 transform" />
        <Input
          ref={ref}
          className={cn("w-full ps-10", className)}
          {...props}
          value={value}
          onChange={(ev) => {
            setValue(ev.target.value);
            handleChange(ev.target.value);
          }}
        />
      </div>
    );
  },
);

CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
