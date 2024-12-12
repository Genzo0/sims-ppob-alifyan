import { Metadata } from "next";
import Balance from "../Balance";
import TopupForm from "./TopupForm";
import Profile from "@/components/Profile";

export const metadata: Metadata = {
  title: "Top Up",
  description: "Top Up SIMS PPOB",
};

export default function Page() {
  return (
    <main className="w-full space-y-16 py-5">
      <div className="flex">
        <Profile />
        <Balance />
      </div>
      <div>
        <p className="text-xl">Silahkan masukan</p>
        <p className="text-2xl font-semibold tracking-wide">Nominal Top Up</p>
      </div>
      <TopupForm />
    </main>
  );
}
