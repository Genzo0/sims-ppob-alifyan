import { getSessionToken } from "./sessions";
import { User } from "./types";

export async function validateRequest(): Promise<SessionValidation> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) {
    return { user: null, token: null };
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

  if (!response.ok) {
    return { user: null, token: null };
  }

  const result = await response.json();
  return { user: result.data, token };
}

export type SessionValidation =
  | { user: User; token: string }
  | { user: null; token: null };
