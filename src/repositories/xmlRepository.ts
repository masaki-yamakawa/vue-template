import axios, { AxiosInstance } from "axios";
import { IRepository, Repository } from "./repository";

const baseDomain = process.env.VUE_APP_DEFAULT_API_SVR ? process.env.VUE_APP_DEFAULT_API_SVR : "/";
const baseURL = `${baseDomain}api/v1/`;

const instance = axios.create({
    baseURL,
    timeout: 60000,
    withCredentials: false,
    headers: {
        "Content-Type": "text/xml",
    },
});

export abstract class XmlRepository extends Repository implements IRepository {

    constructor(name: string) {
        super(name);
    }

    protected getAxios(): AxiosInstance {
        return instance;
    }
}
