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
        allowedHosts: [
          'localhost',
          'http://siscac.grazcompany.com:8081/',
          'http://siscac.grazcompany.com',
          'https://siscac.grazcompany.com:8081/',
          'https://siscac.grazcompany.com'
        ],
    },
    configureWebpack: {
        devServer: {
            host: "localhost",
            hot: true,
            disableHostCheck: true
        }
    }
};