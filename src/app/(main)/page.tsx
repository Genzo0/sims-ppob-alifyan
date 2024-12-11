import Image from "next/image";
import profil from "@/assets/profil.png";
import { validateRequest } from "@/lib/auth";
import Balance from "./Balance";
import { getSessionToken } from "@/lib/sessions";
import { Service } from "@/lib/types";
import Banners from "./Banners";

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

async function Profile() {
  const { user } = await validateRequest();
  return (
    <div className="flex w-2/5 flex-col justify-between">
      <Image
        src={profil}
        alt="profil"
        width={100}
        height={100}
        className="size-20"
      />
      <div>
        <p className="text-2xl">Selamat datang,</p>
        <p className="text-3xl font-semibold tracking-wide">
          {user?.first_name} {user?.last_name}
        </p>
      </div>
    </div>
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
        <ServiceItem key={service.service_code} service={service} />
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
