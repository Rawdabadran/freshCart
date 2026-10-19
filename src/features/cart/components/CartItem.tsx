"use client"
import Swal from 'sweetalert2'
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { Cartitem,  } from "../types/addtoCartResponse";
import { removeItemFromCart, updateCartItemCounter } from "../services/CartOpterations";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cart.slice";
import { toast } from "sonner";




export default function CartItem({ 
count,
price,
product:{
  _id,
  title,
  imageCover,

}}:Cartitem) {

 
const dispatch =useDispatch()
const {setCartInfo} = cartActions


async function handelRemoveItem() {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This item will be removed from your cart.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, remove it!",
    cancelButtonText: "No, cancel",
    reverseButtons: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
  });

  if (!result.isConfirmed) return;

  const response = await removeItemFromCart(_id);

  if (response.status !== "success") {
    toast.error(response.message);
    return;
  }

  dispatch(setCartInfo(response as Parameters<typeof setCartInfo>[0]));

  await Swal.fire({
    title: "Removed!",
    text: "The item has been removed from your cart.",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
  });
}


async function UpdateProductCount(newCount:number)
{
  if(newCount<1)
  {
    handelRemoveItem();
    return;
  }
const response = await updateCartItemCounter(_id,newCount)
if(response.status=="fail")
{
  toast.error(response.message)
  return;
}
if(response.status=="success")
{

  console.log(response)
  toast.success("product count updated")
  dispatch(setCartInfo(response))

}
}
  return (
    <div className="flex gap-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
      {/* Image + stock badge */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-gray-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageCover} alt={title} className="h-20 w-20 object-contain" />
        </div>
      
      </div>

      {/* Info + quantity */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        
          <p className="my-3 font-semibold text-primary-700">
            {price} EGP <span className="text-xs font-normal ml-2 text-gray-400">per unit</span>
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
          onClick={()=>{UpdateProductCount(count-1)}}
           className="flex h-8 w-8 items-center justify-center rounded-md border hover:text-red-600 hover:border-red-600 transition duration-300 border-gray-200 text-gray-600">
            <IconMinus size={14} />
          </button>
          <span className="w-10 text-center text-sm font-medium">{count}</span>
          <button
           onClick={()=>{UpdateProductCount(count+1)}}
           className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-700 hover:bg-amber-400 transition duration-500 text-white">
            <IconPlus size={14} />
          </button>
        </div>
      </div>

      {/* Total + delete */}
      <div className="flex items-center gap-4 self-end">
        <div className="text-right mr-3">
          <p className="text-sm font-medium text-gray-900 ">Total</p>
          <p className="text-lg font-semibold text-gray-900 ">
           {price*count}<span className="text-xs ml-2 font-normal text-gray-400">EGP</span>
          </p>
        </div>
        <button 
        onClick={()=>{handelRemoveItem()}}
        className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-red-200 transition duration-500  hover:border-red-500 border-red-100 bg-red-50 text-red-500">
          <IconTrash size={16} />
        </button>
      </div>
    </div>
  );
}