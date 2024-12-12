"use client";

import { useState } from "react";
import { useSession } from "../SessionProvider";
import { transactionApi } from "@/redux/TransactionApi";
import { Transaction } from "@/lib/types";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function TransactionList() {
  const [page, setPage] = useState(0);
  const { token } = useSession();
  const { data: transactions, isFetching } = transactionApi(
    token,
  ).useGetTransactionsQuery(page, {
    refetchOnMountOrArgChange: true,
  });

  const showMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex flex-col space-y-5">
      {transactions?.map((transaction, idx) => (
        <TransactionItem key={idx} transaction={transaction} />
      ))}

      {isFetching ? (
        <Loader2 className="mx-auto animate-spin" />
      ) : (
        <Button
          className="mx-auto text-primary"
          variant="ghost"
          onClick={showMore}
        >
          Show more
        </Button>
      )}
    </div>
  );
}

interface TransactionItemProps {
  transaction: Transaction;
}

function TransactionItem({ transaction }: TransactionItemProps) {
  return (
    <div className="w-full rounded-xl border border-border px-8 py-3">
      <div className="flex items-center justify-between">
        <p
          className={cn("flex gap-2 text-xl font-bold", {
            "text-green-500": transaction.transaction_type === "TOPUP",
            "text-red-500": transaction.transaction_type === "PAYMENT",
          })}
        >
          <span>{transaction.transaction_type === "TOPUP" ? "+" : "-"}</span>
          {formatCurrency(transaction.total_amount, true)}
        </p>
        <p className="text-sm">{transaction.description}</p>
      </div>
      <p className="text-sm text-muted-foreground/70">
        {formatDate(transaction.created_on)}
      </p>
    </div>
  );
}
