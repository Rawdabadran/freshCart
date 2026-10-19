import { apiclient } from "@/shared/services/ApiClient";
import { AxiosRequestConfig, isAxiosError } from "axios";



export  async function  forgotPassword (email:string)
{

     try {
            const options: AxiosRequestConfig= {
                method: "POST",
                url: "/auth/forgotPasswords",
                data: {
                   email:email
                }
            };
    
             const {data}=await apiclient.request(options);
             console.log(data)
    
            return {
                success: true,
                message: data.message,
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

export  async function verifyResetCode(code:string)
{

     try {
            const options: AxiosRequestConfig= {
                method: "POST",
                url: "/auth/verifyResetCode",
                data: {
                   resetCode:code
                }
            };
    
             const {data}=await apiclient.request(options);
             console.log(data)
    
            return {
                success: true,
                message: data.message,
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


export async function resetPassword(email: string, newPassword: string) {
  try {
    const options: AxiosRequestConfig = {
      method: "PUT",
      url: "/auth/resetPassword",
      data: { email, newPassword },
    };

    const { data } = await apiclient.request(options);

    return {
      success: true,
      message: data?.message ?? "Password changed successfully",
      data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message ??
          "Can't reach the server, please try again later",
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred, please try again later",
    };
  }
}