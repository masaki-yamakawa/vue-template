import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const baseDomain = process.env.VUE_APP_DEFAULT_API_SVR ? process.env.VUE_APP_DEFAULT_API_SVR : "/";
const baseURL = `${baseDomain}/api/v1/`;

const instance = axios.create({
    baseURL,
    timeout: 60000,
    headers: {
        "Content-Type": "application/json",
    },
});

export interface IRepository<T = any> {
    readonly name: string;

    find(url?: string, config?: AxiosRequestConfig): Promise<AxiosResponse | T>;
}

export abstract class Repository implements IRepository {
    public readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    public async find(url?: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        const getUrl = url ? url : this.name.toLowerCase();
        return this.getAxios().get(getUrl, config);
    }

    private getAxios(): AxiosInstance {
        return instance;
    }
}
