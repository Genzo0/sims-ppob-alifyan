"use server";

import { getSessionToken } from "@/lib/sessions";
import { topupSchema, TopupValues } from "@/lib/validations";

export async function topup(data: TopupValues) {
  const { nominal } = topupSchema.parse(data);

  const token = await getSessionToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/topup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ top_up_amount: nominal }),
  });

  const result = await res.json();

  if (!res.ok || res.status === 500) {
    return { error: result.message };
  }

  return { success: result };
}
