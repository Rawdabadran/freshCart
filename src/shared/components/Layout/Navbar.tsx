"use client";

import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  IconHeart,
  IconId,
  IconLogout,
  IconMail,
  IconMenu2,
  IconPhone,
  IconShoppingCart,
  IconTruck,
  IconUser,
  IconUserCircle,
  IconUserPlus,
  IconX,
} from "@tabler/icons-react";
import { appState } from "@/store/store";
import { authActions } from "@/store/slices/auth.slice";
import { removeToken } from "@/features/server/server.actions";

import SearchButton from "@/features/search/searshComponent";

function LogoSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="160"
      height="31"
      viewBox="0 0 160 31"
      fill="none"
    >
      <g
        stroke="#e0343f" /* --color-primary-500 */
        strokeWidth="1.28276"
        strokeMiterlimit="10"
        strokeLinecap="round"
      >
        <path d="M8.12346 24.8618C9.5969 24.8618 10.7914 23.6674 10.7914 22.194C10.7914 20.7205 9.5969 19.526 8.12346 19.526C6.65002 19.526 5.45557 20.7205 5.45557 22.194C5.45557 23.6674 6.65002 24.8618 8.12346 24.8618Z" />
        <path d="M6.97607 9.18945H23.1146" />
        <path d="M8.38892 12.4171H22.4092" />
        <path d="M7.66113 19.525H18.1138C19.2586 19.525 20.2784 18.7977 20.6505 17.7144L24.9585 5.1809C25.3307 4.09761 26.3495 3.37036 27.4953 3.37036H30.6292" />
        <path d="M17.8222 24.8618C19.2956 24.8618 20.49 23.6674 20.49 22.194C20.49 20.7205 19.2956 19.526 17.8222 19.526C16.3487 19.526 15.1543 20.7205 15.1543 22.194C15.1543 23.6674 16.3487 24.8618 17.8222 24.8618Z" />
        <path d="M21.1874 16.152H7.14791C6.67788 16.152 6.26535 15.8261 6.13624 15.3519L3.75481 6.62879C3.63578 6.19381 3.94745 5.75989 4.37916 5.75989H22.3776" />
        <path d="M1 26.527C1 26.527 11.26 23.0552 25.1058 26.527" />
      </g>
      <path
        d="M8.12359 22.5791C8.33639 22.5791 8.5089 22.4066 8.5089 22.1939C8.5089 21.981 8.33639 21.8086 8.12359 21.8086C7.91079 21.8086 7.73828 21.981 7.73828 22.1939C7.73828 22.4066 7.91079 22.5791 8.12359 22.5791Z"
        stroke="#e0343f"
        strokeWidth="1.06897"
      />
      <path
        d="M17.8223 22.5791C18.035 22.5791 18.2076 22.4066 18.2076 22.1938C18.2076 21.981 18.035 21.8085 17.8223 21.8085C17.6095 21.8085 17.437 21.981 17.437 22.1938C17.437 22.4066 17.6095 22.5791 17.8223 22.5791Z"
        stroke="#e0343f"
        strokeWidth="1.06897"
      />
      <text
        x="36"
        y="25"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="26"
        fontWeight="700"
        fill="#21313C"
        textLength="123"
        lengthAdjust="spacingAndGlyphs"
      >
        FreshCart
      </text>
    </svg>
  );
}

export default function Navbar() {
  const { isAuthenticated, userInfo } = useSelector(
    (appState: appState) => appState.authReducer,
  );
  const count = useSelector(
    (state: appState) => state.cartReducer.numOfCartItems,
  );
  const wishlistCount = useSelector(
    (state: appState) => state.wishlistReducer.count,
  );

   const userName = useSelector(
    (state: appState) => state.authReducer.userInfo?.name,
  );


  const { logOut } = authActions;
  const dispatch = useDispatch();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handelLogOut = async () => {
    dispatch(logOut());
    await removeToken();
    closeMenu();
    router.push("/login");
  };

  return (
    <>
     <div className="flex border-b container text-sm border-gray-500/10 py-2 justify-between items-center *:flex *:gap-6">
          <ul className="*:flex *:gap-2 *:items-center">
            <li>
              <IconPhone stroke={2} />
              <a href="tel:+18001234567">+1 (800) 123-4567</a>
            </li>
            
          </ul>

          <ul>
         <li className="flex justify-between gap-2">
              <IconMail stroke={2} />
              <a href="mailto:support@freshcart.com" className="mx-3">support@freshcart.com</a>
            </li>
          </ul>
        </div>

           <header className="sticky top-0 z-50 bg-white" >
      {/* ================= lg and up ================= */}
      <div className="hidden lg:block mx-auto w-full">
        {/* Top Navbar */}
       

        {/* Main Navigation */}
        <div className="sticky top-0 z-50 bg-white">

        </div>
        <nav className="py-4 container flex justify-between   items-center bg-white">
          <h1>
            <Link href={`/`}>
              <LogoSvg />
            </Link>
          </h1>

          <SearchButton className="w-full ml-6 lg:flex hidden" />

          <div className="text-[14px] font-medium">
            <div className="container flex gap-6 items-center">
              <menu className="xl:flex hidden gap-4 border-r pr-3 py-2 border-slate-200">
                <li>
                  <Link
                    href={`/`}
                    className="hover:text-primary-600 transition-colors duration-200 font-medium"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/shop`}
                    className="hover:text-primary-600 transition-colors duration-200 font-medium"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/brands`}
                    className="hover:text-primary-600 transition-colors duration-200 font-medium"
                  >
                    Brands
                  </Link>
                </li>
              </menu>

              <menu className="hidden lg:flex gap-6 *:hover:text-primary-500 *:transition-colors *:duration-200">
                <li>
                  <Link
                    href={`/wishlist`}
                    className={`${isAuthenticated?"flex flex-col gap-2 items-center ":"hidden"}`}
                  >
                    <div className="relative">
                      <IconHeart stroke={2} size={"20px"} />

                      <span className="absolute top-0 -right-0.5 -translate-y-1/2 size-4.5 rounded-full bg-red-600 text-white text-xs flex justify-center items-center">
                        {wishlistCount}
                      </span>
                    </div>
                    <span className="text-sm">WishList</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href={`/cart`}
                    className={` ${isAuthenticated?"flex flex-col gap-2 items-center ":"hidden"}`}
                  >
                    <div className="relative">
                      <IconShoppingCart stroke={2} size={"20px"} />

                      <span className="absolute top-0 -right-0.5 -translate-y-1/2 size-4.5 rounded-full bg-primary-600 text-white text-xs flex justify-center items-center">
                        {count}
                      </span>
                    </div>
                    <span className="text-sm">Cart</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href={`/profile`}
                    className={`${isAuthenticated ? "flex flex-col gap-2 items-center" : "hidden"}`}
                  >
                    <IconUserCircle stroke={2} size={"20px"} />
                    <span className="text-sm">Account</span>
                  </Link>
                </li>

                <li
                  onClick={handelLogOut}
                  className={`cursor-pointer ${isAuthenticated ? "flex flex-col gap-2 items-center" : "hidden"}`}
                >
                  <IconLogout stroke={2} size={"20px"} />
                  <span className="text-sm">Logout</span>
                </li>

                <li className={`${isAuthenticated ? "hidden" : "flex"}`}>
                  <Link
                    href={`/signup`}
                    className={`flex flex-col gap-2 items-center`}
                  >
                    <IconUserPlus stroke={2} size={"20px"} />
                    <span className={`text-sm`}>Signup</span>
                  </Link>
                </li>

                <li className={`${isAuthenticated ? "hidden" : "flex"}`}>
                  <Link
                    href={`/login`}
                    className={`flex flex-col gap-2 items-center`}
                  >
                    <IconId stroke={2} size={"20px"} />
                    <span className="text-sm">Login</span>
                  </Link>
                </li>
              </menu>
            </div>
          </div>
        </nav>
      </div>

      {/* ================= Below lg ================= */}
      <div className="lg:hidden bg-white">
        {/* Top bar (tablet only) */}
        <div className="hidden md:block border-b border-gray-200 text-sm text-gray-600">
          <div className="mx-auto container flex items-center justify-between px-4 py-2.5">
            <span className="flex items-center gap-2">
              <IconTruck className="h-4 w-4 text-primary-600" />
              Free Shipping on Orders 500 EGP
            </span>

            {isAuthenticated ? (
              <div className="flex items-center gap-5">
                <span className="flex items-center gap-2">
                  <IconUser className="h-4 w-4" />
                  {userInfo?.name}
                </span>
                <button
                  type="button"
                  onClick={handelLogOut}
                  className="flex items-center gap-2 hover:text-red-600"
                >
                  <IconLogout className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <Link
                  href={`/login`}
                  className="flex items-center gap-2 hover:text-primary-600"
                >
                  <IconId className="h-4 w-4" />
                  Login
                </Link>
                <Link
                  href={`/signup`}
                  className="flex items-center gap-2 hover:text-primary-600"
                >
                  <IconUserPlus className="h-4 w-4" />
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="mx-auto container flex items-center justify-between gap-6 px-4 py-4">
            <h1 className="shrink-0">
              <Link href={`/`} onClick={closeMenu}>
                <LogoSvg />
              </Link>
            </h1>

            {/* Search (tablet) */}
            <SearchButton className="hidden md:flex flex-1 max-w-md" />

            <div className={`flex items-center gap-4 sm:gap-5`}>
              <Link
                href={`/wishlist`}
                aria-label="Wishlist"
                className={` ${isAuthenticated?"relative text-gray-700 hover:text-primary-600":"hidden"}`}
              >
                <IconHeart className="h-6 w-6" />
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-semibold text-white">
                  {wishlistCount}
                </span>
              </Link>

              <Link
                href={`/cart`}
                aria-label="Cart"
                className={` ${isAuthenticated?"relative text-gray-700 hover:text-primary-600":"hidden"}`}

              >
                <IconShoppingCart className="h-6 w-6" />
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-600 px-1 text-[11px] font-semibold text-white">
                  {count}
                </span>
              </Link>

              {isAuthenticated && (
                <Link
                  href={`/profile`}
                  aria-label="Account"
                  className="hidden text-gray-700 hover:text-primary-600 md:block"
                >
                  <IconUserCircle className="h-7 w-7" />
                </Link>
              )}

              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white"
              >
                {menuOpen ? (
                  <IconX className="h-5 w-5" />
                ) : (
                  <IconMenu2 className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Menu */}
          {menuOpen && (
            <nav className="mx-auto container border-t border-gray-100 px-4 py-4">
              {/* Search (mobile) */}
              <SearchButton className="mb-3 w-full md:hidden" />

              <ul className="space-y-1 font-medium text-gray-800">
                <li>
                  <Link
                    href={`/`}
                    onClick={closeMenu}
                    className="block rounded-lg px-3 py-3 hover:bg-gray-50"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/shop`}
                    onClick={closeMenu}
                    className="block rounded-lg px-3 py-3 hover:bg-gray-50"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/brands`}
                    onClick={closeMenu}
                    className="block rounded-lg px-3 py-3 hover:bg-gray-50"
                  >
                    Brands
                  </Link>
                </li>
              </ul>

              {/* Account actions */}
              <ul className="mt-3 space-y-1 border-t border-gray-100 pt-3 text-sm font-medium text-gray-700">
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link
                        href={`/profile`}
                        onClick={closeMenu}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-50"
                      >
                        <IconUserCircle className="h-5 w-5" />
                        Account
                        {userInfo?.name ? ` (${userInfo.name})` : ""}
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={handelLogOut}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-50 hover:text-red-600"
                      >
                        <IconLogout className="h-5 w-5" />
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        href={`/login`}
                        onClick={closeMenu}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-50"
                      >
                        <IconId className="h-5 w-5" />
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/signup`}
                        onClick={closeMenu}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-50"
                      >
                        <IconUserPlus className="h-5 w-5" />
                        Signup
                      </Link>
                    </li>
                  </>
                )}
              </ul>

              {/* Info links + contact */}
              <ul className="mt-3 space-y-1 border-t border-gray-100 pt-3 text-sm text-gray-600">
                <li>
                  <Link
                    href={`/track-order`}
                    onClick={closeMenu}
                    className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                  >
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/about`}
                    onClick={closeMenu}
                    className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/contact`}
                    onClick={closeMenu}
                    className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                  >
                    Contact
                  </Link>
                </li>
                <li className="flex items-center gap-2 px-3 py-2">
                  <IconPhone className="h-4 w-4" />
                  <a href="tel:+18001234567">+1 (800) 123-4567</a>
                </li>
                <li className="flex items-center gap-2 px-3 py-2">
                  <IconMail className="h-4 w-4" />
                  <a href="mailto:support@freshcart.com">
                    support@freshcart.com
                  </a>
                </li>
                <li className="flex gap-3 px-3 py-2">
                  <select className="rounded border border-gray-200 px-2 py-1">
                    <option>EGP</option>
                    <option>SAR</option>
                    <option>AED</option>
                  </select>
                  <select className="rounded border border-gray-200 px-2 py-1">
                    <option>العربية</option>
                    <option>English</option>
                  </select>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
    </>
 
  );
}