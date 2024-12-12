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

export const topupSchema = z.object({
  nominal: z
    .number()
    .int()
    .positive({ message: "Nominal tidak boleh 0" })
    .min(10000, { message: "Nominal minimal Rp 10.000" })
    .max(1000000, { message: "Nominal maksimal Rp 1.000.000" }),
});

export type TopupValues = z.infer<typeof topupSchema>;

export const buySchema = z.object({
  code: z.string(),
});

export type BuyValues = z.infer<typeof buySchema>;

export const profileSchema = z.object({
  email: z
    .string()
    .email({ message: "Format email salah" })
    .min(1, { message: "Email tidak boleh kosong" }),
  first_name: z.string().min(1, { message: "Nama depan tidak boleh kosong" }),
  last_name: z.string().min(1, { message: "Nama belakang tidak boleh kosong" }),
});

export type ProfileValues = z.infer<typeof profileSchema>;
