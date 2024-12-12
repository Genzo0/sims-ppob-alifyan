import { Balance } from "@/lib/types";
import { BuyValues, TopupValues } from "@/lib/validations";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { transactionApi } from "./TransactionApi";

export const balanceApi = (token: string) =>
  createApi({
    reducerPath: "balanceApi",
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
      prepareHeaders: (headers) => {
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
    }),
    tagTypes: ["Balance", "Transaction"],
    endpoints: (builder) => ({
      getBalance: builder.query<Balance, void>({
        query: () => "/balance",
        transformResponse: (response: { data: Balance; message: string }) => {
          return response.data;
        },
        providesTags: ["Balance"],
      }),
      topUpBalance: builder.mutation<TopupValues, TopupValues>({
        query: (data) => ({
          url: "/topup",
          method: "POST",
          body: {
            top_up_amount: data.nominal,
          },
        }),
        transformResponse: (response: {
          success: string;
          data: TopupValues;
          message: string;
        }) => {
          return response.data;
        },
        invalidatesTags: ["Balance", "Transaction"],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          await queryFulfilled;
          dispatch(transactionApi(token).util.invalidateTags(["Transaction"]));
        },
      }),
      buyService: builder.mutation<BuyValues, BuyValues>({
        query: (data) => ({
          url: "/transaction",
          method: "POST",
          body: {
            service_code: data.code,
          },
        }),
        transformResponse: (response: {
          status: string;
          data: BuyValues;
          message: string;
        }) => {
          return response.data;
        },
        invalidatesTags: ["Balance", "Transaction"],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          await queryFulfilled;
          dispatch(transactionApi(token).util.invalidateTags(["Transaction"]));
        },
      }),
    }),
  });
