"use client";

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { balanceApi } from "./store";
import { useSession } from "./SessionProvider";

export default function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useSession();
  return <ApiProvider api={balanceApi(token)}>{children}</ApiProvider>;
}
