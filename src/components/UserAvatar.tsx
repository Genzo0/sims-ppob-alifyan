import Image from "next/image";
import avatarPlaceholder from "@/assets/profil.png";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  size?: number;
  className?: string;
}

export default function UserAvatar({
  avatarUrl,
  size,
  className,
}: UserAvatarProps) {
  const isNull = avatarUrl?.includes("null");
  avatarUrl = isNull ? null : avatarUrl;

  return (
    <Image
      src={avatarUrl || avatarPlaceholder}
      alt="User Avatar"
      width={size ?? 40}
      height={size ?? 40}
      className={cn(
        "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
        className,
      )}
      priority
    />
  );
}
