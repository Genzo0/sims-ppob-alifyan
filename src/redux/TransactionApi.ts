import { Transaction, TransactionApiResponse } from "@/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionApi = (token: string) =>
  createApi({
    reducerPath: "transactionApi",
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
      prepareHeaders: (headers) => {
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
    }),
    tagTypes: ["Transaction"],
    endpoints: (builder) => ({
      getTransactions: builder.query<Transaction[], number>({
        query: (page) => `/transaction/history?offset=${page * 5}&limit=5`,
        transformResponse: (response: TransactionApiResponse) =>
          response.data.records,
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
        merge: (currentCache, newItems) => {
          currentCache.push(...newItems);
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
        providesTags: ["Transaction"],
      }),
    }),
  });
