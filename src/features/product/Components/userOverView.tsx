"use client";

import { useState } from "react";
import {
  IconCheck,
  IconPackage,
  IconStar,
  IconStarFilled,
  IconTruck,
} from "@tabler/icons-react";
import { ProductDetails } from "../Services/ProductDetails.Type";

type Tab = "details" | "reviews" | "shipping";

function Stars({ value, className = "size-4" }: { value: number; className?: string }) {
  return (
    <div className="flex text-primary-400">
      {Array.from({ length: 5 }).map((_, i) =>
        i < Math.round(value) ? (
          <IconStarFilled key={i} className={className} />
        ) : (
          <IconStar key={i} className={className} />
        )
      )}
    </div>
  );
}

export default function UserOverView({ ProductData }: { ProductData: ProductDetails }) {
  const {
    description,
    category,
    subcategory,
    brand,
    sold,
    ratingsAverage,
    ratingsQuantity,
    reviews,
  } = ProductData;

  const [tab, setTab] = useState<Tab>("details");

  const allReviews = reviews ?? [];
  const subcategoryName = subcategory[0]?.name;

  // نسبة كل تقييم (5 → 1)
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = allReviews.filter((r) => r.rating === star).length;
    const percent = allReviews.length ? (count / allReviews.length) * 100 : 0;
    return { star, percent };
  });

  const tabs: { id: Tab; label: string; icon: typeof IconPackage }[] = [
    { id: "details", label: "Product Details", icon: IconPackage },
    { id: "reviews", label: `Reviews (${ratingsQuantity})`, icon: IconStar },
    { id: "shipping", label: "Shipping & Returns", icon: IconTruck },
  ];

  return (
    <section className="mt-8 rounded-2xl border border-gray-200 bg-white">
      {/* Tabs header */}
      <div role="tablist" className="flex overflow-x-auto border-b border-gray-200 px-2 sm:px-4">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3.5 text-lg font-medium transition-colors ${
              tab === id
                ? "border-primary-500 text-primary-700"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-6">
        {/* Product Details */}
        {tab === "details" && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-base font-semibold text-gray-900">About this Product</h2>
              <p className="mt-2 whitespace-pre-line text-lg leading-relaxed text-gray-600">
                {description}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Product Information</h3>
                <div className="divide-y divide-gray-200 text-lg">
                  <div className="flex justify-between py-1.5">
                    <span className="text-gray-500">Category</span>
                    <span className="font-medium text-gray-800">{category.name}</span>
                  </div>
                  {subcategoryName && (
                    <div className="flex justify-between py-1.5">
                      <span className="text-gray-500">Subcategory</span>
                      <span className="font-medium text-gray-800">{subcategoryName}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1.5">
                    <span className="text-gray-500">Brand</span>
                    <span className="font-medium text-gray-800">{brand.name}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-gray-500">Items Sold</span>
                    <span className="font-medium text-gray-800">
                      {sold.toLocaleString("en-US")} sold
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Key Features</h3>
                <ul className="flex flex-col gap-2 text-lg text-gray-700">
                  <li className="flex items-center gap-2">
                    <IconCheck className="size-4 text-primary-600" />
                    Premium Quality Product
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="size-4 text-primary-600" />
                    100% Authentic Guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="size-4 text-primary-600" />
                    Fast & Secure Packaging
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="size-4 text-primary-600" />
                    Quality Tested
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Reviews */}
        {tab === "reviews" && (
          <div className="flex flex-col gap-6">
            {/* Summary */}
            <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr] sm:gap-12">
              <div className="flex flex-col items-center gap-1 sm:px-10">
                <span className="text-5xl font-bold text-gray-900">{ratingsAverage}</span>
                <Stars value={ratingsAverage} className="size-5" />
                <span className="text-sm text-gray-500">
                  Based on {ratingsQuantity} reviews
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {distribution.map(({ star, percent }) => (
                  <div key={star} className="flex items-center gap-4">
                    <span className="w-8 shrink-0 text-sm leading-tight text-gray-500">
                      {star}
                      <br />
                      star
                    </span>
                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-primary-400"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-8 shrink-0 text-right text-lg text-gray-500">
                      {Math.round(percent)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Empty state */}
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <IconStarFilled className="size-6 text-gray-300" />
              <p className="text-sm text-gray-500">
                Customer reviews will be displayed here.
              </p>
              <button
                type="button"
                className="text-lg font-medium text-primary-700 hover:underline"
              >
                Write a Review
              </button>
            </div>
          </div>
        )}

        {/* Shipping & Returns */}
        {tab === "shipping" && (
          <div className="grid gap-4 text-lg text-gray-600 md:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="mb-2 font-semibold text-gray-900">Shipping</h3>
              <p>Free delivery on orders over 500 EGP. Orders usually arrive within 2–5 business days.</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <h3 className="mb-2 font-semibold text-gray-900">Returns</h3>
              <p>Return unused items within 30 days of delivery for a full refund.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}