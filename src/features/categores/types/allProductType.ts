// types/product.ts

export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ProductBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ProductSubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string; // id بتاع الـ category
}

export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number; // مش موجودة في كل المنتجات
  availableColors?: string[];  // موجودة في منتجات الـ Electronics بس
  imageCover: string;
  images: string[];
  sold: number;
  ratingsQuantity: number;
  ratingsAverage: number;
  category: ProductCategory;
  brand: ProductBrand;
  subcategory: ProductSubcategory[]; // array حتى لو فيها عنصر واحد
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number; // موجودة هنا لأن فيه صفحة تانية
  prevPage?: number; // هتظهر في الصفحة الثانية
}

export interface ProductsResponse {
  results: number;
  metadata: PaginationMetadata;
  data: Product[];
}