"use client";

import UserAvatar from "@/components/UserAvatar";
import { AtSignIcon, Pencil, UserRound } from "lucide-react";
import { useSession } from "../SessionProvider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IconInput } from "@/components/IconInput";
import LoadingButton from "@/components/LoadingButton";
import { useForm } from "react-hook-form";
import { profileSchema, ProfileValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { logout, updateProfile } from "./actions";
import { useRef, useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import avatarPlaceholder from "@/assets/profil.png";
import Image, { StaticImageData } from "next/image";
import Resizer from "react-image-file-resizer";
import CropImageDialog from "@/components/CropImageDialog";

export default function AccountForm() {
  const { user } = useSession();

  const [isEditing, setIsEditing] = useState(false);

  const [isPending, startTransition] = useTransition();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>();

  const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null);

  const { toast } = useToast();

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });

  const onSubmit = (values: ProfileValues) => {
    const newAvatarFile = croppedAvatar
      ? new File([croppedAvatar], `avatar_${user.email}.png`, {
          type: "image/png",
        })
      : undefined;

    setError(undefined);
    startTransition(async () => {
      const { error, success } = await updateProfile(values, newAvatarFile);
      if (error) {
        toast({
          variant: "destructive",
          title: "Update profile gagal",
          description: error,
        });
      } else {
        toast({
          title: "Update profile berhasil",
          description: success,
        });
        setIsEditing(false);
        window.location.reload();
      }
    });
  };

  return (
    <div className="mx-auto flex w-full flex-col items-center space-y-7">
      <div className="relative">
        {isEditing ? (
          <AvatarInput
            src={
              croppedAvatar
                ? URL.createObjectURL(croppedAvatar)
                : user.profile_image.includes("null")
                  ? avatarPlaceholder
                  : user.profile_image
            }
            onImageCropped={setCroppedAvatar}
          />
        ) : (
          <UserAvatar
            avatarUrl={user.profile_image}
            size={150}
            className="size-32"
          />
        )}
      </div>
      <h3 className="text-3xl font-semibold">
        {user.first_name} {user.last_name}
      </h3>
      <Form {...form}>
        <form
          className="w-full max-w-3xl space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <IconInput
                    className="h-12 w-full max-w-3xl disabled:opacity-100"
                    placeholder="email"
                    icon={AtSignIcon}
                    {...field}
                    disabled
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
                <FormLabel>Nama Depan</FormLabel>
                <FormControl>
                  <IconInput
                    className="h-12 w-full max-w-3xl disabled:opacity-100"
                    placeholder="nama depan"
                    icon={UserRound}
                    {...field}
                    disabled={!isEditing}
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
                <FormLabel>Nama Belakang</FormLabel>
                <FormControl>
                  <IconInput
                    className="h-12 w-full max-w-3xl disabled:opacity-100"
                    placeholder="nama depan"
                    icon={UserRound}
                    {...field}
                    disabled={!isEditing}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isEditing ? (
            <LoadingButton
              loading={isPending}
              type="submit"
              className="h-12 w-full max-w-3xl"
            >
              Simpan
            </LoadingButton>
          ) : (
            <Button
              className="h-12 w-full max-w-3xl"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </form>
      </Form>
      <form
        onSubmit={async () => {
          await logout();
          window.location.reload();
        }}
        className="w-full max-w-3xl"
      >
        <Button
          variant="outline"
          type="submit"
          className={cn(
            "mx-auto h-12 w-full max-w-3xl border-primary text-center text-primary",
            {
              hidden: isEditing,
            },
          )}
        >
          Logout
        </Button>
      </form>
    </div>
  );
}

interface AvatarInputProps {
  src: string | StaticImageData;
  onImageCropped: (blob: Blob | null) => void;
}

function AvatarInput({ src, onImageCropped }: AvatarInputProps) {
  const [imageToCrop, setImageToCrop] = useState<File>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  function onImageSelected(image: File | undefined) {
    if (!image) return;

    Resizer.imageFileResizer(
      image,
      1024,
      1024,
      "PNG",
      100,
      0,
      (uri) => setImageToCrop(uri as File),
      "file",
    );
  }

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onImageSelected(e.target.files?.[0])}
        ref={fileInputRef}
        className="sr-only hidden"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="group relative block"
      >
        <Image
          src={src}
          alt="Avatar preview"
          width={150}
          height={150}
          className="size-32 flex-none rounded-full object-cover"
        />
        <span className="absolute -bottom-1 -right-1 m-auto flex size-10 items-center justify-center rounded-full bg-secondary text-white transition-colors duration-200 group-hover:bg-opacity-25">
          <Pencil size={24} className="fill-black" />
        </span>
      </button>
      {imageToCrop && (
        <CropImageDialog
          src={URL.createObjectURL(imageToCrop)}
          cropAspecRatio={1}
          onCropped={onImageCropped}
          onClose={() => {
            setImageToCrop(undefined);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }}
        />
      )}
    </>
  );
}
