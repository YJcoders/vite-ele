import axios from "axios";
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
} from "axios";
import { ElMessage } from "element-plus";
const baseURL: any = import.meta.env.VITE_BASE_URL;

const http: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

// 请求前的统一处理
const tempToken = "11ed695b027a400ba83e8523e1ec5eff";
const loginToken = window.sessionStorage.getItem("TOKEN") || tempToken;
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // JWT鉴权处理
    if (config.headers) config.headers["LoginToken"] = loginToken;
    return config;
  },
  (error: AxiosError) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    const isGetAllRes =
      response.config &&
      response.config.params &&
      response.config.params.isGetAllRes;

    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 204
    )
      return isGetAllRes ? response : response.data;

    handleError(response.status, response.data.message);
    return isGetAllRes
      ? Promise.reject(response)
      : Promise.reject(response.data);
  },
  (error: AxiosError) => {
    console.log(error);
    const { response } = error;
    if (response) {
      const isGetAllRes =
        response.config &&
        response.config.params &&
        response.config.params.isGetAllRes;
      if (isGetAllRes) return Promise.reject(response);

      // 请求已发出，但是不在2xx的范围
      handleError(response.status, response?.data?.message);
      return Promise.reject(response);
    } else {
      if (error.message == "请不要重复操作") return Promise.reject(response);
      // 网络或其他问题
      // UiUtils.error({
      //   title: "请求数据不存在",
      //   content: " ",
      // });
      if (error.message == "Network Error") throw new Error(error.message);
      return Promise.reject(response);
    }
  }
);

// 错误处理
function toLogin() {
  // 提示时长 2s
  ElMessage({
    message: "登录已失效，请重新登录",
    type: "error",
    duration: 2000,
  });

  const url = `http://ddd/login`;
  window?.top?.location.replace(url);
}

function handleError(status: any, message: string) {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 403: 登录过期，跳转登录页
    // 403  ecs平台定义为数据权限 没有权限，不能退出
    // case 403:
    //   setTimeout(() => {
    //     toLogin();
    //   }, 1000);
    //   break;
    // 404请求不存在
    case 404:
      ElMessage({
        message: "请求数据不存在",
        type: "error",
        duration: 1000,
      });
      break;
    default:
      // customMessage 全局提示组件，文案超长可收起提示
      ElMessage({
        message: message,
        type: "error",
        duration: 3000,
      });
  }
}

export default http;
