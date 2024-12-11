"use server";

import { registerSchema, RegisterValues } from "@/lib/validations";

export async function register(credentials: RegisterValues) {
  const { email, first_name, last_name, password } =
    registerSchema.parse(credentials);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
      first_name,
      last_name,
      password,
    }),
  });

  const result = await res.json();

  if (!res.ok) {
    return {
      error: result.message,
    };
  }

  return { success: "Registrasi berhasil" };
}
