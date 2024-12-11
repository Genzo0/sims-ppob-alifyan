"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navItems = [
  { label: "Top Up", href: "/top-up" },
  { label: "Transaction", href: "/transaction" },
  { label: "Akun", href: "/account" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-6">
        <Link href={"/"} className="text-2xl font-bold">
          <div className="flex items-center gap-1.5">
            <Image
              src={logo}
              alt=""
              width={30}
              height={30}
              className="size-6"
            />
            <p className="text-lg font-semibold">SIMS PPOB</p>
          </div>
        </Link>
        <ul className="flex gap-16 text-lg font-medium">
          {navItems.map((item, i) => (
            <NavItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </header>
  );
}

export interface NavItem {
  label: string;
  href: string;
}

interface NavItemProps {
  item: NavItem;
  className?: string;
}

function NavItem({ item, className = "" }: NavItemProps) {
  const pathname = usePathname();
  const active = pathname === item.href;

  const DynamicTag = active ? "span" : Link;

  return (
    <li className={`${className} ${active ? "bg-black/20 md:bg-inherit" : ""}`}>
      <DynamicTag
        href={item.href}
        className={`${active ? "text-primary" : ""}`}
      >
        {item.label}
      </DynamicTag>
    </li>
  );
}
