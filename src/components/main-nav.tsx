"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const { storeId } = params;
  const routes = [
    {
      href: `/${storeId.toString()}`,
      label: "Overview",
      active: pathname === `/${storeId.toString()}`,
    },
    {
      href: `/${storeId.toString()}/billboards`,
      label: "Billboards",
      active: pathname === `/${storeId.toString()}/billboards`,
    },
    {
      href: `/${storeId.toString()}/categories`,
      label: "Categories",
      active: pathname === `/${storeId.toString()}/categories`,
    },
    {
      href: `/${storeId.toString()}/sizes`,
      label: "Sizes",
      active: pathname === `/${storeId.toString()}/sizes`,
    },
    {
      href: `/${storeId.toString()}/colors`,
      label: "Colors",
      active: pathname === `/${storeId.toString()}/colors`,
    },
    {
      href: `/${storeId.toString()}/products`,
      label: "Products",
      active: pathname === `/${storeId.toString()}/products`,
    },
    {
      href: `/${storeId.toString()}/orders`,
      label: "Orders",
      active: pathname === `/${storeId.toString()}/orders`,
    },
    {
      href: `/${storeId.toString()}/settings`,
      label: "Settings",
      active: pathname === `/${storeId.toString()}/settings`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {routes.map((route) => (
        <Link
          key={route.href}
          className={cn(
            "text-sm font-medium transition-colors duration-200 hover:text-gray-900",
            route.active ? "text-gray-900 dark:text-white" : "text-gray-400",
          )}
          href={route.href}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
