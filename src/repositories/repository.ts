import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import * as lurl from "url";
import { Logger } from "../loggers/logger";
import store from "../stores";
import router from "../router";
import * as util from "util";

const baseDomain = process.env.VUE_APP_DEFAULT_API_SVR ? process.env.VUE_APP_DEFAULT_API_SVR : "/";
const baseURL = `${baseDomain}api/v1/`;

const instance = axios.create({
    baseURL,
    timeout: 60000,
    headers: {
        "Content-Type": "application/json",
    },
});

export interface ObjectLiteral {
    [key: string]: any;
}

export interface IRepository<T = any> {
    readonly name: string;

    find(url?: string, parameters?: ObjectLiteral, config?: AxiosRequestConfig): Promise<AxiosResponse | T>;
    save(url?: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse | T>;
}

export abstract class Repository implements IRepository {
    public readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    public async find(url?: string, parameters?: ObjectLiteral, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        const getUrl = url ? url.toLowerCase() : this.name.toLowerCase();
        let queryStr = "";
        if (parameters) {
            queryStr = `${lurl.format({ query: parameters })}`;
        }
        return this.callAxios(`${getUrl}${queryStr}`, config);
    }

    public async save(url?: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        const postUrl = url ? url.toLowerCase() : this.name.toLowerCase();
        return this.callAxios(postUrl, config, data);
    }

    private async callAxios(url: string, config?: AxiosRequestConfig, postData?: any): Promise<AxiosResponse> {
        let paramConfig: AxiosRequestConfig | undefined;
        if (url !== "login") {
            if (config) {
                paramConfig = config;
            } else {
                paramConfig = { headers: {} };
            }
            paramConfig.headers.authorization = `Bearer ${store.getters.jwt}`;
        }

        let success: boolean = true;
        try {
            Logger.getLogger().info(`Call REST server start: url=${url}, config=${util.inspect(paramConfig)}, data=${util.inspect(postData)}`);
            let res: AxiosResponse | null = null;
            if (!postData) {
                res = await this.getAxios().get(url, paramConfig);
            } else {
                res = await this.getAxios().post(url, postData, paramConfig);
            }
            return res as AxiosResponse;
        } catch (err) {
            success = false;
            router.push("/login");
            throw err;
        } finally {
            Logger.getLogger().info(`Call REST server end: url=${url}, success=${success}, config=${util.inspect(paramConfig)}, data=${util.inspect(postData)}`);
        }
    }

    private getAxios(): AxiosInstance {
        return instance;
    }
}
