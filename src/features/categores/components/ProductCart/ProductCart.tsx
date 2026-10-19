"use client";
import {
  
  IconEye,
  IconStarFilled,
  IconStar,
  IconPlus,
} from "@tabler/icons-react";
import { Product } from "../../types/allProductType";
import Link from "next/link";
import WishlistButton from "@/features/wichlist/components/WishlistButton";
import { addToCart, getCartItems } from "@/features/cart/services/CartOpterations";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { cartActions } from "@/store/slices/cart.slice";


const actionBtnClass =
  "flex size-8 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-colors hover:bg-primary-600 hover:text-white sm:size-10";
const actionIconClass = "size-4 sm:size-5";

export default function ProductCart({
  title,
  id,
  imageCover,
  category,
  price,
  priceAfterDiscount,
  ratingsAverage,
  ratingsQuantity,
  quantity,
}: Product) {
  const hasDiscount = priceAfterDiscount !== undefined;
  const finalPrice = priceAfterDiscount ?? price;
  const discountPercent = hasDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;
  const inStock = quantity > 0;

  const dispatch = useDispatch();
  const { setCartInfo } = cartActions;

 async function handelCart() {
  if (!inStock) {
    toast.error("Sorry, this product is out of stock");
    return;
  }
  const response = await addToCart(id);


  if (response.status !== "success") {
    
    toast.error(response.message);

    return;
  }

  const fullCart = await getCartItems();
  console.log(fullCart)
  if (fullCart?.status === "success") {
    dispatch(setCartInfo(fullCart));
  }

  toast.success(response.message);
}

  return (
    <div className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-2.5 transition-shadow duration-500 hover:shadow-2xl sm:p-4">
      {/* Discount badge */}
      {hasDiscount && (
        <span className="absolute left-0 top-4 z-10 rounded-r-md bg-red-500 px-2 py-0.5 text-xs font-semibold text-white sm:top-6 sm:px-3 sm:py-1 sm:text-sm">
          -{discountPercent}%
        </span>
      )}

      {/* Image + action buttons */}
      <div className="relative aspect-square h-[30vh] w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageCover}
          alt={title}
          className={`h-full w-full object-contain ${!inStock ? "opacity-60" : ""}`}
        />

        <div className="absolute right-0 top-0 flex flex-col gap-2 sm:gap-3">
          <WishlistButton productId={id} />

          

          <Link
            href={`/product/${id}`}
            aria-label="Quick view"
            className={actionBtnClass}
          >
            <IconEye className={actionIconClass} stroke={1.8} />
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-col gap-0.5 sm:mt-4 sm:gap-1">
        <span className="truncate text-xs text-gray-500 sm:text-sm">
          {category.name}
        </span>
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-600 sm:text-lg">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex flex-wrap items-center gap-x-2">
          <div className="flex text-primary-300">
            {Array.from({ length: 5 }).map((_, i) =>
              i < Math.floor(ratingsAverage) ? (
                <IconStarFilled key={i} className="size-3.5 sm:size-4.5" />
              ) : (
                <IconStar key={i} className="size-3.5 sm:size-4.5" />
              )
            )}
          </div>
          <span className="text-xs text-gray-500 sm:text-sm">
            {ratingsAverage} ({ratingsQuantity})
          </span>
        </div>

        {/* Stock status */}
        <span
          className={`flex items-center gap-1 text-xs font-medium sm:text-sm ${
            inStock ? "text-green-600" : "text-red-500"
          }`}
        >
          <span
            className={`size-2 rounded-full ${
              inStock ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Price + add to cart */}
      <div className="mt-3 flex items-center justify-between gap-2 sm:mt-4">
        <div className="flex w-[85%] min-w-0 items-center justify-between">
          <span
            className={`truncate text-base font-bold sm:text-xl ${
              hasDiscount ? "text-primary-700" : "text-gray-900"
            }`}
          >
            {finalPrice} EGP
          </span>

          {hasDiscount && (
            <span className="mx-2 mt-2 text-xs text-gray-400 line-through sm:text-sm">
              {price} EGP
            </span>
          )}
        </div>

        <button
          onClick={handelCart}
          type="button"
          aria-label="Add to cart"
          aria-disabled={!inStock}
          className={`flex size-9 shrink-0 items-center justify-center rounded-full text-white transition-colors sm:size-11 ${
            inStock
              ? "bg-primary-600 hover:bg-primary-700"
              : "cursor-not-allowed bg-gray-300"
          }`}
        >
          <IconPlus className="size-5 sm:size-6" />
        </button>
      </div>
    </div>
  );
}