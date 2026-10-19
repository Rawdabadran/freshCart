import { getToken } from "@/features/server/server.actions";
import { apiclient } from "@/shared/services/ApiClient";
import { AxiosRequestConfig } from "axios";
import { toast } from "sonner";
import { Order, OrdersResponse } from "../Types/OrderType";

 export async function GetUserOrders(id:string){
    
    const token = await getToken()
    if(!token)
    {
        toast.info("You Should to log in to do this action")
        return;
     }
 
     try{
  const options:AxiosRequestConfig={

    url:`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
    method:"GET"
  }

  const {data}= await apiclient.request(options)
  return data;
     }
     catch(err){
        toast.error("some thing went wrong")

     }

  


}

