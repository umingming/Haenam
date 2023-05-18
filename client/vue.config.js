module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "https://natural-oath-386805.du.r.appspot.com",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
    },
};
