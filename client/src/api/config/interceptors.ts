import {
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
} from "axios";

function setInterceptors(instance: AxiosInstance): AxiosInstance {
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            config.headers["Content-Type"] = "application/json";
            return config;
        },
        (error) => Promise.reject(error.response)
    );
    instance.interceptors.response.use(
        (responce: AxiosResponse) => responce,
        (error) => Promise.reject(error.response)
    );
    return instance;
}

export { setInterceptors };
