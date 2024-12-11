"use server";

import { setSessionTokenCookie } from "@/lib/sessions";
import { loginSchema, LoginValues } from "@/lib/validations";
import { redirect } from "next/navigation";

export async function login(credentials: LoginValues) {
  const { email, password } = loginSchema.parse(credentials);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await res.json();

  if (!res.ok) {
    return {
      error: result.message,
    };
  }

  await setSessionTokenCookie(
    result.data.token,
    new Date(Date.now() + 1000 * 60 * 60 * 24),
  );

  return redirect("/");
}
