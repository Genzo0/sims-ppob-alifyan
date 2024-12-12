import Balance from "../Balance";
import { Profile } from "../page";
import TopupForm from "./TopupForm";

export default function Page() {
  return (
    <main className="w-full space-y-16 py-5">
      <div className="flex">
        <Profile />
        <Balance />
      </div>
      <div>
        <p className="text-2xl">Silahkan masukan</p>
        <p className="text-3xl font-semibold tracking-wide">Nominal Top Up</p>
      </div>
      <TopupForm />
    </main>
  );
}
