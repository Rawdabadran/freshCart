"use client";

import { forgotPassword } from "@/features/server/Changepass.actions";
import { verifyResetCode } from "@/features/server/Changepass.actions";
import { resetPassword } from "@/features/server/Changepass.actions";
import {
  IconMail,
  IconKey,
  IconLock,
  IconArrowLeft,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  email: string;
  resetCode: string;
  newPassword: string;
  confirmPassword: string;
};

const steps = [IconMail, IconKey, IconLock];

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white py-3.5 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200";
const iconClass =
  "pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400";
const labelClass = "mb-2 block text-sm font-semibold text-gray-800";

const content = [
  {
    title: "Forgot Password?",
    text: "No worries, we'll send you a reset code",
    button: "Send Reset Code",
  },
  {
    title: "Check your email",
    text: "Enter the code we sent to your email",
    button: "Verify Code",
  },
  {
    title: "Set a new password",
    text: "Choose a strong password you haven't used before",
    button: "Change Password",
  },
];

export default function ForgotPasswordForm() {
  const [step, setStep] = useState(0); // 0: email, 1: code, 2: new password
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      resetCode: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onEmailSubmit(data: FormValues) {
    const response = await forgotPassword(data.email);

    if (response.success) {
      toast.success(response.message);
      setStep(1);
    } else {
      toast.error(response.message);
    }
  }

  async function onCodeSubmit(data: FormValues) {
    const response = await verifyResetCode(data.resetCode);

    if (response.success) {
      toast.success(response.message);
      setStep(2); // يظهر حقل الباسورد الجديد
    } else {
      toast.error(response.message);
    }
  }

  async function onPasswordSubmit(data: FormValues) {
    // الإيميل لسه محفوظ في الفورم حتى بعد ما الحقل اختفى
    const response = await resetPassword(data.email, data.newPassword);

    if (response.success) {
      toast.success(response.message);
      router.push("/login");
    } else {
      toast.error(response.message);
    }
  }

  const handlers = [onEmailSubmit, onCodeSubmit, onPasswordSubmit];

  return (
    <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl sm:p-10">
      {/* Header */}
      <div className="text-center">
        <a href="/" className="inline-flex items-center gap-2 text-3xl font-extrabold text-gray-900">
          <IconShoppingCart className="size-[1em] text-primary-600" stroke={2.5} />
          <span>
            Fresh<span className="text-primary-600">Cart</span>
          </span>
        </a>
        <h1 className="mt-5 text-2xl font-bold text-gray-900">{content[step].title}</h1>
        <p className="mt-2 text-gray-600">{content[step].text}</p>
      </div>

      {/* Steps */}
      <ol className="mt-8 flex items-center justify-center">
        {steps.map((Icon, i) => (
          <li key={i} className="flex items-center">
            <span
              className={`grid size-10 place-items-center rounded-full ${
                i <= step
                  ? "bg-primary-600 text-white ring-4 ring-primary-100"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <Icon className="size-4" />
            </span>
            {i < steps.length - 1 && <span className="h-px w-14 bg-gray-200" />}
          </li>
        ))}
      </ol>

      {/* Form */}
      <form className="mt-10 space-y-5" onSubmit={handleSubmit(handlers[step])}>
        {step === 0 && (
          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>
            <div className="relative">
              <IconMail className={iconClass} />
              <input
                {...register("email", { required: "Email is required" })}
                id="email"
                type="email"
                placeholder="Enter your email address"
                className={inputClass}
              />
            </div>
            {errors.email && <p className="mt-1.5 text-sm text-primary-600">{errors.email.message}</p>}
          </div>
        )}

        {step === 1 && (
          <div>
            <label htmlFor="resetCode" className={labelClass}>
              Verification Code
            </label>
            <div className="relative">
              <IconKey className={iconClass} />
              <input
                {...register("resetCode", { required: "Code is required" })}
                id="resetCode"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="Enter the code"
                className={inputClass}
              />
            </div>
            {errors.resetCode && (
              <p className="mt-1.5 text-sm text-primary-600">{errors.resetCode.message}</p>
            )}
          </div>
        )}

        {step === 2 && (
          <>
            <div>
              <label htmlFor="newPassword" className={labelClass}>
                New Password
              </label>
              <div className="relative">
                <IconLock className={iconClass} />
                <input
                  {...register("newPassword", {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                  })}
                  id="newPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter your new password"
                  className={inputClass}
                />
              </div>
              {errors.newPassword && (
                <p className="mt-1.5 text-sm text-primary-600">{errors.newPassword.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm Password
              </label>
              <div className="relative">
                <IconLock className={iconClass} />
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (v) => v === getValues("newPassword") || "Passwords don't match",
                  })}
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Re-enter your new password"
                  className={inputClass}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-sm text-primary-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-primary-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Please wait..." : content[step].button}
        </button>
      </form>

      {/* Links */}
      <a
        href="/login"
        className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-800"
      >
        <IconArrowLeft className="size-4" /> Back to Sign In
      </a>

      <p className="mt-6 border-t border-gray-100 pt-6 text-center text-gray-700">
        Remember your password?{" "}
        <a href="/login" className="font-semibold text-primary-600 hover:text-primary-800">
          Sign In
        </a>
      </p>
    </div>
  );
}