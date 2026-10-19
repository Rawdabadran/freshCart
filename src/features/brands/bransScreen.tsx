import Link from "next/link";
import { IconTag } from "@tabler/icons-react";
import BrandCard from "./brandCart";
import { getBrands } from "./getAllbrands"; // عدلي المسار

export default async function BrandsScreen() {
  const brands = await getBrands();

  return (
    <main>
      {/* Hero */}
      <section className="bg-linear-to-r from-primary-700 to-primary-400 py-10 text-white">
        <div className="container mx-auto px-4">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center gap-2 text-xs text-white/70"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Brands</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20">
              <IconTag size={32} stroke={2} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Top Brands</h1>
              <p className="text-sm text-white/80">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4 py-10">
        {brands.data.length === 0 ? (
          <p className="text-center text-gray-500">No brands found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-5">
            {brands.data.map((brand) => (
              <BrandCard
                key={brand._id}
                id={brand._id}
                name={brand.name}
                image={brand.image}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}