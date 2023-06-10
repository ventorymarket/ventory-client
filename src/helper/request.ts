import AxiosInstance from "@/service/api";
import axios from "axios";

export async function getAsyncCMS(url: any, param: any) {
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      params: param,
    });
    return response;
  } catch (ex: any) {
    const { status = 400, data = {} } = ex?.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: {},
      message: error[0]?.message || "",
      code: error[0]?.code || 0,
    };
  }
}

export async function getAsync(url: any, param: any) {
  try {
    const response = await AxiosInstance.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      params: param
    });
    return response;
  } catch (ex: any) {
    const { status = 400, data = {} } = ex?.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: {},
      message: error[0]?.message || "",
      code: error[0]?.code || 0,
    };
  }
}

export async function postAsync(url: any, param: any) {
  try {
    const response = await AxiosInstance.post(url, param, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
    return response;
  } catch (ex: any) {
    const { status = 400, data = {} } = ex?.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: {},
      message: error[0]?.message || "",
      code: error[0]?.code || 0,
    };
  }
}
