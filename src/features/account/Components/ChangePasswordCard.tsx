"use client";

import { IconLock } from "@tabler/icons-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { getToken, setToken } from "@/features/server/server.actions"; // عدلي لو اسمها مختلف
import { changePassword } from "../api/changePassword"; // عدلي المسار
import PasswordField from "./PasswordField";
import { useRouter } from "next/navigation";

type PasswordInputs = {
  currentPassword: string;
  password: string;
  rePassword: string;
};

export default function ChangePasswordCard() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordInputs>({
    defaultValues: { currentPassword: "", password: "", rePassword: "" },
  });

  const router =useRouter()
  const submit: SubmitHandler<PasswordInputs> = async (values) => {
    try {
      const token = await getToken();
      if (!token) {
        toast.error("Please login first");
        return;
      }

      const res = await changePassword(values, token);

if (res?.token) {
  await setToken(res.token);
}
      toast.success("Password changed successfully");
      reset();
    } catch (err: any) {
      console.log(JSON.stringify(err?.response?.data, null, 2));
      toast.error(
        err?.response?.data?.errors?.msg ??
          err?.response?.data?.message ??
          "Something went wrong",
      );
        router.push("/login")
     
    }
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-800">
          <IconLock size={20} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Change Password</h3>
          <p className="text-xs text-gray-500">Update your account password</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(submit)} className="space-y-4" noValidate>
        <PasswordField
          label="Current Password"
          placeholder="Enter your current password"
          error={errors.currentPassword?.message}
          {...register("currentPassword", {
            required: "Current password is required",
          })}
        />
      <PasswordField
  label="New Password"
  placeholder="Enter your new password"
  hint="Min 9 chars: Uppercase, lowercase, special (#$@%^&*!), then a number 1-9"
  error={errors.password?.message}
  {...register("password", {
    required: "Password is required",
    minLength: { value: 9, message: "Password must be more than 8 characters" },
    validate: {
      upper: (v) =>
        /^[A-Z]/.test(v) || "Password must start with an uppercase letter",
      lower: (v) =>
        /^[A-Z][a-z]/.test(v) || "Second character must be a lowercase letter",
      special: (v) =>
        /^[A-Z][a-z][#$@%^&*!]/.test(v) ||
        "Third character must be a special character (#$@%^&*!)",
      number: (v) =>
        /^[A-Z][a-z][#$@%^&*!][1-9]/.test(v) ||
        "Fourth character must be a number from 1 to 9",
      different: (v) =>
        v !== watch("currentPassword") ||
        "New password must be different from the current one",
    },
  })}
/>
        <PasswordField
          label="Confirm New Password"
          placeholder="Confirm your new password"
          error={errors.rePassword?.message}
          {...register("rePassword", {
            required: "Please confirm your new password",
            validate: (v) =>
              v === watch("password") || "Passwords do not match",
          })}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <IconLock size={16} />
          {isSubmitting ? "Changing..." : "Change Password"}
        </button>
      </form>
    </section>
  );
}