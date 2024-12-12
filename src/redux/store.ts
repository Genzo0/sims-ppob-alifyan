import { configureStore } from "@reduxjs/toolkit";
import { balanceApi } from "./balanceApi";
import { transactionApi } from "./TransactionApi";

export const createStoreWithApis = (token: string) => {
  const balance = balanceApi(token);
  const transaction = transactionApi(token);

  const store = configureStore({
    reducer: {
      [balance.reducerPath]: balance.reducer,
      [transaction.reducerPath]: transaction.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(balance.middleware)
        .concat(transaction.middleware),
  });

  return { store, balance, transaction };
};
