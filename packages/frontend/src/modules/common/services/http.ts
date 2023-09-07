import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IHttpError } from './http.interfaces';
import { HttpException } from './http.classes';
import { STORAGE_KEYS } from '../constants/app-keys.constants';

export class HttpService {
  constructor(
    private baseUrl = process.env.REACT_APP_BACKEND_URL ?? 'none',
    private fetchingService = axios
  ) {}

  private getFullApiUrl(url: string) {
    return `${this.baseUrl}/${url}`;
  }

  private populateTokenToHeaderConfig() {
    return {
      Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}`
    };
  }

  private extractUrlAndDataFromConfig({
    data,
    url,
    ...configWithoutDataAndUrl
  }: AxiosRequestConfig) {
    return configWithoutDataAndUrl;
  }

  private configForAuth(config: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...config,
      headers: {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      },
      withCredentials: true
    };
  }

  public async create(config: AxiosRequestConfig, withAuth = true) {
    if (withAuth) {
      config = this.configForAuth(config);
    }
    try {
      const response = await this.fetchingService.post(
        this.getFullApiUrl(config.url ?? 'none'),
        config.data,
        this.extractUrlAndDataFromConfig(config)
      );
      return response;
    } catch (err) {
      const axiosError = err as AxiosError<IHttpError>;
      throw new HttpException(axiosError.response!.data.error, axiosError.response!.status);
    }
  }

  public async get(config: AxiosRequestConfig, withAuth = true) {
    if (withAuth) {
      config = this.configForAuth(config);
    }
    try {
      const response = await this.fetchingService.get(
        this.getFullApiUrl(config.url ?? 'none'),
        this.extractUrlAndDataFromConfig(config)
      );
      return response;
    } catch (err) {
      const axiosError = err as AxiosError<IHttpError>;
      throw new HttpException(axiosError.response!.data.error, axiosError.response!.status);
    }
  }

  public async put(config: AxiosRequestConfig, withAuth = true) {
    if (withAuth) {
      config = this.configForAuth(config);
    }
    try {
      const response = await this.fetchingService.put(
        this.getFullApiUrl(config.url ?? 'none'),
        config.data,
        this.extractUrlAndDataFromConfig(config)
      );
      return response;
    } catch (err) {
      const axiosError = err as AxiosError<IHttpError>;
      throw new HttpException(axiosError.response!.data.error, axiosError.response!.status);
    }
  }

  public async patch(config: AxiosRequestConfig, withAuth = true) {
    if (withAuth) {
      config = this.configForAuth(config);
    }
    try {
      const response = await this.fetchingService.patch(
        this.getFullApiUrl(config.url ?? 'none'),
        config.data,
        this.extractUrlAndDataFromConfig(config)
      );
      return response;
    } catch (err) {
      const axiosError = err as AxiosError<IHttpError>;
      throw new HttpException(axiosError.response!.data.error, axiosError.response!.status);
    }
  }

  public async delete(config: AxiosRequestConfig, withAuth = true) {
    if (withAuth) {
      config = this.configForAuth(config);
    }
    try {
      const response = await this.fetchingService.delete(
        this.getFullApiUrl(config.url ?? 'none'),
        this.extractUrlAndDataFromConfig(config)
      );
      return response;
    } catch (err) {
      const axiosError = err as AxiosError<IHttpError>;
      throw new HttpException(axiosError.response!.data.error, axiosError.response!.status);
    }
  }
}

export type { AxiosResponse };
