"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appState } from "@/store/store";
import { fetchProducts } from "@/store/slices/allProducts";
import ProductCart from "../categores/components/ProductCart/ProductCart";
import SearchFilters, { emptyFilters, Filters } from "./searchFliter";

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

export default function SearchResults() {
  const searchInput = useSelector((s: appState) => s.SearchReducer.searchInput);
  const products = useSelector((s: appState) => s.productsReducer.products);
  const dispatch = useDispatch<any>();

  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [showFilters, setShowFilters] = useState(false); // للموبايل بس

  useEffect(() => {
    if (!products?.length) dispatch(fetchProducts());
  }, [dispatch, products?.length]);

  // 1) نتايج كلمة البحث بس
  const baseResults = useMemo(() => {
    const term = searchInput.trim().toLowerCase();
    const list = products ?? [];
    if (!term) return list;

    return list.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.category?.name?.toLowerCase().includes(term) ||
        p.brand?.name?.toLowerCase().includes(term),
    );
  }, [searchInput, products]);

  // 2) الكاتيجوريز اللي ليها نتايج في البحث الحالي
  const availableCategories = useMemo(
    () =>
      Array.from(new Set(baseResults.map((p) => p.category?.name))).filter(
        (n): n is string => !!n,
      ),
    [baseResults],
  );

  const brands = useMemo(
    () =>
      Array.from(new Set(baseResults.map((p) => p.brand?.name))).filter(
        (n): n is string => !!n,
      ),
    [baseResults],
  );

  // 3) تطبيق الفلاتر
  const filteredProducts = useMemo(() => {
    const min = filters.min === "" ? 0 : Number(filters.min);
    const max = filters.max === "" ? Infinity : Number(filters.max);

    return baseResults.filter((p) => {
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
  }, [baseResults, filters]);

  return (
    <div className="container m-auto min-h-screen px-4 py-8">
      <h2 className="mb-6 text-xl font-semibold">
        Results for "{searchInput}"{" "}
        <span className="text-sm font-normal text-gray-500">
          ({filteredProducts.length})
        </span>
      </h2>

      <button
        type="button"
        onClick={() => setShowFilters((v) => !v)}
        className="mb-4 rounded-lg border border-gray-200 px-4 py-2 text-sm lg:hidden"
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
    </div>
  );
}