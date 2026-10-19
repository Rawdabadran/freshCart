import { getToken } from "@/features/server/server.actions";
import { apiclient } from "@/shared/services/ApiClient";
import { AxiosRequestConfig } from "axios";
import { AddToCartResponse, CarterrorRespons, Cartitem, CartResponse, GetCartResponse, RemoveCartItemResponse } from "../types/addtoCartResponse";
import { toast } from "sonner";



export interface ClearCartResponse {
  status: "success" | "error" | "fail";
  message: string;
  numOfCartItems: number;
  cartId: string | null;
  data: {
    products: Cartitem[];
    totalCartPrice: number;
   cartOwner:string;
  };
}

export  async function addToCart (ProductId:string):Promise<CartResponse|CarterrorRespons>{

const token = await getToken()

if(!token){
  return{
   status: "error",
    message:"Please Login to do this action"
  } ;
}

try{
  
const options:AxiosRequestConfig={
      url:"/cart",
       method: "POST",
    headers: {
      token: token,
    },
    data: {
     productId:ProductId,
    },

}

const {data} = await apiclient.request(options)


return data
}

catch(err){
  return{
    status: "error",
    message:"Please Login to do this action"
  }
}


}




export async function getCartItems(): Promise<GetCartResponse | null> {
  const token = await getToken();
  if (!token) return null;

  try {
    const options: AxiosRequestConfig = {
      url: "/cart",
      method: "GET",
      headers: { token },
    };

    const { data } = await apiclient.request<GetCartResponse>(options);
    return data;
  } catch (err) {
    
    console.error("getCartItems failed:", err);
    return null; 
  }
}





export  async function removeItemFromCart  (ProductId:string):Promise<RemoveCartItemResponse|CarterrorRespons>{

const token = await getToken()

if(!token){
  return{
   status: "error",
    message:"Please Login to do this action"
  } ;
}

try{
const options:AxiosRequestConfig={
      url:`/cart/${ProductId}`,
       method: "DELETE",
    headers: {
      token: token,
    },
    
}
const {data} = await apiclient.request(options)


return data
}

catch(err){
  return{
    status: "error",
    message:"Please Login to do this action"
  }
}


}






export  async function clearCart  ():Promise<ClearCartResponse |CarterrorRespons>{

const token = await getToken()

if(!token){
  return{
   status: "error",
    message:"Please Login to do this action"
  } ;
}

try{
const options:AxiosRequestConfig={
      url:`https://ecommerce.routemisr.com/api/v2/cart`,
       method: "DELETE",
    headers: {
      token: token,
    },
    
}
const {data} = await apiclient.request(options)


return data
}

catch(err){
  return{
    status: "error",
    message:"Please Login to do this action"
  }
}


}



export  async function updateCartItemCounter (ProductId:string,count:number):Promise<CartResponse|CarterrorRespons>{

const token = await getToken()

if(!token){
  return{
   status: "error",
    message:"Please Login to do this action"
  } ;
}

try{
  
const options:AxiosRequestConfig={
    url:`/cart/${ProductId}`,
    method: "PUT",
    headers: {
      token: token,
    },
    data:{
      count:count
    }
}

const {data} = await apiclient.request(options)

return data
}

catch(err){
  return{
    status: "error",
    message:"Please Login to do this action"
  }
}
}

