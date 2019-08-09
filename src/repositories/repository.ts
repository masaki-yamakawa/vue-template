import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const baseDomain = process.env.VUE_APP_DEFAULT_API_SVR ? process.env.VUE_APP_DEFAULT_API_SVR : "/";
const baseURL = `${baseDomain}`;

const instance = axios.create({
    baseURL,
    timeout: 60000,
    headers: {
        "Content-Type": "application/json",
    },
});

export interface IRepository<T = any> {
    find(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | T>;
}

export abstract class Repository implements IRepository {
    public async find(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return this.getAxios().get(url, config);
    }

    private getAxios(): AxiosInstance {
        return instance;
    }
}
