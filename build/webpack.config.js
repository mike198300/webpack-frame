const path = require('path')
const utils = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = require('../config')


function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const webpack_config = {
    mode: 'development',
    "context": "C:\\Users\\Mike\\WebstormProjects\\webpack-frame",
    entry: {
        index: './src/js/index.js',
        page1: './src/js/page1.js'
    },
    output: {
        path: path.join(__dirname, '..', 'dist/js'),
        filename: "[name].[hash:8].js",
        publicPath: '/'
    },
    devServer: {
        publicPath: config.dev.assetsPublicPath,
        contentBase: path.join(__dirname, '../dist'),
        host: '127.0.0.1',
        port: 9000,

        // 在 dev-server 的两种不同模式之间切换。默认情况下，应用程序启用内联模式(inline mode)。
        //     这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台。
        inline: true,

        // 如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。
        // proxy: {
        //     '/api': 'http://localhost:3000'
        // },

        // 一切服务都启用 gzip 压缩：
        compress: true,

        // clientLogLever: 'info',

        // 启用 webpack 的 模块热替换 功能
        hot: true,

        // Enables Hot Module Replacement (see devServer.hot) without
        //     page refresh as fallback in case of build failures.
        // hotOnly: true,

        // 默认情况下，dev-server 通过 HTTP 提供服务。也可以选择带有 HTTPS 的 HTTP/2 提供服务：
        // https: true,

        // 以上设置使用了自签名证书，但是你可以提供自己的：
        // https: {
        //     key: fs.readFileSync('/path/to/server.key'),
        //     cert: fs.readFileSync('/path/to/server.crt'),
        //     ca: fs.readFileSync('/path/to/ca.pem'),
        // },

        // 指定打开浏览器时的导航页面。
        // openPage: 'page1.html',

        // 告诉 dev-server 在 server 启动后打开浏览器。默认禁用。
        // open: true, // or "Chrome"

        // 被作为索引文件的文件名。
        // index: 'index.html',

        // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。默认禁用。如果你想要只显示编译器错误：
        // overlay: true,

        // 如果想要显示警告和错误：
        // overlay: {
        //     warnings: true,
        //     errors: true
        // }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: []
                    }
                },
                include: [resolve('src'), resolve('test')],
                exclude: [resolve('node_modules')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('../img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('../fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.join(__dirname, '..', 'dist/css'),
                            // only enable hmr(Hot Module Reloading) in development
                            hmr: process.env.NODE_ENV === 'development',
                        }
                    },
                    // 'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new ManifestPlugin(),
        new MiniCssExtractPlugin(
            {
                chunkFilename: '../css/[name].[hash:8].css',
            }
        ),
        // new HtmlWebpackPlugin(
        //     {
        //         title: "index",
        //         filename: "../index.html",
        //         template: "./src/template/index.html",
        //         chunks: ['index']
        //     }
        // ),
        new HtmlWebpackPlugin(
          {
              title: "index",
              filename: path.resolve(__dirname, '../dist/index.html'),
              template: "./src/template/index.html",
              chunks: ['index'],
              inject: true,
              minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeAttributeQuotes: true
                  // more options:
                  // https://github.com/kangax/html-minifier#options-quick-reference
              },
              // necessary to consistently work with multiple chunks via CommonsChunkPlugin
              chunksSortMode: 'dependency'
          }
        ),
        new HtmlWebpackPlugin(
            {
                title: "page1",
                filename: "../page1.html",
                template: "./src/template/page1.html",
                chunks: ['page1'],
                inject: true // true == 'body', 'head', false
            }
        )
    ]
};

module.exports = webpack_config;
