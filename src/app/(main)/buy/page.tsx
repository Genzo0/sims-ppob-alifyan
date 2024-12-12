import Image from "next/image";
import Balance from "../Balance";
import BuyForm from "./BuyForm";
import Profile from "@/components/Profile";

interface PageProps {
  searchParams: Promise<{
    service: string;
    price: number;
    icon: string;
    code: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { service, price, icon, code } = await searchParams;

  return (
    <main className="w-full space-y-16 py-5">
      <div className="flex">
        <Profile />
        <Balance />
      </div>
      <div className="space-y-2">
        <p className="text-xl">Pembayaran</p>
        <div className="flex items-center gap-3">
          <Image
            src={icon}
            alt=""
            width={100}
            height={100}
            className="size-8"
          />
          <p className="text-xl font-semibold tracking-wide">{service}</p>
        </div>
      </div>
      <BuyForm price={price} code={code} service={service} />
    </main>
  );
}
