"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconChevronRight, IconSettings } from "@tabler/icons-react";

const LINKS = [
  { href: "/profile/setting", label: "Settings", Icon: IconSettings },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-fit rounded-xl border border-gray-200 bg-white p-4">
      <h2 className="mb-4 text-sm font-semibold text-gray-900">My Account</h2>

      <ul className="space-y-2">
        {LINKS.map(({ href, label, Icon }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center justify-between rounded-lg p-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-primary-50 text-primary-900"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      isActive
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <Icon size={16} />
                  </span>
                  {label}
                </span>
                <IconChevronRight
                  size={16}
                  className={isActive ? "text-primary-700" : "text-gray-400"}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}