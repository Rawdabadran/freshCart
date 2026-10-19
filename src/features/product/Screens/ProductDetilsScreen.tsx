import React from 'react'
import { GetProductDetails } from '../api/getProductDetails'
import ProductInfo from '../Components/ProductInfo';




import Link from "next/link";
import {
  IconBolt,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconEye,
  IconHeart,
  IconMinus,
  IconPackage,
  IconPlus,
  IconRefresh,
  IconShare,
  IconShieldCheck,
  IconShoppingCart,
  IconStar,
  IconStarFilled,
  IconTruck,
  IconTruckDelivery,
} from "@tabler/icons-react";
import UserOverView from '../Components/userOverView';








export default async function ProductDetilsScreen({id}:{id:string}) {

    const data = await GetProductDetails(id);
      console.log(data)
  return (

   
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
      {/* Breadcrumb */}
      <ProductInfo ProductData={data.data}  />
      {/* Tabs card */}
      <UserOverView ProductData={data.data} />
      {/* You may also like */}
      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="border-l-4 border-primary-500 pl-3 text-lg font-bold text-gray-900">
            You May Also Like
          </h2>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous" className="flex size-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-primary-500 hover:text-primary-700">
              <IconChevronLeft className="size-4" />
            </button>
            <button type="button" aria-label="Next" className="flex size-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-primary-500 hover:text-primary-700">
              <IconChevronRight className="size-4" />
            </button>
          </div>
        </div>

      </section>
    </main>
  );
}





