"use client";

import { CurrencyInput } from "@/components/CurrencyInput";
import ReminderDialog from "@/components/ReminderDialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { buySchema, BuyValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "../SessionProvider";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { balanceApi } from "@/redux/balanceApi";

interface BuyFormProps {
  code: string;
  price: number;
  service: string;
}

export default function BuyForm({ price, code, service }: BuyFormProps) {
  const [showDialog, setShowDialog] = useState(false);

  const { token } = useSession();

  const [buyService, { isLoading, isSuccess, isError }] =
    balanceApi(token).useBuyServiceMutation();

  const form = useForm<BuyValues>({
    resolver: zodResolver(buySchema),
    defaultValues: {
      code: code,
    },
  });

  const onSubmit = async (code: BuyValues) => {
    try {
      await buyService(code).unwrap();
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <Form {...form}>
      <form className="space-y-5">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CurrencyInput
                  {...field}
                  value={formatCurrency(price)}
                  onCallback={field.onChange}
                  className="h-12 disabled:opacity-100"
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="button"
          className="h-12 w-full"
          onClick={() => setShowDialog(true)}
        >
          Top up
        </Button>
        <ReminderDialog
          open={showDialog}
          onOpenChange={setShowDialog}
          price={price}
          isError={isError}
          isLoading={isLoading}
          isSuccess={isSuccess}
          onSubmit={form.handleSubmit(onSubmit)}
          type="buy"
          service={service}
        />
      </form>
    </Form>
  );
}
