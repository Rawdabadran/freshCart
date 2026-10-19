"use client"
import { IconShoppingCart, IconTrash } from "@tabler/icons-react";
import { Product } from "../../categores/types/allProductType";
import { RemoveWishListItem } from "../api/removeFromWishlist";
import { getWishlist } from "../api/getwishlist";
import { useDispatch } from "react-redux";
import { wishlistActions } from "@/store/slices/wishlist.slice";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { cartActions } from "@/store/slices/cart.slice";
import { addToCart, getCartItems } from "@/features/cart/services/CartOpterations";

const formatPrice = (value: number) => `${value.toLocaleString("en-US")} EGP`;

export default function WishlistItem({ item }: { item: Product }) {
  const { title, category, imageCover, _id, price, priceAfterDiscount, quantity } = item;

  const hasDiscount = priceAfterDiscount !== undefined;
  const finalPrice = priceAfterDiscount ?? price;
  const inStock = quantity > 0;
 const dispatch =useDispatch()
 const {setWishlistInfo}=wishlistActions

 async function handelDeletFavItem() {
  console.log(_id)
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This item will be removed from your wishlist.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, remove it!",
    cancelButtonText: "No, cancel",
    reverseButtons: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
  });

  if (!result.isConfirmed) return;

  try {
    const res = await RemoveWishListItem(_id);

    if (res.status !== "success") {
      toast.error(res.message ?? "Couldn't remove the item");
      return;
    }

    const wishlistItems = await getWishlist();
    console.log(wishlistItems.count)
    if (wishlistItems.status === "success") {
      dispatch(setWishlistInfo(wishlistItems));
    }

    await Swal.fire({
      title: "Removed!",
      text: "The item has been removed from your wishlist.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong, try again");
  }
}



const {setCartInfo} = cartActions
 async function handelCart() {
  if (!inStock) {
    toast.error("Sorry, this product is out of stock");
    return;
  }

  const response = await addToCart(_id);

  if (response.status !== "success") {
    toast.error(response.message);
    return;
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
}

  return (
    <li className="grid grid-cols-1 gap-4 px-4 py-5 transition hover:bg-gray-50/60 md:grid-cols-12 md:items-center md:px-6">
      {/* Product */}
      <div className="flex items-center gap-4 md:col-span-6">
        <div className="size-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white">
          <img src={imageCover} alt={title} className="h-full w-full object-contain p-2" />
        </div>
        <div className="min-w-0">
          <h3 className="line-clamp-2 font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-400">{category.name}</p>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between md:col-span-2 md:flex-col md:justify-center">
        <span className="text-sm text-gray-500 md:hidden">Price</span>
        <div className="text-end md:text-center">
          <p className="font-semibold text-gray-900">{formatPrice(finalPrice)}</p>
          {hasDiscount && (
            <p className="text-sm text-gray-400 line-through">{formatPrice(price)}</p>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between md:col-span-2 md:justify-center">
        <span className="text-sm text-gray-500 md:hidden">Status</span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
            inStock ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
          }`}
        >
          <span className={`size-1.5 rounded-full ${inStock ? "bg-emerald-500" : "bg-red-500"}`} />
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 md:col-span-2 md:justify-center">
        <button
          type="button"
          disabled={!inStock}
          onClick={handelCart}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50 md:flex-none"
        >
          <IconShoppingCart size={18} stroke={1.75} />
          Add to Cart
        </button>
        <button
          onClick={handelDeletFavItem}
          type="button"
          aria-label="Remove from wishlist"
          className="flex size-10 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
        >
          <IconTrash size={18} stroke={1.75} />
        </button>
      </div>
    </li>
  );
}