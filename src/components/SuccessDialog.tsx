import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { CircleCheck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "./ui/button";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  price: number;
  type: "topup" | "buy";
  service?: string;
}

export default function SuccessDialog({
  open,
  onOpenChange,
  price,
  type,
  service,
}: SuccessDialogProps) {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>
          <CircleCheck className="mx-auto size-20 rounded-full bg-green-600 text-white" />
        </DialogTitle>
        <div className="space-y-1 text-center">
          {type === "topup" ? (
            <p>Top Up sebesar</p>
          ) : (
            <p>Pembelian {service} sebesar</p>
          )}
          <p className="text-xl font-bold">{formatCurrency(price, true)}</p>
          <p>Berhasil</p>
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
