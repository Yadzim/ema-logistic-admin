import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { FILE_BASE_URL } from "../utils";
import { message } from "antd";
import { ResponseError } from "./errors";
// import store from 'store';
// import { AUTH_ACTIONS } from 'store/auth';
import { Navigate } from "react-router-dom";

let instanceFile = axios.create();

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const access_token: string = localStorage.getItem("access_token") ?? "";
  config.baseURL = FILE_BASE_URL;

  config.headers.Authorization = `${access_token}`;
  return config;
};

const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
  new ResponseError(error);
  return Promise.reject(error);
};
const onResponse = (response: AxiosResponse): AxiosResponse => {
  switch (response.status) {
    case 201:
      message.success("Ma'lumot qo'shildi!");
      break;
    case 200:
      break;
    case 204:
      message.success("Ma'lumot o'chirildi!");
      break;
    case 401:
      logOut();
      break;
  }
  return response;
};

function logOut() {
  message.error("Login  yoki parol xato!");
  localStorage.removeItem("access_token");
  Navigate({ to: "/signin" });
  // store.dispatch(AUTH_ACTIONS.signOut());
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  new ResponseError(error);
  return Promise.reject(error);
};

instanceFile.interceptors.request.use(onRequest, onRequestError);
instanceFile.interceptors.response.use(onResponse, onResponseError);

export default instanceFile;
