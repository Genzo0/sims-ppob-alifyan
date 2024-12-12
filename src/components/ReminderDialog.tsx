import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import Image from "next/image";
import LoadingButton from "./LoadingButton";
import SuccessDialog from "./SuccessDialog";
import ErrorDialog from "./ErrorDialog";
import { formatCurrency } from "@/lib/utils";
import logo from "@/assets/logo.png";

interface ReminderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  price: number;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  type: "topup" | "buy";
  onSubmit: () => void;
  service?: string;
}

export default function ReminderDialog({
  open,
  onOpenChange,
  price,
  isLoading,
  isError,
  isSuccess,
  onSubmit,
  type,
  service,
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
              <p>
                {type === "topup"
                  ? "Anda yakin untuk Top Up sebesar"
                  : `Beli ${service} senilai`}
              </p>
              <p className="text-xl font-bold">{formatCurrency(price, true)}</p>
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
        price={price}
        service={service}
        type={type}
      />
      <ErrorDialog
        open={isError && showError}
        onOpenChange={setShowError}
        price={price}
        service={service}
        type={type}
      />
    </>
  );
}
