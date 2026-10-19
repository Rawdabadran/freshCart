"use client";

import Link from "next/link";
import ShippingForm from "../Components/ShippingForm";
import PaymentMethod from "../Components/PaymentMethod";
import { ShippingFormValues, shippingSchema } from "../Escama/checkdetails";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  IconArrowLeft,
  IconBolt,
  IconFileText,
  IconReceipt,
  IconRefresh,
  IconShieldCheck,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { useState } from "react";
import { CheckCashTheOrder, CheckOutOnlineOrder } from "../Servaces/Checkout.action";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { appState } from "@/store/store";
import { cartActions, cartInitialValues } from "@/store/slices/cart.slice";
import { clearCart } from "@/features/cart/services/CartOpterations";
import { toast } from "sonner";
import CartItem from "@/features/cart/components/CartItem";

export default function PayMentScreen() {

  const cartItems = useSelector((state:appState) => state.cartReducer.data.products);
  const cartData =useSelector((state:appState) => state.cartReducer.data)
 
  const [PaymentWay,setPaymentWay]=useState<"cash"|"online">("cash");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: { details: "", city: "", phone: "" },
  });


    const router = useRouter();
  const cartId = useSelector((state: appState) => state.cartReducer.cartId);

 
   
  const dispatch =useDispatch()
  const {setCartInfo} = cartActions
  
  
  async function handelRemoveAllItems() {

  
 const response = await clearCart();
  
    if (response.status !== "success") {
      toast.error(response.message);
      return;
    }
  
    dispatch(setCartInfo(cartInitialValues
    ));
  
    
  }
  


  async function onSubmit(data: ShippingFormValues) {
    try {
      if(PaymentWay=="cash")
      {
    if(cartId==null)
    {
      toast.error("thier is no cart to this user")
      return;
    }

    const response = await CheckCashTheOrder (data, cartId);

    if ( response.status=="success") {
      toast.success("Order confirmed");
    handelRemoveAllItems()
     router.push("/my_orders")
      return;
    }

    toast.error(response.message || "Failed to process your order.");
      }

      
      else if(PaymentWay=="online"){
        const url =location.origin
    if(cartId==null)
    {
      toast.error("thier is no cart to this user")
      return;
    }

        const response = await CheckOutOnlineOrder(data, cartId,url);

    if (response.status=="success") {
    toast.loading("loading payment page");
    setTimeout(()=>{
      location.href=response.session.url
    },3000)

    handelRemoveAllItems()
     router.push("/my_orders")
    
      return;
    }

    toast.error(response.message || "Failed to process your order.");
      }

      }
      
    
    catch (error) {
      console.error(error);
    }
  }

 let total=cartData.totalCartPrice;
 if((cartData.totalCartPrice-50)<500)
 {
  total=cartData.totalCartPrice+50
 }
 
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-5 flex items-center gap-1 text-xs text-gray-500">
        <Link href="/" className="hover:text-primary-700">
          Home
        </Link>
        <span>/</span>
        <Link href="/cart" className="hover:text-primary-700">
          Cart
        </Link>
        <span>/</span>
        <span className="font-medium text-gray-800">Checkout</span>
      </nav>

      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-xl bg-primary-600 text-white">
            <IconFileText className="size-6" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Complete Your Order
            </h1>
            <p className="text-sm text-gray-500">
              Review your items and complete your purchase
            </p>
          </div>
        </div>

        <Link
          href="/cart"
          className="flex items-center gap-1.5 text-sm font-medium text-primary-800 hover:text-primary-900"
        >
          <IconArrowLeft className="size-4" />
          Back to Cart
        </Link>
      </div>

      {/* Content */}
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="flex flex-col gap-6">
          <ShippingForm register={register} errors={errors} />
          <PaymentMethod Selected={PaymentWay} setPaymentWay={setPaymentWay} />
        </div>
        

        <aside className="overflow-hidden rounded-2xl border border-gray-200 bg-white lg:sticky lg:top-6">
          <div className="flex items-center gap-3 bg-primary-600 px-5 py-4 text-white">
            <IconReceipt className="size-6" />
            <div>
              <h2 className="font-bold">Order Summary</h2>
              <p className="text-xs text-white">items</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-5">
            <ul className="flex max-h-64  flex-col gap-3 overflow-y-auto pr-1">
 {cartItems.map((item)=>(
             <div className="flex justify-around">
              <img src={item.product.imageCover} className="size-14 " alt="" />
              <div className="title flex flex-col">
                <p className="text-sm font-semibold">{item.product.brand.name}</p>
                <span className="text-xs text-gray-400">{item.price+"*"+item.count}</span>
  
              </div>
              <p className=" font-black">{item.count*item.price}</p>
             </div>
             ))}
            </ul>
            
            <div className="flex flex-col gap-2 border-t border-gray-100 pt-4 text-sm">
              <div className="flex items-center justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">{cartData.totalCartPrice}</span>
              </div>
            
              <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-3">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-primary-700">
                  <span className="ml-1 text-lg font-black">
                   {total} EGP
                  </span>
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="flex h-12 items-center justify-center gap-2 rounded-lg bg-primary-600 text-sm font-bold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <IconBolt className="size-5" />
              {isSubmitting ? "Placing order..." : "Place Order"}
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <IconShieldCheck className="size-4 text-green-600" /> Secure
              </span>
              <span className="flex items-center gap-1">
                <IconTruckDelivery className="size-4 text-primary-700" /> Fast
                Delivery
              </span>
              <span className="flex items-center gap-1">
                <IconRefresh className="size-4 text-primary-700" /> Easy Returns
              </span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}