import { IconPlus } from "@tabler/icons-react";
import AddressCard, { Address } from "./AddressCard";

const ADDRESSES: Address[] = [
  { id: "1", name: "Sadat City", details: "Sadat City", phone: "01097514862", city: "Sadat City" },
  { id: "2", name: "Tanta", details: "El Geish St, Building 12", phone: "01012345678", city: "Tanta" },
  { id: "3", name: "Cairo", details: "Nasr City, Street 9", phone: "01123456789", city: "Cairo" },
];

export default function AddressesList() {
  return (
    <>
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Addresses</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your saved delivery addresses
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
        >
          <IconPlus size={18} />
          Add Address
        </button>
      </header>

      {ADDRESSES.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
          No saved addresses yet.
        </p>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {ADDRESSES.map((address) => (
            <AddressCard key={address.id} {...address} />
          ))}
        </div>
      )}
    </>
  );
}