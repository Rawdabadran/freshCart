"use client"
import Link from "next/link";
import { IconArrowLeft, IconHeartFilled, IconHeart } from "@tabler/icons-react";
import WishListItem from "../components/WishListItem";
import { getWishlist } from "../api/getwishlist";
import { useSelector } from "react-redux";
import { appState } from "@/store/store";

export default function WishlistScreen() {
  
    const {data,count} = useSelector(
      (state: appState) => state.wishlistReducer
    );

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb + Title */}
      <section className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-6 lg:px-8">
          <nav className="mb-4 text-sm text-gray-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="transition hover:text-primary-600">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="font-medium text-gray-900">Wishlist</li>
            </ol>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <IconHeartFilled size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-sm text-gray-500">{count} items saved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="container mx-auto px-4 py-8 lg:px-8">
        {count === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 py-16 text-center">
            <IconHeart size={48} stroke={1.25} className="text-gray-300" />
            <p className="text-lg font-medium text-gray-900">Your wishlist is empty</p>
            <p className="text-sm text-gray-500">Save products you love to find them later.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
            <div className="hidden grid-cols-12 gap-4 bg-gray-50 px-6 py-4 text-lg font-medium text-gray-500 md:grid">
              <span className="col-span-6">Product</span>
              <span className="col-span-2 text-center">Price</span>
              <span className="col-span-2 text-center">Status</span>
              <span className="col-span-2 text-center">Actions</span>
            </div>

            <ul className="divide-y divide-gray-100">
              {data.map((item) => (
                <WishListItem key={item._id} item={item} />
              ))}
            </ul>
          </div>
        )}

        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-primary-600"
        >
          <IconArrowLeft size={16} stroke={1.75} />
          Continue Shopping
        </Link>
      </section>
    </main>
  );
}