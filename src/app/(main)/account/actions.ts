"use server";

import { validateRequest } from "@/lib/auth";
import { deleteSessionTokenCookie } from "@/lib/sessions";
import { profileSchema, ProfileValues } from "@/lib/validations";

export const logout = async () => {
  await deleteSessionTokenCookie();
};

export const updateProfile = async (values: ProfileValues, avatar?: File) => {
  const { email, first_name, last_name } = profileSchema.parse(values);

  const { token } = await validateRequest();

  if (avatar instanceof File) {
    const formData = new FormData();
    formData.append("file", avatar);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/profile/image`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    const result = await res.json();

    if (!res.ok) {
      return { error: result.message };
    }
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/profile/update`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, first_name, last_name }),
    },
  );

  const result = await res.json();

  if (!res.ok) {
    return { error: result.message };
  }

  return { success: result.message };
};
