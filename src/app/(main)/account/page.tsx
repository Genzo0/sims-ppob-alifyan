import { Metadata } from "next";
import AccountForm from "./AccountForm";

export const metadata: Metadata = {
  title: "Account",
};

export default async function Page() {
  return (
    <div className="w-full py-5">
      <AccountForm />
    </div>
  );
}
