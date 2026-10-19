import lightLogo from "../../../assets/images/freshcart-logo.svg";
import Link from "next/link";
import Image from "next/image";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandPinterest,
  IconBrandTwitter,
  IconBrandVisa,
  IconBrandMastercard,
  IconBrandPaypal,
  IconPhone,
  IconMail,
  IconMapPin,
  IconTruck,
  IconRotate,
  IconShieldCheck,
  IconHeadset,
} from "@tabler/icons-react";



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




const features = [
  {
    icon: IconTruck,
    title: "Free Shipping",
    desc: "On orders over 500 EGP",
  },
  {
    icon: IconRotate,
    title: "Easy Returns",
    desc: "14-day return policy",
  },
  {
    icon: IconShieldCheck,
    title: "Secure Payment",
    desc: "100% secure checkout",
  },
  {
    icon: IconHeadset,
    title: "24/7 Support",
    desc: "Contact us anytime",
  },
];

export default function Footer() {
  return (
    <>
      {/* Features bar */}
      <div className="bg-primary-50 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <span className="bg-white text-primary-600 p-3 rounded-full">
                  <Icon stroke={2} />
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900">{title}</h4>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer id="footer" className="bg-[#101828] border-t border-gray-200 pt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6  md:gap-2 gap-8">
            {/* Logo + Description + Contact + Social */}
            <div className="lg:col-span-2">
              <Link href={`/`} className="mb-6 inline-block bg-white p-2 rounded-2xl">
             <LogoSvg/>
              </Link>

              <p className="text-gray-400 my-4 leading-relaxed">
                FreshCart is your one-stop destination for quality products.
                From fashion to electronics, we bring you the best brands at
                competitive prices with a seamless shopping experience.
              </p>

              <ul className="space-y-3 mb-4">
                <li className="flex items-center gap-2 text-gray-400">
                  <IconPhone size={18} stroke={2} />
                  <span>+1 (800) 123-4567</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <IconMail size={18} stroke={2} />
                  <span>support@freshcart.com</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <IconMapPin size={18} stroke={2} />
                  <span>123 Commerce Street, New York, NY 10001</span>
                </li>
              </ul>

              <div className="flex space-x-4">
                <span className="text-gray-400 hover:text-primary-600 cursor-pointer">
                  <IconBrandFacebook stroke={2} />
                </span>
                <span className="text-gray-400 hover:text-primary-600 cursor-pointer">
                  <IconBrandTwitter stroke={2} />
                </span>
                <span className="text-gray-400 hover:text-primary-600 cursor-pointer">
                  <IconBrandInstagram stroke={2} />
                </span>
                <span className="text-gray-400 hover:text-primary-600 cursor-pointer">
                  <IconBrandPinterest stroke={2} />
                </span>
              </div>
            </div>

            {/* Shop */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Shop</h3>
              <ul className="space-y-3">
                <li><span className="text-gray-400 hover:text-primary-600 cursor-pointer">All Products</span></li>
                <li><span className="text-gray-400 hover:text-primary-600 cursor-pointer">Categories</span></li>
                <li><span className="text-gray-400 hover:text-primary-600 cursor-pointer">Brands</span></li>
                <li><span className="text-gray-400 hover:text-primary-600 cursor-pointer">Electronics</span></li>
                <li><span className="text-gray-400 hover:text-primary-600 cursor-pointer">Men's Fashion</span></li>
                <li><span className="text-gray-400 hover:text-primary-600 cursor-pointer">Women's Fashion</span></li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Account</h3>
              <ul className="space-y-3">
                <li><Link href="/account" className="text-gray-400 hover:text-primary-600 cursor-pointer">My Account</Link></li>
                <li><Link href="/orders" className="text-gray-400 hover:text-primary-600 cursor-pointer">Order History</Link></li>
                <li><Link href="/wishlist" className="text-gray-400 hover:text-primary-600 cursor-pointer">Wishlist</Link></li>
                <li><Link href="/cart" className="text-gray-400 hover:text-primary-600 cursor-pointer">Shopping Cart</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-primary-600 cursor-pointer">Sign In</Link></li>
                <li><Link href="/signup" className="text-gray-400 hover:text-primary-600 cursor-pointer">Create Account</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Support</h3>
              <ul className="space-y-3">
                <li><Link href="/contact" className="text-gray-400 hover:text-primary-600 cursor-pointer">Contact Us</Link></li>
                <li><Link href="/help" className="text-gray-400 hover:text-primary-600 cursor-pointer">Help Center</Link></li>
                <li><span className="text-gray-400 hover:text-primary-600 cursor-pointer">Shipping Info</span></li>
                <li><Link href="/returns" className="text-gray-400 hover:text-primary-600 cursor-pointer">Returns &amp; Refunds</Link></li>
                <li><span className="text-gray-400 hover:text-primary-600 cursor-pointer">Track Order</span></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Legal</h3>
              <ul className="space-y-3">
                <li><span className="text-gray-400 hover:text-primary-600 cursor-pointer">Privacy Policy</span></li>
                <li><span className="text-gray-400 hover:text-primary-600 cursor-pointer">Terms of Service</span></li>
                <li><span className="text-gray-400 hover:text-primary-600 cursor-pointer">Cookie Policy</span></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-700 mt-10 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400">
                © {new Date().getFullYear()} FreshCart. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-gray-400">
                <IconBrandVisa size={28} stroke={1.5} />
                <IconBrandMastercard size={28} stroke={1.5} />
                <IconBrandPaypal size={28} stroke={1.5} />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}