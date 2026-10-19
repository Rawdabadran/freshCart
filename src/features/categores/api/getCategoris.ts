import { apiclient } from "@/shared/services/ApiClient";
import { AxiosRequestConfig } from "axios";
import { CategoriesResponse } from "../types/categoryType";
import { ProductsResponse } from "../types/allProductType";

 type responseType={
    results:number,
    metadata:{
        currentPage:number,
        numberOfPages:number,
        limit:number
    }
    data:[
        {
            
            _id:string,
            name: string,
            slug: string,
            image: string,
            createdAt: string,
            updatedAt: string
        }
    ]
    
}

export async function  getCategories():Promise<CategoriesResponse>{

const options:AxiosRequestConfig={
    url:"/categories",
    method:"GET",
}

 const {data}=await apiclient.request<CategoriesResponse>(options)
 
 return  data
}



export async function  getCategoryProducts(id:string):Promise<ProductsResponse>{

const options: AxiosRequestConfig = {
    url: `/products?category=${id}`,
    method: "GET",
  
  };

  const { data } = await apiclient.request<ProductsResponse>(options);

  return data;
}



