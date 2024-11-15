"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboardIcon,
  CreditCard,
  BarChart,
  Settings,
} from "lucide-react";

// Mapping icons to their component names
const iconMap = {
  Dashboard: LayoutDashboardIcon,
  CreditCard: CreditCard,
  BarChart: BarChart,
  Settings: Settings,
};

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "Dashboard",
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: "CreditCard",
  },
  {
    name: "Investments",
    href: "/investments",
    icon: "BarChart",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: "Settings",
  },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const IconComponent = iconMap[link.icon as keyof typeof iconMap];

        return (
          <div
            className="flex flex-col items-center justify-center"
            key={link.name}
          >
            <Link href={link.href}>
              <IconComponent className="w-6 h-6" />{" "}
              {/* Adjust size as needed */}
            </Link>
            {pathname === link.href ? (
              <p className="text-xs font-bold">{link.name}</p>
            ) : null}
          </div>
        );
      })}
    </>
  );
}
