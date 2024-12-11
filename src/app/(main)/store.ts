import { Balance } from "@/lib/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    tagTypes: ["Balance"],
    endpoints: (builder) => ({
      getBalance: builder.query<Balance, void>({
        query: () => "/balance",
        transformResponse: (response: { data: Balance; message: string }) => {
          return response.data;
        },
        providesTags: ["Balance"],
      }),
    }),
  });
