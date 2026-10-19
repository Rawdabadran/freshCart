"use server";

import { AxiosRequestConfig, isAxiosError } from "axios";
import loginSchema, { LoginType } from "../auth/escames/login";
import { apiclient } from "@/shared/services/ApiClient";
import z from "zod";



type LogInFieldErrors = Partial<Record<keyof LoginType, string[]>>;

type loginResponse ={
    meaasge:string,
    user:{
        name:string,
        email:string,
        role:string

    },
    token:string

}

type LogInactionReturn =
  | { success: true; message: string; data: loginResponse }
  | { success: false; message: string; fieldErrors?: LogInFieldErrors };

 export default async function loginAction(data: LoginType):Promise<LogInactionReturn> {

    const validation = loginSchema.safeParse(data);

    if (validation.success === false) {

        const { formErrors, fieldErrors } = z.flattenError(validation.error);
        return {
            success: false,
            message: formErrors[0] ?? "Please fix the highlighted errors",
            fieldErrors
        }
    }

    try {
        const options: AxiosRequestConfig = {
            method: "POST",
            url: "auth/signin",
            data: validation.data
        };

         const {data}=await apiclient.request(options);
         console.log(data)

        return {
            success: true,
            message: "Login successful",
            data: data
        };
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data.message ?? "Can't reach the server, please try again later"
            };
        }

        return {
            success: false,
            message: "An unexpected error occurred, please try again later"
        };
    }
}