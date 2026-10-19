import { apiclient } from "@/shared/services/ApiClient";
import { AxiosRequestConfig } from "axios";

export type UpdateMeBody = {
  name: string;
  email: string;
  phone: string;
};

export async function updateMe(body: UpdateMeBody, token: string) {
    
  const options: AxiosRequestConfig = {
    url: "/users/updateMe/",
    method: "PUT",
    headers: { token },
    data: body,
  };

  const { data } = await apiclient.request(options);
  return data;
}