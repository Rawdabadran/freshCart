import { JSX } from "react/jsx-runtime";

export type Brand = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};


export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}



export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string; // id بتاع الـ Category
}

export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  priceAfterDiscount?: number; // مش موجودة في كل المنتجات
  availableColors: string[];
  imageCover: string;
  images: string[];
  category: Category;
  subcategory: Subcategory[];
  brand: Brand;
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number; // بتظهر بس لو في صفحة بعدها
  prevPage?: number; // بتظهر بس لو في صفحة قبلها
}

export interface ProductsResponse {
  results: number;
  metadata: PaginationMetadata;
  data: Product[];
}

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