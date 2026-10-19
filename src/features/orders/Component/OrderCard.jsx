"use client";

import { useState } from "react";
import {
  IconCalendar,
  IconChevronDown,
  IconChevronUp,
  IconCircleCheck,
  IconClock,
  IconHash,
  IconMapPin,
  IconPhone,
    IconCash,
  IconBrandVisa,
  IconReceipt,
  IconShoppingBag,
} from "@tabler/icons-react";

export default function OrderCard({
  id,
  createdAt,
  isDelivered,
  totalOrderPrice,
  paymentMethodType,
  shippingPrice ,
  taxPrice ,
  shippingAddress: { details, phone, city } = {},
  cartItems = [],
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen);

  const firstImage = cartItems[0]?.product?.imageCover;
  const itemsCount = cartItems.reduce((sum, item) => sum + item.count, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.count * item.price, 0);

  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const status = isDelivered
    ? { label: "Delivered", classes: "bg-green-100 text-green-700", Icon: IconCircleCheck }
    : { label: "Processing", classes: "bg-amber-100 text-amber-700", Icon: IconClock };
  const StatusIcon = status.Icon;

  return (
    <article
      className={`relative rounded-2xl border-2   ${
        open ? "border-primary-300" : "border-gray-300"
      } bg-white p-4 sm:p-6`}
    >
      {/* Receipt button */}
      <button
        type="button"
        aria-label="View receipt"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-gray-200 sm:right-6 sm:top-6"
      >
      {paymentMethodType==="cash"?(<IconCash className="h-5 w-5"/>):(<IconBrandVisa className="h-5 w-5"/>)}  
      </button>

      {/* Summary */}
      <div className="flex gap-4 sm:gap-5">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 sm:h-28 sm:w-28">
          {firstImage && (
            <img src={firstImage} alt="" className="h-full w-full object-contain p-2" />
          )}
        </div>

        <div className="min-w-0 flex-1 pr-12">
          <span
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${status.classes}`}
          >
            <StatusIcon className="h-3.5 w-3.5" />
            {status.label}
          </span>

          <h3 className="mt-2 flex items-center gap-1 text-lg font-bold text-gray-900 ">
            <IconHash className="h-5 w-5 text-gray-400" />
            {id}
          </h3>

          <ul className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
            <li className="flex items-center gap-1.5">
              <IconCalendar className="h-4 w-4 text-gray-400" />
              {formattedDate}
            </li>
            <li className="flex items-center gap-1.5">
              <IconShoppingBag className="h-4 w-4 text-gray-400" />
              {itemsCount} {itemsCount === 1 ? "item" : "items"}
            </li>
            <li className="flex items-center gap-1.5">
              <IconMapPin className="h-4 w-4 text-gray-400" />
              {city}
            </li>
          </ul>
        </div>
      </div>

      {/* Total + toggle */}
      <div className="mt-4 flex items-end justify-between sm:mt-2">
        <p className="text-xl font-bold text-gray-900 ">
          {totalOrderPrice}
          <span className="ml-1 text-sm font-normal text-gray-400">EGP</span>
        </p>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          {open ? "Hide" : "Details"}
          {open ? <IconChevronUp className="h-4 w-4" /> : <IconChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {/* Expanded content */}
      {open && (
        <div className="mt-6 border-t border-gray-100 pt-5">
          <h4 className="flex items-center gap-2 font-semibold text-gray-900">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
              <IconShoppingBag className="h-4 w-4" />
            </span>
            Order Items
          </h4>

          <ul className="mt-4 space-y-3">
            {cartItems.map(({ _id, count, price, product }) => (
              <li
                key={_id}
                className="flex items-center gap-4 rounded-xl border border-gray-200 p-3"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                  {product.imageCover && (
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="h-full w-full object-contain p-1"
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-gray-900">{product.title}</p>
                  <p className="text-sm text-gray-500">
                    {count} × {price} EGP
                  </p>
                </div>

                <p className="text-right font-bold text-gray-900">
                  {count * price}
                  <span className="block text-xs font-normal text-gray-400">EGP</span>
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {/* Delivery address */}
            <section className="rounded-xl border border-gray-200 p-4">
              <h4 className="flex items-center gap-2 font-semibold text-gray-900">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <IconMapPin className="h-4 w-4" />
                </span>
                Delivery Address
              </h4>
              <p className="mt-3 font-semibold text-gray-900">{city}</p>
              <p className="mt-1 text-sm text-gray-500">{details}</p>
              <p className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                <IconPhone className="h-4 w-4 text-gray-400" />
                {phone}
              </p>
            </section>

            {/* Order summary */}
            <section className="rounded-xl border border-amber-200 bg-amber-100/70 p-4">
              <h4 className="flex items-center gap-2 font-semibold text-gray-900">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
                  <IconClock className="h-4 w-4" />
                </span>
                Order Summary
              </h4>

              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <dt>Subtotal</dt>
                  <dd>{subtotal} EGP</dd>
                </div>
                <div className="flex justify-between text-gray-600">
                  <dt>Shipping</dt>
                  <dd>{shippingPrice === 0 ? "Free" : `${shippingPrice} EGP`}</dd>
                </div>
                {taxPrice > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <dt>Tax</dt>
                    <dd>{taxPrice} EGP</dd>
                  </div>
                )}
                <div className="flex justify-between border-t border-amber-200 pt-3 font-bold text-gray-900">
                  <dt>Total</dt>
                  <dd className="text-base">{totalOrderPrice} EGP</dd>
                </div>
              </dl>
            </section>
          </div>
        </div>
      )}
    </article>
  );
}