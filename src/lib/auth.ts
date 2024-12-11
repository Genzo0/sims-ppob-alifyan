import { getSessionToken } from "./sessions";
import { User } from "./types";

export async function validateRequest(): Promise<SessionValidation> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) {
    return { user: null };
  }
  return validateSessionToken(sessionToken);
}

export async function validateSessionToken(
  token: string,
): Promise<SessionValidation> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response);

  if (!response.ok) {
    return { user: null };
  }

  const result = await response.json();
  return { user: result.data };
}

export type SessionValidation = { user: User } | { user: null };
