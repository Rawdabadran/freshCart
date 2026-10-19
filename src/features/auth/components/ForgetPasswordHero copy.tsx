import {
  IconClock,
  IconShieldHalfFilled,
  IconTruck,
} from "@tabler/icons-react";

import CoverImage from "../../../assets/images/ForgetPassCover.png"

export default function ForgetHero() {
  return (
    <>
      {/* <!-- Left Side - Image/Branding --> */}
      <div className="hidden lg:block">
        <div className="text-center space-y-6">
          <img
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
            src={CoverImage.src}
            alt="fresh vegetables and fruits shopping cart illustration, modern clean style, green theme"
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">
             Rest Your PassWord
            </h2>
            <p className="text-lg text-gray-600">
             don't worry it happens to beast of us , We will help you to get to your account in no time
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <IconTruck className="text-primary-600 mr-2" stroke={2} />
                Free Delivery
              </div>
              <div className="flex items-center">
                <IconShieldHalfFilled className="text-primary-600 mr-2" />
                Secure Payment
              </div>
              <div className="flex items-center">
                <IconClock stroke={2} className="text-primary-600 mr-2" />
                24/7 Support
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
