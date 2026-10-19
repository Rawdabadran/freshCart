"use client";

export type Filters = {
  categories: string[];
  brands: string[];
  min: string;
  max: string;
};

export const emptyFilters: Filters = { categories: [], brands: [], min: "", max: "" };

const PRICE_CHIPS = [
  { label: "Under 500", max: "500" },
  { label: "Under 1K", max: "1000" },
  { label: "Under 5K", max: "5000" },
  { label: "Under 10K", max: "10000" },
];

type Props = {
  allCategories: string[];       // كل الكاتيجوريز الموجودة
  availableCategories: string[]; // اللي ليها نتايج في البحث الحالي
  brands: string[];
  filters: Filters;
  onChange: (filters: Filters) => void;
};

export default function SearchFilters({
  allCategories,
  availableCategories,
  brands,
  filters,
  onChange,
}: Props) {
  const toggle = (key: "categories" | "brands", value: string) => {
    const current = filters[key];
    onChange({
      ...filters,
      [key]: current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    });
  };

  const hasFilters =
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.min !== "" ||
    filters.max !== "";

  const renderCheckList = (
    key: "categories" | "brands",
    items: string[],
    available?: string[],
  ) => (
    <ul className="max-h-56 space-y-3 overflow-y-auto pr-1">
      {items.map((item) => {
        const checked = filters[key].includes(item);
        // معطّل لو مفيهوش نتايج، إلا لو مختار (عشان تقدري تشيليه)
        const disabled = !!available && !available.includes(item) && !checked;

        return (
          <li key={item}>
            <label
              className={`flex items-center gap-3 ${
                disabled
                  ? "cursor-not-allowed text-gray-300"
                  : "cursor-pointer text-gray-700 hover:text-primary-600"
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() => toggle(key, item)}
                className="h-4 w-4 rounded border-gray-300 accent-primary-600 disabled:cursor-not-allowed"
              />
              {item}
            </label>
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside className="rounded-xl border border-gray-200 bg-white p-6">
      {hasFilters && (
        <button
          type="button"
          onClick={() => onChange(emptyFilters)}
          className="mb-4 text-sm font-medium text-primary-600 hover:underline"
        >
          Clear all filters
        </button>
      )}

      {/* Categories */}
      <h3 className="mb-4 text-lg font-bold">Categories</h3>
      {allCategories.length ? (
        renderCheckList("categories", allCategories, availableCategories)
      ) : (
        <p className="text-sm text-gray-400">No categories</p>
      )}

      <hr className="my-6 border-gray-200" />

      {/* Price */}
      <h3 className="mb-4 text-lg font-bold">Price Range</h3>
      <div className="flex gap-3">
        <label className="flex-1 text-sm text-gray-500">
          Min (EGP)
          <input
            type="number"
            min={0}
            value={filters.min}
            onChange={(e) => onChange({ ...filters, min: e.target.value })}
            placeholder="0"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 outline-none focus:border-primary-600"
          />
        </label>
        <label className="flex-1 text-sm text-gray-500">
          Max (EGP)
          <input
            type="number"
            min={0}
            value={filters.max}
            onChange={(e) => onChange({ ...filters, max: e.target.value })}
            placeholder="No limit"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 outline-none focus:border-primary-600"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRICE_CHIPS.map((chip) => {
          const active = filters.min === "" && filters.max === chip.max;
          return (
            <button
              key={chip.label}
              type="button"
              onClick={() =>
                onChange({ ...filters, min: "", max: active ? "" : chip.max })
              }
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                active
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Brands */}
      <h3 className="mb-4 text-lg font-bold">Brands</h3>
      {brands.length ? (
        renderCheckList("brands", brands)
      ) : (
        <p className="text-sm text-gray-400">No brands</p>
      )}
    </aside>
  );
}