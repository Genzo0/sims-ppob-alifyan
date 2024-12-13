"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { IconInput } from "@/components/IconInput";
import { AtSign, LockKeyhole, UserCircle } from "lucide-react";
import { PasswordInput } from "@/components/PasswordInput";
import LoadingButton from "@/components/LoadingButton";
import Link from "next/link";
import { useState, useTransition } from "react";
import { register } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: RegisterValues) => {
    setError(undefined);
    startTransition(async () => {
      const { error, success } = await register(values);
      if (error) {
        toast({
          variant: "destructive",
          title: "Registrasi gagal",
          description: error,
        });
      } else {
        toast({
          title: "Registrasi berhasil",
          description: success,
        });
        router.push("/login");
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
        Lengkapi data untuk membuat akun
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
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <IconInput
                    icon={UserCircle}
                    {...field}
                    placeholder="nama depan"
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <IconInput
                    icon={UserCircle}
                    {...field}
                    placeholder="nama belakang"
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
                    placeholder="buat password"
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    icon={LockKeyhole}
                    {...field}
                    placeholder="konfirmasi password"
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton loading={isPending} className="h-12 w-full">
            Registrasi
          </LoadingButton>
        </form>
      </Form>
      <p className="text-sm">
        sudah punya punya akun? login{" "}
        <Link href={"/login"} className="text-primary">
          di sini
        </Link>
      </p>
    </div>
  );
}
