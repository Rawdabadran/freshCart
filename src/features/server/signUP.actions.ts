'use server';

import { AxiosRequestConfig, isAxiosError } from "axios";
import registerSchema, { SignUpType } from "../auth/escames/signup";
import * as z from "zod";
import { apiclient } from "@/shared/services/ApiClient";
// import { Signika } from "next/font/google";


type SignUpFieldErrors = Partial<Record<keyof SignUpType, string[]>>;

type SignUpactionReturn =
  | { success: true; message: string }
  | { success: false; message: string; fieldErrors?: SignUpFieldErrors };



export async function SignUpaction(data: SignUpType): Promise<SignUpactionReturn> {
   const validataction = registerSchema.safeParse(data)
   console.log(validataction)

   if(validataction.success===false)
   {
     const {formErrors,fieldErrors}=z.flattenError(validataction.error)
   
     return{
      success:false,
      message:formErrors[0]?? "fix highlited errors",
      fieldErrors

     }
   }


   try{
      const options:AxiosRequestConfig={
         method:"POST",
         url:"/auth/signup",
         data:validataction.data
      }
    await apiclient.request(options)  

    return{
      success:true,
      message:"account created successfully"
    }


   }
   catch(error)
   {
      if(isAxiosError(error))
      {
return{
       success:false,
       message:error.response?.data.message?? " can't reach the server try later" 
      }
   }

   return{
      success:error,
      message:"some thing wrong"
   }
   
      }

      
   

}


