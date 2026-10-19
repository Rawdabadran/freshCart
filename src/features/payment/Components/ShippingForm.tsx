"use client"

import {
  IconBuildingCommunity,
  IconInfoCircle,
  IconMapPin,
  IconPhone,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { EGYPT_CITIES, ShippingFormValues } from "../Escama/checkdetails";



const inputWrapper =
  "flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-200";
const inputBase =
  "w-full bg-transparent py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400";

type SippingFormAdress={
  register:UseFormRegister<ShippingFormValues>,
  errors:FieldErrors<ShippingFormValues>
}

export default function ShippingForm({register,errors}:SippingFormAdress) {



  return (
    <form>
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {/* Section header */}
        <div className="flex items-center gap-3 bg-primary-700 px-5 py-4 text-white">
          <IconTruckDelivery className="size-6" />
          <div>
            <h2 className="font-bold">Shipping Address</h2>
            <p className="text-sm text-white">Where should we deliver your order?</p>
          </div>
        </div>

        <div className="flex flex-col gap-5 p-5">
          {/* Saved address (للعرض فقط) */}
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <IconMapPin className="size-4 text-primary-700" />
                Saved Addresses
              </h3>
              <p className="text-sm text-gray-500">
                Select a saved address or enter a new one below
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-primary-500 bg-primary-50 p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-800">
                <IconMapPin className="size-5" />
              </span>
              <div className="text-sm">
                <p className="font-semibold text-gray-900">Sadat City</p>
                <p className="text-gray-500">Sadat City</p>
                <div className="mt-1 flex flex-wrap gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <IconPhone className="size-3.5" /> 01097514862
                  </span>
                  <span className="flex items-center gap-1">
                    <IconBuildingCommunity className="size-3.5" /> Sadat City
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Info box */}
          <div className="flex items-start gap-3 rounded-xl bg-primary-50 p-4">
            <IconInfoCircle className="mt-0.5 size-5 shrink-0 text-primary-800" />
            <div className="text-sm">
              <p className="font-semibold text-primary-950">Delivery Information</p>
              <p className="text-sm text-gray-600">
                Please ensure your address is accurate for smooth delivery
              </p>
            </div>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4">
            {/* City */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="city" className="text-sm font-medium text-gray-700">
                City <span className="text-red-500">*</span>
              </label>
              <div className={inputWrapper}>
                <IconBuildingCommunity className="size-4 text-gray-400" />
                <select id="city" className={inputBase} {...register("city")}>
                  <option value="" disabled>
                    choose city
                  </option>
                  {EGYPT_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              {errors.city && (
                <p className="text-xs text-red-500">{errors.city.message}</p>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="street" className="text-sm font-medium text-gray-700">
                Street Address <span className="text-red-500">*</span>
              </label>
              <div className={`${inputWrapper} items-start`}>
                <IconMapPin className="mt-3.5 size-4 text-gray-400" />
                <textarea
                  id="street"
                  rows={3}
                  placeholder="Street name, building number, floor, apartment..."
                  className={`${inputBase} resize-none`}
                  {...register("details")}
                />
              </div>
              {errors.details && (
                <p className="text-xs text-red-500">{errors.details.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className={inputWrapper}>
                <IconPhone className="size-4 text-gray-400" />
                <input
                  id="phone"
                  type="tel"
                  placeholder="01xxxxxxxxx"
                  className={inputBase}
                  {...register("phone")}
                />
                <span className="shrink-0 text-sm text-gray-400">Egyptian numbers only</span>
              </div>
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

        
        </div>
      </section>
    </form>
  );
}