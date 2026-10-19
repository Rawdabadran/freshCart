import type { Metadata } from "next";
import "../shared/style/globals.css";
import Providers from "@/shared/components/Providers/Providers";
import Navbar from "@/shared/components/Layout/Navbar";
import Footer from "@/shared/components/Layout/Footer";
import { Toaster } from "sonner";
import { verifyToken } from "@/features/server/server.actions";
import { getCartItems } from "@/features/cart/services/CartOpterations";
import { CartValuesTypes } from "@/store/slices/cart.slice";
import { WishlistValuesTypes } from "@/store/slices/wishlist.slice";
import { getWishlist } from "@/features/wichlist/api/getwishlist";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "My Store", // غيّريه لاسم موقعك
  description: "Online store",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const authState = await verifyToken();

  let cartValuse: CartValuesTypes = {
    status: " ",
    message: " ",
    numOfCartItems: 0,
    cartId: null,
    data: {
      products: [],
      totalCartPrice: 0,
      cartOwner: " ",
    },
  };

  let UserWishList: WishlistValuesTypes = {
    status: "",
    count: 0,
    data: [],
  };

  if (authState.isAuthenticated === true) {
    const cartResponse = await getCartItems();
    const wishlistResponse = await getWishlist();
    

    if (cartResponse?.status === "success") {
      cartValuse = cartResponse;
    }
    if (wishlistResponse?.status === "success") {
  UserWishList = wishlistResponse;
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