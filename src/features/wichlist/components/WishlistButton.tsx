"use client";

import { useState } from "react";
import { IconHeart, IconHeartFilled, IconLoader2 } from "@tabler/icons-react";
import { addToWishlist } from "../api/makeFavItem"; // غيّر المسار حسب مكانها
import { useDispatch } from "react-redux";
import { wishlistActions } from "@/store/slices/wishlist.slice";
import { getWishlist } from "../api/getwishlist";
import { toast } from "sonner";

export default function WishlistButton({ productId }: { productId: string }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 const dispatch =useDispatch()
 const {setWishlistInfo}=wishlistActions
  async function handleClick() {
    if (isLoading || isInWishlist) 
    {
   toast.info("this Item is your list");
      return;
    }
    

    setIsLoading(true);
    setIsInWishlist(true); 

    try {
      const res = await addToWishlist(productId);
          if(res.status=="success")
          {
            
           const wishlistItems=await getWishlist()
           dispatch(setWishlistInfo(wishlistItems))
          }
      if (res.status !== "success") setIsInWishlist(false);

    
      
    } catch (error) {
      console.error(error);
      setIsInWishlist(false); // لو الـ API فشلت يرجع زي ما كان
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      aria-label="Add to wishlist"
      aria-pressed={isInWishlist}
      className={`flex size-8 items-center justify-center rounded-full shadow-md transition-colors disabled:cursor-wait sm:size-10 ${
        isInWishlist
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-white text-gray-700 hover:bg-primary-600 hover:text-white"
      }`}
    >
      {isLoading ? (
        <IconLoader2 className="size-4 animate-spin sm:size-5" />
      ) : isInWishlist ? (
        <IconHeartFilled className="size-4 sm:size-5" />
      ) : (
        <IconHeart className="size-4 sm:size-5" stroke={1.8} />
      )}
    </button>
  );
}