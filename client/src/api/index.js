import axios from "axios";
import { setInterceptors } from "./config/interceptors";

function create(url, options) {
    const instance = axios.create({ baseURL: url, ...options });
    setInterceptors(instance);
    return instance;
}

export const apiInstance = create("");
