import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar";
import ReduxProvider from "./ReduxProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session}>
      <ReduxProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="mx-auto w-full max-w-7xl p-5">{children}</div>
        </div>
      </ReduxProvider>
    </SessionProvider>
  );
}
