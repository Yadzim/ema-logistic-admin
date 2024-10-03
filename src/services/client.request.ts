import instance from "config/axios.config";

type TypeGetAll = <T>({
  url,
  params,
}: {
  url: string;
  params?: Record<string | number, any>;
}) => Promise<T>;

const getAll: TypeGetAll = async ({ url, params }) => {

  const response = await instance({ url, method: "GET", params });

  return response.data;
};

type TypeGetOne = <T>({
  url,
  params,
}: {
  url: string;
  params?: Record<string | number, any>;
}) => Promise<T>;

const getOne: TypeGetOne = async ({ url, params }) => {
  const response = await instance({ url, method: "GET", params });

  return response.data;
};

export const CLIENT_API = {
  getAll,
  getOne,
};
