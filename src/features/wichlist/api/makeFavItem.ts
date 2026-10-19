import { apiclient } from "@/shared/services/ApiClient";
import { AxiosRequestConfig } from "axios";
import { AddToWishlistResponse } from "../typs/wishlist.type";
import { getToken } from "../../server/server.actions"; // غيّر المسار لمكان getToken عندك

export async function addToWishlist(productId: string): Promise<AddToWishlistResponse> {
  const token = await getToken();

  const options: AxiosRequestConfig = {
    url: "/wishlist",
    method: "POST",
    headers: {
      token: token,
    },
    data: {
      productId,
    },
  };

  const { data } = await apiclient.request<AddToWishlistResponse>(options);
  return data;
}