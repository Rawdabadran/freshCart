import { apiclient } from "@/shared/services/ApiClient";
import { AxiosRequestConfig } from "axios";
import { ProductDetailsResponse } from "../Services/ProductDetails.Type";

export async function GetProductDetails(id:string):Promise<{data:ProductDetailsResponse}>
{
    const options:AxiosRequestConfig={
        url:`/products/${id}`,
        method:"GET"
    }
 
  const {data}= await apiclient.request(options);
  return data;

}
