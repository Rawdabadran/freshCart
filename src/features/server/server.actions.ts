"use server";
import { apiclient } from "@/shared/services/ApiClient";
import { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
 
export  async function setToken (token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('token', token,{
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
  })
  
}

export async function getToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    return token?.value || null;
}


export async function removeToken(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete('token');
}


export async function verifyToken():Promise<{ isAuthenticated: boolean; user: { id: string; name: string; role: string } |null}>{

  const token= await getToken();

if(!token){
  return {
    isAuthenticated: false,
    user: null,
  };
}

try {

    const options:AxiosRequestConfig ={
      url: "/auth/verifyToken",
      method: 'GET',
      headers: {
      token: token,
      }
      
    }  
  
  const{data} = await apiclient.request(options);

  if(data.message==="verified"){
return {
    isAuthenticated: true,
    user:{
      id: data.decoded.id,
      name: data.decoded.name,
      role: data.decoded.role,
    }
   };
  }
    
    return {
    isAuthenticated: false,
    user: null,
  };
}
 catch (error) {
  return {
    isAuthenticated: false,
    user: null,
  };
 }

}