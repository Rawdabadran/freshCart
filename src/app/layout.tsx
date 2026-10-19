import type { Metadata } from "next";
import "../shared/style/globals.css";
import Providers from "@/shared/components/Providers/Providers";
import Navbar from "@/shared/components/Layout/Navbar";
import Footer from "@/shared/components/Layout/Footer";
import { Toaster } from "sonner";
import { getUserId, verifyToken } from "@/features/server/server.actions";
import { getCartItems } from "@/features/cart/services/CartOpterations";
import { CartValuesTypes } from "@/store/slices/cart.slice";
import { WishlistValuesTypes } from "@/store/slices/wishlist.slice";
import { getWishlist } from "@/features/wichlist/api/getwishlist";
import { GetUserOrders } from "@/features/orders/orders.actions/getUserOrder"; // عدّلي المسار
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "My Store",
  description: "Online store",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const authState = await verifyToken();

  let cartValuse: CartValuesTypes = {
    status: " ",
    message: " ",
    numOfCartItems: 0,
    cartId: null,
    data: { products: [], totalCartPrice: 0, cartOwner: " " },
  };

  let UserWishList: WishlistValuesTypes = { status: "", count: 0, data: [] };

  let userOrders: NonNullable<Awaited<ReturnType<typeof GetUserOrders>>> = [];

  if (authState.isAuthenticated === true) {
    // الاتنين مستقلين عن بعض، فبنجيبهم مع بعض
    const [cartResponse, wishlistResponse] = await Promise.all([
      getCartItems(),
      getWishlist(),
    ]);



    if (cartResponse?.status === "success") {
      cartValuse = cartResponse;
    }
    if (wishlistResponse?.status === "success") {
      UserWishList = wishlistResponse;
    }



   const userId = await getUserId();
if (userId) {
  try {
    userOrders = (await GetUserOrders(userId)) ?? [];
  } catch {
    userOrders = [];
  }
}
  }

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="flex h-fit flex-col">
        <Providers
          preloadedState={{
            authReducer: { ...authState, userInfo: null },
            cartReducer: cartValuse,
            wishlistReducer: UserWishList,
            ordersReducer: { orders: userOrders, isLoading: false, error: null },
          }}
        >
          <Navbar />
          {children}
          <Toaster richColors position="top-right" />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}