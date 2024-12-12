"use client";

import { CurrencyInput } from "@/components/CurrencyInput";
import LoadingButton from "@/components/LoadingButton";
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
import { useForm, UseFormReturn } from "react-hook-form";
import { balanceApi } from "../store";
import { useSession } from "../SessionProvider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CircleCheck, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";

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
            form={form}
            isError={isError}
            isLoading={isLoading}
            isSuccess={isSuccess}
            onSubmit={form.handleSubmit(onSubmit)}
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
            className="h-12 bg-gray-100 hover:bg-gray-200"
          >
            {formatCurrency(choice.value, true)}
          </button>
        ))}
      </div>
    </div>
  );
}

interface ReminderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<TopupValues>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  onSubmit: () => void;
}

function ReminderDialog({
  open,
  onOpenChange,
  form,
  isLoading,
  isError,
  isSuccess,
  onSubmit,
}: ReminderDialogProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      onOpenChange(false);
    }
    if (isError) {
      setShowError(true);
      onOpenChange(false);
    }
  }, [isSuccess, isError, onOpenChange]);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="mx-auto flex w-full flex-col items-center justify-center space-y-3">
          <DialogTitle>
            <Image
              src={logo}
              alt=""
              width={100}
              height={100}
              className="size-10"
            />
          </DialogTitle>
          <form
            className="mx-auto w-full space-y-3 text-center"
            onSubmit={onSubmit}
          >
            <div className="space-y-1 text-center">
              <p>Anda yakin untuk Top Up sebesar</p>
              <p className="text-xl font-bold">
                {formatCurrency(form.getValues("nominal"), true)}
              </p>
            </div>
            <LoadingButton
              loading={isLoading}
              className="mx-auto font-medium text-primary shadow-none"
              variant="ghost"
              type="submit"
            >
              Ya, lanjutkan top up
            </LoadingButton>
            <Button
              variant="ghost"
              className="text-foreground/70"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Batalkan
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <SuccessDialog
        open={isSuccess && showSuccess}
        onOpenChange={setShowSuccess}
        form={form}
      />
      <ErrorDialog
        open={isError && showError}
        onOpenChange={setShowError}
        form={form}
      />
    </>
  );
}

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<TopupValues>;
}

function SuccessDialog({ open, onOpenChange, form }: SuccessDialogProps) {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>
          <CircleCheck className="mx-auto size-20 rounded-full bg-green-600 text-white" />
        </DialogTitle>
        <div className="space-y-1 text-center">
          <p>Top Up sebesar</p>
          <p className="text-xl font-bold">
            {formatCurrency(form.getValues("nominal"), true)}
          </p>
        </div>
        <Button
          variant="ghost"
          className="text-primary"
          type="button"
          onClick={() => {
            onOpenChange(false);
            router.push("/");
          }}
        >
          Kembali ke beranda
        </Button>
      </DialogContent>
    </Dialog>
  );
}

interface ErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<TopupValues>;
}

function ErrorDialog({ open, onOpenChange, form }: ErrorDialogProps) {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>
          <CircleX className="mx-auto size-20 rounded-full bg-red-600 text-white" />
        </DialogTitle>
        <div className="space-y-1 text-center">
          <p>Top Up sebesar</p>
          <p className="text-xl font-bold">
            {formatCurrency(form.getValues("nominal"), true)}
          </p>
          <p>Gagal</p>
        </div>
        <Button
          variant="ghost"
          className="text-primary"
          type="button"
          onClick={() => {
            onOpenChange(false);
            router.push("/");
          }}
        >
          Kembali ke beranda
        </Button>
      </DialogContent>
    </Dialog>
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
