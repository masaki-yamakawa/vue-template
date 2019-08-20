import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import * as lurl from "url";
import { Logger } from "../loggers/logger";
import store from "../stores";
import * as util from "util";

const baseDomain = process.env.VUE_APP_DEFAULT_API_SVR ? process.env.VUE_APP_DEFAULT_API_SVR : "/";
const baseURL = `${baseDomain}api/v1/`;

const loginUser = { userId: "user1", password: "password1" };

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
        let paramConfig: AxiosRequestConfig | undefined;
        if (config) {
            paramConfig = config;
        } else {
            paramConfig = { headers: {} };
        }
        paramConfig.headers.authorization = `Bearer ${store.getters.jwt}`;

        let success: boolean = true;
        try {
            Logger.getLogger().info(`Call REST server start: url=${url}, config=${util.inspect(paramConfig)}`);
            let retry: boolean = true;
            let counter = 0;
            let res: AxiosResponse | null = null;
            while (retry) {
                counter++;
                try {
                    res = await this.getAxios().get(url, paramConfig);
                    retry = false;
                } catch (error) {
                    if (error.response.status !== 403) {
                        throw error;
                    }
                    const resLogin: AxiosResponse = await this.getAxios().post("login", { userId: loginUser.userId, password: loginUser.password });
                    const jwt: string = resLogin.headers.authorization;
                    store.commit("saveJwt", jwt);
                    paramConfig.headers.authorization = `Bearer ${store.getters.jwt}`;
                    if (counter > 2) {
                        retry = false;
                    }
                }
            }
            return res as AxiosResponse;
        } catch (err) {
            success = false;
            throw err;
        } finally {
            Logger.getLogger().info(`Call REST server end: url=${url}, success=${success}, config=${util.inspect(paramConfig)}`);
        }
    }

    private getAxios(): AxiosInstance {
        return instance;
    }
}
