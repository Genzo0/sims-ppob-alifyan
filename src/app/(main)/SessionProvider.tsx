"use client";

import { User } from "@/lib/types";
import { createContext, useContext } from "react";

interface SessionContext {
  user: User;
  token: string;
}

const SessionContext = createContext<SessionContext | null>(null);

export default function SessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: SessionContext }>) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be use within a SessionProvider");
  }
  return context;
}
