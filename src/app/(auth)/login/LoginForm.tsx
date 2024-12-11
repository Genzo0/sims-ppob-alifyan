"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import { useForm } from "react-hook-form";
import { loginSchema, LoginValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { IconInput } from "@/components/IconInput";
import { AtSign, LockKeyhole } from "lucide-react";
import { PasswordInput } from "@/components/PasswordInput";
import LoadingButton from "@/components/LoadingButton";
import Link from "next/link";
import { useState, useTransition } from "react";
import { login } from "./actions";
import { useToast } from "@/hooks/use-toast";

export default function LoginForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginValues) => {
    setError(undefined);
    startTransition(async () => {
      const { error } = await login(values);
      if (error) {
        toast({
          variant: "destructive",
          title: "Login gagal",
          description: error,
        });
      }
    });
  };

  return (
    <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center space-y-14">
      <div className="flex items-center gap-3">
        <Image src={logo} alt="" width={50} height={50} className="size-9" />
        <h1 className="text-3xl font-semibold">SIMS PPOB</h1>
      </div>
      <h3 className="max-w-md text-center text-4xl font-medium">
        Masuk atau buat akun untuk memulai
      </h3>
      <Form {...form}>
        <form
          className="w-full space-y-8 text-lg"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <IconInput
                    icon={AtSign}
                    {...field}
                    placeholder="masukkan email anda"
                    autoFocus
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    icon={LockKeyhole}
                    {...field}
                    placeholder="masukkan password anda"
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton loading={isPending} className="h-12 w-full">
            Masuk
          </LoadingButton>
        </form>
      </Form>
      <p className="text-sm">
        belum punya akun? registrasi{" "}
        <Link href={"/registration"} className="text-primary">
          di sini
        </Link>
      </p>
    </div>
  );
}
