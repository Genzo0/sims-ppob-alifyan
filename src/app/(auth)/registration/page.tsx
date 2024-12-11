import Image from "next/image";
import RegisterForm from "./RegisterForm";
import register from "@/assets/login.png";

export default function Page() {
  return (
    <main className="flex h-screen">
      <div className="max-h-screen w-1/2">
        <RegisterForm />
      </div>
      <div className="max-h-screen w-1/2">
        <Image
          src={register}
          width={1000}
          height={1000}
          alt="Register Image"
          className="h-full w-full object-cover"
        />
      </div>
    </main>
  );
}
