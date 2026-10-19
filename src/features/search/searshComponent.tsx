"use client";

import { IconSearch } from "@tabler/icons-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { SearchActions } from "@/store/slices/search.slics";
import { toast } from "sonner";

type SearchInput = {
  search: string;
};

export default function SearchButton({ className = "" }: { className?: string }) {
  const { setSerchResult } = SearchActions;
  const dispatch = useDispatch();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<SearchInput>({
    defaultValues: { search: "" },
  });

  const submit: SubmitHandler<SearchInput> = (data) => {
    const term = data.search.trim();

  if (!term) {
    toast.info("You can't send an empty value");
    return;
  }
    dispatch(setSerchResult(data.search.trim()));
    router.push("/Search");
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      role="search"
      className={`flex items-center rounded-full border border-gray-200 bg-white py-1 pl-4 pr-1 ${className}`}
    >
      <input
        {...register("search")}
        type="text"
        placeholder="Search for products ..."
        className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
      />
      <button
        type="submit"
        aria-label="Search"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white transition-colors hover:bg-primary-700"
      >
        <IconSearch className="h-4 w-4" />
      </button>
    </form>
  );
}