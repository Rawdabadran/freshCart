import Link from "next/link";

export type Brand = {
  id: string;
  name: string;
  image: string;
};

export default function BrandCard({ id, name, image }: Brand) {
  return (
    <Link href={"/shop"}
      
      className="group flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 pb-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary-600 hover:shadow-lg"
    >
      <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-gray-50 p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain mix-blend-multiply"
          loading="lazy"
        />
      </div>
      <h3 className="text-sm font-semibold text-gray-800 group-hover:text-primary-600">
        {name}
      </h3>
    </Link>
  );
}