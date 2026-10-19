"use client"

import Link from "next/link";
import {
  IconBolt,
  IconChevronRight,
  IconHeart,
  IconMinus,
  IconPlus,
  IconRefresh,
  IconShare,
  IconShieldCheck,
  IconShoppingCart,
  IconStar,
  IconStarFilled,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { ProductDetails } from "../Services/ProductDetails.Type";
import ProductGallery from "./ProductGallary";
import { toast } from "sonner";
import { addToCart, getCartItems, updateCartItemCounter } from "@/features/cart/services/CartOpterations";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cart.slice";
import { useState } from "react";
import { useRouter } from "next/navigation";
import WishlistButton from "@/features/wichlist/components/WishlistButton";

export default function ProductInfo({ ProductData }: { ProductData: ProductDetails }) {
  const {
    title,
    _id,
    description,
    imageCover,
    images,
    price,
    priceAfterDiscount,
    quantity,
    ratingsAverage,
    ratingsQuantity,
    category,
    brand,
    subcategory,
  } = ProductData;

  const gallery = [imageCover, ...images];
  const hasDiscount = priceAfterDiscount !== undefined;
  const finalPrice = priceAfterDiscount ?? price;
  const discountPercent = hasDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;
  const subcategoryName = subcategory[0]?.name;
  const inStock = quantity > 0;


const [count ,setCount]=useState(1);

const router  =useRouter()

const dispatch =useDispatch()
const {setCartInfo} = cartActions
 async function handelCart(): Promise<boolean> {
  if (!inStock) {
    toast.error("Sorry, this product is out of stock");
    return false;
  }

  const response = await addToCart(_id);

  if (response.status !== "success") {
    toast.error(response.message);
    return false;
  }

  const fullCart = await getCartItems();
  console.log(fullCart)
  if (fullCart?.status === "success") {
    dispatch(
      setCartInfo({
        status: fullCart.status,
        message: fullCart.message,
        numOfCartItems: fullCart.numOfCartItems,
        cartId: fullCart.cartId,
        data: {
          products: fullCart.data.products,
          totalCartPrice: fullCart.data.totalCartPrice,
          cartOwner:fullCart.data.cartOwner
        },
      })
    );

  }

  toast.success(response.message);
  return true;
}



async function handelPayNow(){
  console.log("A7AAAAAAAAAAAAAAAAAAAAAAAAA")
const added= await handelCart()
 if(added) router.push("/payment")
}
  return (
    <>
      {/* Breadcrumb */}
      <nav className="mb-5 flex flex-wrap items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary-700">Home</Link>
        <IconChevronRight className="size-3" />
        <span>{category.name}</span>
        {subcategoryName && (
          <>
            <IconChevronRight className="size-3" />
            <span>{subcategoryName}</span>
          </>
        )}
        <IconChevronRight className="size-3" />
        
        <span className="font-medium text-gray-800">{title}</span>
      </nav>

      {/* Top card */}
      <section className="grid gap-6 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10">
        {/* Gallery */}
       <ProductGallery images={gallery} title={title} />

        {/* Info */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 justify-between text-sm">
          <div >  <span className="rounded-full mx-2 bg-primary-100 px-3 py-1 font-medium text-primary-900">
              {category.name}
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
              {brand.name}
            </span></div>
            <WishlistButton productId={_id}/>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>

          <div className="flex items-center gap-2">
            <div className="flex text-primary-400">
              {Array.from({ length: 5 }).map((_, i) =>
                i < Math.round(ratingsAverage) ? (
                  <IconStarFilled key={i} className="size-4" />
                ) : (
                  <IconStar key={i} className="size-4" />
                )
              )}
            </div>
            <span className="text-sm text-gray-500">
              {ratingsAverage} ({ratingsQuantity} reviews)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">
              {finalPrice.toLocaleString("en-US")} EGP
            </span>
            {hasDiscount && (
              <>
                <span className="text-base text-gray-400 line-through">
                  {price.toLocaleString("en-US")} EGP
                </span>
                <span className="rounded-md bg-red-500 px-2 py-0.5 text-sm font-semibold text-white">
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>

          <span
            className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
              inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
            }`}
          >
            <span className={`size-1.5 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`} />
            {inStock ? "In Stock" : "Out of Stock"}
          </span>

          <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">
            {description}
          </p>

          {/* Quantity */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Quantity</span>
            <div className="flex items-center gap-3">
              
              <span className="text-sm text-gray-500">{quantity} available</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
            <span className="text-sm text-gray-600">Total Price:</span>
            <span className="text-lg font-bold text-primary-700">
              {finalPrice.toFixed(2)} EGP
            </span>
          </div>

          {/* Actions */}
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button"
            
            onClick={handelCart}
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary-400 text-sm font-semibold text-gray-900 transition-colors hover:bg-primary-500">
              <IconShoppingCart className="size-5" />
              Add to Cart
            </button>
            <button
             onClick={()=>{handelPayNow()}}
             type="button" className="flex w-full h-11 items-center justify-center gap-2 rounded-lg bg-gray-900 text-sm font-semibold text-white transition-colors hover:bg-gray-800">
              <IconBolt className="size-5" />
              Buy Now
            </button>
            
          </div>



          {/* Perks */}
          <div className="mt-2 grid gap-4 border-t border-gray-100 pt-4 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                <IconTruckDelivery className="size-5" />
              </span>
              <div className="text-sm">
                <p className="font-semibold text-gray-800">Free Delivery</p>
                <p className="text-gray-500">Orders over 500</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                <IconRefresh className="size-5" />
              </span>
              <div className="text-sm">
                <p className="font-semibold text-gray-800">30 Days Return</p>
                <p className="text-gray-500">Money back</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                <IconShieldCheck className="size-5" />
              </span>
              <div className="text-sm">
                <p className="font-semibold text-gray-800">Secure Payment</p>
                <p className="text-gray-500">100% protected</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}