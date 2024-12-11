import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar";
import DashboardProvider from "./DashboardProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session}>
      <DashboardProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="mx-auto w-full max-w-7xl p-5">{children}</div>
        </div>
      </DashboardProvider>
    </SessionProvider>
  );
}