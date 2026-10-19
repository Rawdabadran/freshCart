import Link from "next/link";
import { IconUser } from "@tabler/icons-react";

export default function AccountHero() {
  return (
    <section className="bg-linear-to-r from-primary-700 to-primary-400 py-10 text-white">
      <div className="container mx-auto px-4">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex items-center gap-2 text-xs text-white/80"
        >
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span>/</span>
          <span className="text-white">My Account</span>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20">
            <IconUser size={32} stroke={2} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-sm text-white/90">
              Manage your addresses and account settings
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}