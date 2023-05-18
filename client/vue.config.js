module.exports = {
    publicPath: "/",
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:8007",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
    },
};
