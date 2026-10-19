import { apiclient } from "@/shared/services/ApiClient";
import { AxiosRequestConfig } from "axios";

export type ChangePasswordBody = {
  currentPassword: string;
  password: string;
  rePassword: string;
};

export async function changePassword(body: ChangePasswordBody, token: string) {
  const options: AxiosRequestConfig = {
    url: "/users/changeMyPassword",
    method: "PUT",
    headers: { token },
    data: body,
  };

  const { data } = await apiclient.request(options);
  return data;
}