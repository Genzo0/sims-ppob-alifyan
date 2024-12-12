import Profile from "@/components/Profile";
import Balance from "../Balance";
import TransactionList from "./TransactionList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transaction",
};

export default function Page() {
  return (
    <main className="w-full space-y-16 py-5">
      <div className="flex">
        <Profile />
        <Balance />
      </div>
      <div className="space-y-5">
        <p className="text-2xl font-semibold tracking-wide">Semua Transaksi</p>
        <TransactionList />
      </div>
    </main>
  );
}
