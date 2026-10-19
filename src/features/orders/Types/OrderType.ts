/** ISO 8601 date string, e.g. "2026-10-14T23:18:59.791Z" */
export type ISODateString = string;

export type PaymentMethodType = "cash" | "card";

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  /** Parent category id */
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

export interface OrderProduct {
  _id: string;
  /** Same value as _id (string here, unlike Order.id which is a number) */
  id: string;
  title: string;
  imageCover: string;
  subcategory: Subcategory[];
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  ratingsQuantity: number;
}

export interface CartItem {
  _id: string;
  count: number;
  /** Unit price at the time of the order */
  price: number;
  product: OrderProduct;
}

export interface Order {
  _id: string;
  /** Short numeric order number shown to the user (e.g. 9096) */
  id: number;
  user: OrderUser;
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: PaymentMethodType;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  __v: number;
}

/** The endpoint returns a plain array of orders */
export type OrdersResponse = Order[];