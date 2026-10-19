import { apiclient } from "@/shared/services/ApiClient";
import { AxiosRequestConfig } from "axios";
import { BrandsResponse } from "./brandType";

export async function getBrands(page = 1): Promise<BrandsResponse> {
  const options: AxiosRequestConfig = {
    url: "/brands",
    method: "GET",
    params: { page },
  };

  const { data } = await apiclient.request<BrandsResponse>(options);

  return data;
}