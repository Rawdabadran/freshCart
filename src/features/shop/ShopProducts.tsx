"use client";

import { useMemo, useState } from "react";
import ProductCart from "../categores/components/ProductCart/ProductCart";
import SearchFilters, { emptyFilters, Filters } from "../search/searchFliter"; // عدلي المسار

type Product = Awaited<
  ReturnType<typeof import("../categores/api/getProducts").GetProducts>
>["data"][number];

const ALL_CATEGORIES = [
  "Music",
  "Men's Fashion",
  "Women's Fashion",
  "SuperMarket",
  "Baby & Toys",
  "Home",
  "Books",
  "Beauty & Health",
  "Electronics",
];

export default function ShopProducts({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [showFilters, setShowFilters] = useState(false); // للموبايل بس

  const brands = useMemo(
    () =>
      Array.from(new Set(products.map((p) => p.brand?.name))).filter(
        (n): n is string => !!n,
      ),
    [products],
  );

  const availableCategories = useMemo(
    () =>
      Array.from(new Set(products.map((p) => p.category?.name))).filter(
        (n): n is string => !!n,
      ),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const min = filters.min === "" ? 0 : Number(filters.min);
    const max = filters.max === "" ? Infinity : Number(filters.max);

    return products.filter((p) => {
      const price = p.priceAfterDiscount ?? p.price;

      const matchCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(p.category?.name ?? "");
      const matchBrand =
        filters.brands.length === 0 ||
        filters.brands.includes(p.brand?.name ?? "");
      const matchPrice = price >= min && price <= max;

      return matchCategory && matchBrand && matchPrice;
    });
  }, [products, filters]);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowFilters((v) => !v)}
        className="mb-4 w-fit rounded-lg border border-gray-200 px-4 py-2 text-sm lg:hidden"
      >
        {showFilters ? "Hide filters" : "Show filters"}
      </button>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className={showFilters ? "block" : "hidden lg:block"}>
          <SearchFilters
            allCategories={ALL_CATEGORIES}
            availableCategories={availableCategories}
            brands={brands}
            filters={filters}
            onChange={setFilters}
          />
        </div>

        <div className="grid h-fit grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-red-500">
              We don't provide this item
            </p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCart key={product.id} {...product} />
            ))
          )}
        </div>
      </div>
    </>
  );
}