import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { setInterceptors } from "./config/interceptors";

function create(url: string, options?: CreateAxiosDefaults): AxiosInstance {
    const instance = axios.create(Object.assign({ baseURL: url }, options));
    setInterceptors(instance);
    return instance;
}

const baseURL = "http://localhost:8007";
export const apiInstance = create(baseURL);
