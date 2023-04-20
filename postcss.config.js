module.exports = {
    port: 80,
    server: {
        baseDir: "./dist",
        host: "localhost"
    },
    plugins: {
        autoprefixer: {}
    },
    devServer: {
        host: "localhost",
        hot: true,
        disableHostCheck: true
    },
    configureWebpack: {
        devServer: {
            host: "localhost",
            hot: true,
            disableHostCheck: true
        }
    }
};