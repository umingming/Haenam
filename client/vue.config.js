module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "https://haenam-387106.du.r.appspot.com",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
    },
};
