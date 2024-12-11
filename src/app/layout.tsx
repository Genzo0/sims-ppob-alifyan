import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | SIMS PPOB - Muhammad Alifyan Satrio Nugroho",
    absolute: "SIMS PPOB - Muhammad Alifyan Satrio Nugroho",
  },
  description:
    "Bayar tagihan listrik, pulsa, dan lainnya dengan mudah dan cepat di SIMS PPOB. Ayo, mulai bayar tagihanmu sekarang!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}