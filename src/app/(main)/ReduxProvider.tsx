"use client";

import React, { useMemo } from "react";
import { Provider } from "react-redux";
import { createStoreWithApis } from "@/redux/store";
import { useSession } from "./SessionProvider";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useSession();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { store, balance, transaction } = useMemo(
    () => createStoreWithApis(token),
    [token],
  );

  return <Provider store={store}>{children}</Provider>;
}
