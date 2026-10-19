export interface AddToWishlistResponse {
  status: string;
  message: string;
  data: string[]; // IDs بتاعة المنتجات اللي في الـ wishlist
}


// types/wishlist.ts
// types/wishlist.ts


export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string; 
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
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
  imageCover: string;
  images: string[];
  subcategory: Subcategory[];
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductsResponse {
  status: string;
  count: number;
  data: Product[];
}