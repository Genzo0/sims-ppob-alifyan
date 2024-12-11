"use client";

import { formatCurrency } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import background from "@/assets/background_saldo.png";
import { balanceApi } from "./store";
import { useSession } from "./SessionProvider";
import { useState } from "react";

export default function Balance() {
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useSession();
  const { data: balance } = balanceApi(token).useGetBalanceQuery();

  return (
    <div className="relative w-3/5">
      <Image
        src={background}
        alt=""
        width={1000}
        height={1000}
        className="w-full"
        priority
      />
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-start px-10">
        <div className="space-y-5 text-left text-secondary">
          <p className="text-xl font-semibold">Saldo Anda</p>
          <div className="flex items-center gap-3 text-3xl font-semibold">
            <p>Rp.</p>
            <input
              type={showPassword ? "text" : "password"}
              className="bg-transparent"
              value={formatCurrency(balance?.balance || 0)}
              disabled
            />
          </div>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Hide password" : "Show password"}
            className="flex items-center gap-2 text-lg font-semibold"
          >
            Lihat saldo
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
