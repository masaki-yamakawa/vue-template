import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import * as lurl from "url";
import { Logger } from "../loggers/logger";

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
}

export abstract class Repository implements IRepository {
    public readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    public async find(url?: string, parameters?: ObjectLiteral, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        const getUrl = url ? url : this.name.toLowerCase();
        let queryStr = "";
        if (parameters) {
            queryStr = `${lurl.format({ query: parameters })}`;
        }
        return this.callAxios(`${getUrl}${queryStr}`, config);
    }

    private async callAxios(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        let success: boolean = true;
        try {
            Logger.getLogger().info(`Call REST server start: url=${url}, config=${config}`);
            const res: AxiosResponse = await this.getAxios().get(url, config);
            return res;
        } catch (err) {
            success = false;
            const res: AxiosResponse = await this.getAxios().get(url, config);
            throw err;
        } finally {
            Logger.getLogger().info(`Call REST server end: url=${url}, success=${success}, config=${config}`);
        }
    }

    private getAxios(): AxiosInstance {
        return instance;
    }
}
