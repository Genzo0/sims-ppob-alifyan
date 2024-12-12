import Image from "next/image";
import Balance from "./Balance";
import { getSessionToken } from "@/lib/sessions";
import { Service } from "@/lib/types";
import Banners from "./Banners";
import { Metadata } from "next";
import Link from "next/link";
import Profile from "@/components/Profile";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard SIMS PPOB",
};

export default async function Page() {
  const token = await getSessionToken();

  const getBanners = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/banner`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return [];
    }

    const result = await res.json();

    return result.data;
  };

  const banners = await getBanners();
  return (
    <main className="w-full space-y-16 py-5">
      <div className="flex">
        <Profile />
        <Balance />
      </div>
      <Services />
      <Banners banners={banners} />
    </main>
  );
}

async function Services() {
  const token = await getSessionToken();

  const getServices = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/services`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return [];
    }

    const result = await res.json();

    return result.data;
  };

  const services: Service[] = await getServices();

  return (
    <div className="flex justify-between gap-3">
      {services.map((service) => (
        <Link
          href={`/buy?service=${service.service_name}&price=${service.service_tariff}&icon=${service.service_icon}&code=${service.service_code}`}
          key={service.service_code}
        >
          <ServiceItem service={service} />
        </Link>
      ))}
    </div>
  );
}

async function ServiceItem({ service }: { service: Service }) {
  return (
    <div className="flex max-w-16 cursor-pointer flex-col items-center gap-3">
      <Image
        src={service.service_icon}
        alt={service.service_code}
        width={50}
        height={50}
        className="size-16"
      />
      <p className="text-center text-xs">{service.service_name}</p>
    </div>
  );
}
