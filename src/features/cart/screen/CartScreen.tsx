
"use client"
import { IconArrowLeft, IconShoppingCart, IconTrash } from "@tabler/icons-react";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import { clearCart, getCartItems } from "../services/CartOpterations";
import { useDispatch, useSelector } from "react-redux";
import { appState } from "@/store/store";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { cartActions, cartInitialValues } from "@/store/slices/cart.slice";
import Link from "next/link";


export default  function CartScreen() {
 
const dispatch =useDispatch()
const {setCartInfo} = cartActions


async function handelRemoveAllItems() {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This action will  remove All Items from your cart.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, remove it!",
    cancelButtonText: "No, cancel",
    reverseButtons: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
  });

  if (!result.isConfirmed) return;

  const response = await clearCart();

  if (response.status !== "success") {
    toast.error(response.message);
    return;
  }

  dispatch(setCartInfo(cartInitialValues
  ));

  await Swal.fire({
    title: "Removed!",
    text: "The item has been removed from your cart.",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
  });
}





const cartItems = useSelector((state:appState) => state.cartReducer.data.products);
const cartItemsNumber = useSelector((state:appState) => state.cartReducer.numOfCartItems);


  
  if(cartItemsNumber==0)
  {
    return (
  <div className="flex min-h-screen flex-col gap-8 items-center justify-center">
    <p className="text-lg font-medium text-gray-400">No items in the cart</p>
      <Link href="/shop" className="flex items-center gap-1 text-primary-700">
              <IconArrowLeft size={14} /> Continue Shopping
            </Link>
  </div>
);
  }

 
  return (
    <main className="mx-auto w-full md:container px-6 py-8">
      {/* ---------- Cart header ---------- */}
      <div className="mb-8">
        <p className="text-sm text-gray-400">
          Home <span className="mx-1">/</span>
          <span className="font-medium text-gray-800">Shopping Cart</span>
        </p>

        <div className="mt-4 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-700 text-white">
            <IconShoppingCart size={20} />
          </span>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          You have <span className="font-semibold text-primary-700">1</span> item in your cart
        </p>
      </div>

      {/* ---------- Items + Summary ---------- */}
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <section className="space-y-4">
          
           {cartItems.map((item)=>(<CartItem {...item} key={item._id}/> ))}

          <div className="flex justify-between border-t border-gray-200 pt-4 text-sm">
            <Link href="/shop" className="flex items-center gap-1 text-primary-700">
              <IconArrowLeft size={14} /> Continue Shopping
            </Link>
            <button
               onClick={()=>{handelRemoveAllItems()}}
             className="flex items-center gap-1 hover:text-red-500 transition duration-500 text-gray-400">
              <IconTrash size={14} /> Clear all items
            </button>
          </div>
        </section>

        <CartSummary />
      </div>
    </main>
  );
}