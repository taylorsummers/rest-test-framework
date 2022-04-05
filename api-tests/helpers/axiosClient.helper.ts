import axios, {AxiosResponse} from 'axios';
import {EnvConfig} from '../config/envConfig.model';

const envConfig: EnvConfig = (process as any).envConfig;
const apiDomain = envConfig.apiDomain;

class AxiosHelper {
  public static post = async <T>(
    path = '',
    body = {},
    params = {},
    authenticate = false
  ): Promise<AxiosResponse<T>> => {
    //const authorization = authenticate ?  : '';
    return axios({
      baseURL: `${apiDomain}${path}`,
      proxy: false,
      method: 'post',
      params: params,
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
    });
  };

  public static get = async <T>(
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

  public static delete = async <T>(
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

  public static put = async <T>(
    path = '',
    body = {},
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
      data: body,
    });
  };
}

export default AxiosHelper;
