"use client";

import { useEffect, useState } from "react";
import {
  IconBriefcase,
  IconShoppingBag
 
} from "@tabler/icons-react";
import OrderCard from "../Component/OrderCard";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrders } from "@/store/orders.slice";



export default function OrdersScreen () {


const dispatch = useDispatch();
const { orders, isLoading, error } = useSelector((s) => s.ordersReducer)
const {cartOwner} = useSelector((state) =>state.cartReducer.data )



useEffect(() => {
  if (cartOwner) dispatch(fetchOrders(cartOwner));
}, [cartOwner, dispatch]);

useEffect(() => {
  if (error) toast.error(error);
}, [error]);



  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top bar (tablet & desktop only) */}
     

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
          <a href="/" className="hover:text-primary-700">
            Home
          </a>
          <span className="mx-2 text-gray-300">/</span>
          <span className="font-medium text-gray-900">My Orders</span>
        </nav>

        {/* Title */}
        <div className="mt-5 flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-500 text-white">
              <IconShoppingBag className="h-7 w-7" />
            </span>
            <div>
              <h1 className="text-3xl font-bold">My Orders</h1>
              <p className="text-sm text-gray-500">
                Track and manage your orders
              </p>
            </div>
          </div>

          <a
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            <IconBriefcase className="h-4 w-4" />
            Continue Shopping
          </a>
        </div>

        {/* Orders list */}
        {orders?(<p className="flex justify-center items-center h-screen text-primary-900 ">Your orders will show here </p>):( <section className="mt-6 grid grid-cols-1 gap-5" aria-label="Orders">
          {orders.map((order) => (
            <OrderCard key={order.id} {...order}  defaultOpen={false} />
          ))}
        </section>)}
       
      </main>
    </div>
  );
}