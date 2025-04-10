import axios from 'axios';
import queryString from 'query-string';

import { isObjectEmpty } from '../utils/common';

export const axiosInstance = axios.create({
  baseURL: "https://dev.vn.euroland.com/opifex2-api/",
  withCredentials: true,
});

const getAxios = async (path: string) => {
  return await axiosInstance.get(path);
};

const postAxios = async (path: string, params = {}) => {
  return await axiosInstance.post(path, params);
};

const putAxios = async (path: string, params = {}) => {
  return await axiosInstance.put(path, params);
};

const deleteAxios = async (path: string) => {
  return await axiosInstance.delete(path);
};

const GET = (path: string, params = {}) => {
  if (isObjectEmpty(params)) {
    return getAxios(path);
  }
  const query = queryString.stringify(params);
  return getAxios(`${path}?${query}`);
};

const POST = (path, params = {}) => {
  return postAxios(path, params);
};
const PUT = (path, params = {}) => {
  return putAxios(path, params);
};

const DELETE = (path, params = {}) => {
  return deleteAxios(`${path}/${params}`);
};

export default { GET, POST, DELETE, PUT };
