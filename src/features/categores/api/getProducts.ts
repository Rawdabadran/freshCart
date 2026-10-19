import { apiclient } from "@/shared/services/ApiClient";
import { AxiosRequestConfig } from "axios";
import { ProductsResponse } from "../types/allProductType";

export async function GetProducts():Promise<ProductsResponse>
{
    const options:AxiosRequestConfig={
        url:"/products",
        method:"GET"
    }
 
  const {data}= await apiclient.request(options);
  return data;

}
