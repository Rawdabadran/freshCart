import { apiclient } from "@/shared/services/ApiClient";
import { AxiosRequestConfig } from "axios";
import { BrandsResponse, ProductsResponse } from "./brandType";

export async function getBrands(page = 1): Promise<BrandsResponse> {
  const options: AxiosRequestConfig = {
    url: "/brands",
    method: "GET",
    params: { page },
  };

  const { data } = await apiclient.request<BrandsResponse>(options);

  return data;
}

export async function getBrandProduct(id:string): Promise<ProductsResponse> {
  const options: AxiosRequestConfig = {
    url: `/products?brand=${id}`,
    method: "GET",
  
  };

  const { data } = await apiclient.request<ProductsResponse>(options);

  return data;
}