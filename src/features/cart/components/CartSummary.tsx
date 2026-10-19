"use client";
import { useSelector } from "react-redux";
import type { appState } from "@/store/store";
import {
  IconArrowLeft, IconLock, IconShieldCheck, IconShoppingBag, IconTag, IconTruck,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";


const FREE_SHIPPING_THRESHOLD = 500; 
const SHIPPING_COST = 50;

export default function CartSummary() {
 const router= useRouter();


  const numOfCartItems = useSelector((state: appState) => state.cartReducer.numOfCartItems);
  const subtotal = useSelector((state: appState) => state.cartReducer.data.totalCartPrice);

  const isEmpty = numOfCartItems === 0;
  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = isEmpty || qualifiesForFreeShipping ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <aside className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
      {/* Header */}
      <div className="bg-primary-600 px-6 py-5 text-white">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <IconShoppingBag size={20} /> Order Summary
        </h2>
        <p className="mt-1 text-sm text-white">
          You have {numOfCartItems} {numOfCartItems === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="space-y-5 p-6">
        {!isEmpty && qualifiesForFreeShipping && (
          <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4">
            <IconTruck size={20} className="text-green-600" />
            <div>
              <p className="text-sm font-semibold text-green-700">Free Shipping!</p>
              <p className="text-xs text-green-600">You qualify for free delivery</p>
            </div>
          </div>
        )}

        {!isEmpty && !qualifiesForFreeShipping && (
          <div className="rounded-xl bg-primary-200 p-4">
            <p className="flex items-center gap-2 text-sm text-gray-500">
              <IconTruck size={16} className="text-primary-700" />
              Add {remaining} EGP for free shipping
            </p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-primary-100">
              <div
                className="h-full rounded-full bg-primary-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Prices */}
        <div className="space-y-3 text-sm text-gray-500">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-gray-900">{subtotal} EGP</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            {shipping === 0 ? (
              <span className="flex gap-3">
                <span className="font-medium text-green-600">FREE</span>
                {!isEmpty && (
                  <span className="text-gray-400 line-through">{SHIPPING_COST} EGP</span>
                )}
              </span>
            ) : (
              <span className="text-gray-900">{shipping} EGP</span>
            )}
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-gray-100 pt-4">
          <span className="font-medium text-gray-900">Total</span>
          <span className="text-2xl font-bold text-gray-900">
            {total} <span className="text-xs font-normal text-gray-400">EGP</span>
          </span>
        </div>

        {/* Promo */}
        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm text-gray-600">
          <IconTag size={14} /> Apply Promo Code
        </button>

        {/* Checkout */}
        <button
        onClick={()=>{router.push("./payment")}}
          disabled={isEmpty}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 py-3.5 font-semibold text-white shadow-md shadow-primary-500/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <IconLock size={16} /> Secure Checkout
        </button>

        {/* Badges */}
        <div className="flex justify-center gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <IconShieldCheck size={14} className="text-green-600" /> Secure Payment
          </span>
          <span className="flex items-center gap-1">
            <IconTruck size={14} className="text-blue-600" /> Fast Delivery
          </span>
        </div>

        <p className="flex items-center justify-center gap-1 text-sm text-primary-700">
          <IconArrowLeft size={14} /> Continue Shopping
        </p>
      </div>
    </aside>
  );
}