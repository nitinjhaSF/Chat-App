import { axiosClient } from "@/config/axios";
import { AxiosResponse } from "axios";

export const APIFetcher = async (url: string) => {
  try {
    const response = await axiosClient.get(url);

    return response.data;
  } catch (err: any) {
    throw err.response as AxiosResponse;
  }
};

export const APIPusher = async <R = any>(url: string, data: any) => {
  try {
    const response = await axiosClient.post(url, data);

    return response as AxiosResponse<R>;
  } catch (err: any) {
    throw err.response as AxiosResponse;
  }
};

export const APIUpdater = async <T>(url: string, data: T) => {
  try {
    const response = await axiosClient.put(url, data);

    return response.data;
  } catch (err: any) {
    throw err.response as AxiosResponse;
  }
};

export const APIRemover = async (url: string) => {
  try {
    const response = await axiosClient.delete(url);

    return response.data;
  } catch (err: any) {
    throw err.response as AxiosResponse;
  }
};
