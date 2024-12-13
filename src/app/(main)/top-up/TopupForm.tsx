"use client";

import { CurrencyInput } from "@/components/CurrencyInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { formatCurrency } from "@/lib/utils";
import { topupSchema, TopupValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "../SessionProvider";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ReminderDialog from "@/components/ReminderDialog";
import { balanceApi } from "@/redux/balanceApi";

export default function TopupForm() {
  const [clicked, setClicked] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const { token } = useSession();

  const form = useForm<TopupValues>({
    resolver: zodResolver(topupSchema),
    defaultValues: {
      nominal: 0,
    },
  });

  const [topUpBalance, { isLoading, isSuccess, isError }] =
    balanceApi(token).useTopUpBalanceMutation();

  const onSubmit = async (nominal: TopupValues) => {
    try {
      await topUpBalance(nominal).unwrap();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="flex gap-7">
      <Form {...form}>
        <form className="flex w-3/5 flex-col gap-7">
          <FormField
            control={form.control}
            name="nominal"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CurrencyInput
                    {...field}
                    value={field.value}
                    onCallback={field.onChange}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            className="h-12 w-full"
            disabled={form.getValues("nominal") < 1 || !clicked}
            onClick={() => setShowDialog(true)}
          >
            Top up
          </Button>
          <ReminderDialog
            open={showDialog}
            onOpenChange={setShowDialog}
            price={form.getValues("nominal")}
            isError={isError}
            isLoading={isLoading}
            isSuccess={isSuccess}
            onSubmit={form.handleSubmit(onSubmit)}
            type="topup"
          />
        </form>
      </Form>
      <div className="grid w-2/5 grid-cols-3 gap-7">
        {topUpChoices.map((choice) => (
          <button
            key={choice.value}
            type="button"
            onClick={() => {
              form.setValue("nominal", choice.value);
              setClicked(true);
            }}
            className="h-12 bg-secondary hover:bg-secondary/30"
          >
            {formatCurrency(choice.value, true)}
          </button>
        ))}
      </div>
    </div>
  );
}

const topUpChoices = [
  {
    value: 10000,
  },
  {
    value: 20000,
  },
  {
    value: 50000,
  },
  {
    value: 100000,
  },
  {
    value: 250000,
  },
  {
    value: 500000,
  },
];
