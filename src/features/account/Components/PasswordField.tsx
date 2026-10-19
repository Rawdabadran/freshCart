"use client";

import { useState, type ComponentProps } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

type PasswordFieldProps = Omit<ComponentProps<"input">, "type"> & {
  label: string;
  hint?: string;
  error?: string;
};

export default function PasswordField({
  label,
  hint,
  error,
  ...inputProps
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-gray-700">
          {label}
        </span>
        <div className="relative">
          <input
            {...inputProps}
            type={show ? "text" : "password"}
            className={`w-full rounded-lg border bg-white py-2.5 pl-3 pr-10 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:ring-2 ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-200 focus:border-primary-600 focus:ring-primary-600/20"
            }`}
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {show ? <IconEyeOff size={18} /> : <IconEye size={18} />}
          </button>
        </div>
      </label>
      {error ? (
        <p className="mt-1 text-[11px] text-red-500">{error}</p>
      ) : (
        hint && <p className="mt-1 text-[11px] text-gray-400">{hint}</p>
      )}
    </div>
  );
}