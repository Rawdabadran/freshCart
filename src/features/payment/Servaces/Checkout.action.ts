"use server"

import { toast } from "sonner";
import { ShippingFormValues } from "../Escama/checkdetails";
import { getToken } from "@/features/server/server.actions";
import { AxiosRequestConfig } from "axios";
import { apiclient } from "@/shared/services/ApiClient";
import { error } from "console";




export  async function CheckCashTheOrder (ClientDetails: ShippingFormValues,CartId:string){

const token = await getToken()

if(!token){
  return{
   status: "error",
    message:"Please Login to do this action"
  } ;
}

try{
  
const options:AxiosRequestConfig={
      url:`/orders/${CartId}`,
       method: "POST",
    headers: {
      token: token,
    },
    data: {
     shippingAddress:{
        details: ClientDetails.details,
        phone: ClientDetails.phone,
        city: ClientDetails.phone
        }
    },

}

const {data} = await apiclient.request(options)


return data
}

catch(err){
  console.log(err)
  return{
    status: "error",
    message:"Pleas try again latter"
  }
}


}



export  async function CheckOutOnlineOrder(ClientDetails: ShippingFormValues,CartId:string,url:string){

const token = await getToken()

if(!token){
  return{
   status: "error",
    message:"Please Login to do this action"
  } ;
}

try{
  
  
const options:AxiosRequestConfig={
      url:`/orders/checkout-session/${CartId}?url=${url}`,
       method: "POST",
    headers: {
      token: token,
    },
    data: {
     shippingAddress:{
        details: ClientDetails.details,
        phone: ClientDetails.phone,
        city: ClientDetails.phone
        }
    },

}

const {data} = await apiclient.request(options)


return data
}

catch(err){
  return{
    status: "error",
    message:"Pleas try again latter"
  }
}


}
