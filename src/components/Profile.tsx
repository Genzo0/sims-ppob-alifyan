import { validateRequest } from "@/lib/auth";
import profil from "@/assets/profil.png";
import Image from "next/image";

export default async function Profile() {
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
        <p className="text-xl">Selamat datang,</p>
        <p className="text-2xl font-semibold tracking-wide">
          {user?.first_name} {user?.last_name}
        </p>
      </div>
    </div>
  );
}
