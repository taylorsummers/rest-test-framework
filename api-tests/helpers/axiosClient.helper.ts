import axios, {AxiosResponse} from 'axios';
import {EnvConfig} from '../config/envConfig.model';

const envConfig: EnvConfig = (process as any).envConfig;

const apiDomain = envConfig.apiDomain;

export const axiosPost = async <T>(
  path = '',
  params = {},
  authenticate = false
): Promise<AxiosResponse<T>> => {
  //const authorization = authenticate ? '' : '';
  return axios({
    baseURL: `${apiDomain}${path}`,
    proxy: false,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {},
  });
};

export const axiosGet = async <T>(
  path = '',
  params = {},
  authenticate = false
): Promise<AxiosResponse<T>> => {
  //const authorization = authenticate ? '' : '';
  return axios({
    baseURL: `${apiDomain}${path}`,
    proxy: false,
    method: 'get',
    params: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const axiosDelete = async <T>(
  path = '',
  params = {},
  authenticate = false
): Promise<AxiosResponse<T>> => {
  //const authorization = authenticate ? '' : '';
  return axios({
    baseURL: `${apiDomain}${path}`,
    proxy: false,
    method: 'delete',
    params: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
