import Image from "next/image";
import login from "@/assets/login.png";
import LoginForm from "./LoginForm";

export default function Page() {
  return (
    <main className="flex h-screen">
      <div className="max-h-screen w-1/2">
        <LoginForm />
      </div>
      <div className="max-h-screen w-1/2">
        <Image
          src={login}
          width={1000}
          height={1000}
          alt="Login Image"
          className="h-full w-full object-cover"
        />
      </div>
    </main>
  );
}
