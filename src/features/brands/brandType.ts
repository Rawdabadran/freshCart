import { JSX } from "react/jsx-runtime";

export type Brand = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type BrandsResponse = {
  length: number;
  map(arg0: (brand: any) => JSX.Element): import("react").ReactNode;
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
  data: Brand[];
};