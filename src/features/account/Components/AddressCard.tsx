import { IconBuilding, IconMapPin, IconPencil, IconPhone, IconTrash } from "@tabler/icons-react";

export type Address = {
  id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
};

export default function AddressCard({ name, details, phone, city }: Address) {
  return (
    <article className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
          <IconMapPin size={22} />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-gray-900">{name}</h3>
          <p className="mt-0.5 truncate text-sm text-gray-500">{details}</p>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <IconPhone size={16} className="text-gray-400" />
              {phone}
            </span>
            <span className="flex items-center gap-1.5">
              <IconBuilding size={16} className="text-gray-400" />
              {city}
            </span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          aria-label="Edit address"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-primary-100 hover:text-primary-800"
        >
          <IconPencil size={16} />
        </button>
        <button
          type="button"
          aria-label="Delete address"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-red-100 hover:text-red-600"
        >
          <IconTrash size={16} />
        </button>
      </div>
    </article>
  );
}