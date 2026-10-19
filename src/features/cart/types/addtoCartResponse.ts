// types/cart.ts

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string; // category id
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

export interface CartProductDetails {
  _id: string;
  id: string;
  title: string;
  slug: string;
  quantity: number; // الكمية المتاحة في المخزن
  imageCover: string;
  ratingsAverage: number;
  category: Category;
  brand: Brand;
  subcategory: Subcategory[];
}

export interface Cartitem {
  _id: string;
  count: number;
  price: number;
  product: CartProductDetails;
}

export interface Cart {
  _id: string;
  cartOwner: string;
  products: Cartitem[];
  totalCartPrice: number;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  __v: number;
}

// الـ response الأساسي المشترك
export interface CartResponse {
  status: "success" | "error";
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: Cart;
}

export type CarterrorRespons={
    status: string,
    message: string
}
// Get logged user cart
export type GetCartResponse = CartResponse;

// Add to cart
export type AddToCartResponse = CartResponse;

export type RemoveCartItemResponse = CartResponse;