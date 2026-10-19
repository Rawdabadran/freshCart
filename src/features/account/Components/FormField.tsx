import type { ComponentProps } from "react";

type FormFieldProps = ComponentProps<"input"> & {
  label: string;
  error?: string;
};

export default function FormField({ label, error, ...inputProps }: FormFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-gray-700">
        {label}
      </span>
      <input
        {...inputProps}
        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:ring-2 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
            : "border-gray-200 focus:border-primary-600 focus:ring-primary-600/20"
        }`}
      />
      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </label>
  );
}