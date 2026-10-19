"use client";

import { IconDeviceFloppy, IconUser } from "@tabler/icons-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { appState } from "@/store/store";
import { getToken } from "@/features/server/server.actions"; // عدلي لو اسمها مختلف
import { updateMe } from "../api/updateMe"; // عدلي المسار
import FormField from "./FormField";

type ProfileInputs = {
  name: string;
  email: string;
  phone: string;
};

export default function ProfileCard() {
  const userInfo = useSelector((s: appState) => s.authReducer.userInfo);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInputs>({
    defaultValues: { name: userInfo?.name ?? "", email: "", phone: "" },
  });

  const submit: SubmitHandler<ProfileInputs> = async (values) => {
    try {
      const token = await getToken();
      if (!token) {
        toast.error("Please login first");
        return;
      }

      await updateMe(values, token);
      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Something went wrong");
    }
  };

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Profile Information */}
      <div className="p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
            <IconUser size={20} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Profile Information
            </h3>
            <p className="text-xs text-gray-500">Update your personal details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-4" noValidate>
          <FormField
            label="Full Name"
            error={errors.name?.message}
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" },
            })}
          />
          <FormField
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />
          <FormField
            label="Phone Number"
            type="tel"
            placeholder="01xxxxxxxxx"
            error={errors.phone?.message}
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^01[0125][0-9]{8}$/,
                message: "Enter a valid Egyptian phone number",
              },
            })}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <IconDeviceFloppy size={16} />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Account Information */}
      <div className="border-t border-gray-100 bg-gray-50 p-6">
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Account Information
        </h3>

        <dl className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <dt className="text-gray-500">User ID</dt>
            <dd className="text-gray-400">-</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-gray-500">Role</dt>
            <dd className="rounded-md bg-primary-100 px-2.5 py-0.5 font-medium text-primary-900">
              User
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}