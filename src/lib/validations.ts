import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Format email salah" })
    .min(1, { message: "Email tidak boleh kosong" }),
  password: z.string().min(1, { message: "Password tidak boleh kosong" }),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Format email salah" })
      .min(1, { message: "Email tidak boleh kosong" }),
    first_name: z.string().min(1, { message: "Nama depan tidak boleh kosong" }),
    last_name: z
      .string()
      .min(1, { message: "Nama belakang tidak boleh kosong" }),
    password: z.string().min(1, { message: "Password tidak boleh kosong" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Konfirmasi password tidak boleh kosong" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });

export type RegisterValues = z.infer<typeof registerSchema>;
