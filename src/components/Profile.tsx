import { validateRequest } from "@/lib/auth";
import UserAvatar from "./UserAvatar";

export default async function Profile() {
  const { user } = await validateRequest();
  return (
    <div className="flex w-2/5 flex-col justify-between">
      <UserAvatar avatarUrl={user?.profile_image} size={100} />
      <div>
        <p className="text-xl">Selamat datang,</p>
        <p className="text-2xl font-semibold tracking-wide">
          {user?.first_name} {user?.last_name}
        </p>
      </div>
    </div>
  );
}
