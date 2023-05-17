function setInterceptors(instance) {
    instance.interceptors.request.use(
        (config) => {
            config.headers["Content-Type"] = "application/json";
            return config;
        },
        (error) => Promise.reject(error.response)
    );
    instance.interceptors.response.use(
        (config) => config,
        (error) => Promise.reject(error.response)
    );
    return instance;
}

export { setInterceptors };
