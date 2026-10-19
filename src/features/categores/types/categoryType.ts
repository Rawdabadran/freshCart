// types/category.ts

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number; // بتظهر في الصفحات اللي بعدها بس
}

export interface CategoriesResponse {
  results: number;
  metadata: PaginationMetadata;
  data: Category[];
}