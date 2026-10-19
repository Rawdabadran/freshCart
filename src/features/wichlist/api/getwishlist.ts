import { getToken } from "@/features/server/server.actions";
import { apiclient } from "@/shared/services/ApiClient";
import { AxiosRequestConfig } from "axios";

export async function getWishlist() {
  const token = await getToken();
  if (!token) return null;

  try {
    const options: AxiosRequestConfig = {
      url: "/wishlist",
      method: "GET",
      headers: { token },
    };

    const { data } = await apiclient.request(options);
    return data;
  } catch (err: any) {
    if (err?.response?.status !== 401) {
      console.error("getWishlist failed:", err);
    }
    return null;
  }
}