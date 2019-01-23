const path = require("path")
const webpack = require("webpack")
const config = require("../config")
const vueLoader = require('vue-loader') // load vue files
const HTMLPlugin = require("html-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SWPrecachePlugin = require("sw-precache-webpack-plugin")
const WebappWebpackPlugin = require('webapp-webpack-plugin') // favicon
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
const VueGlobalRegistration = require("vueglobalregistration-webpack-plugin")

const minifyOptions = {
    collapseWhitespace: true,
    removeComments: true,
    ignoreCustomComments: [/vue-ssr-outlet/]
}


var plugins = [
    new ExtractTextPlugin({
        filename: 'css/[name].[chunkhash].css',
        allChunks: true
    }),
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(config.nodeEnv),
        "process.env.VUE_ENV": "'client'"
    }),
    new vueLoader.VueLoaderPlugin(),
    new HTMLPlugin({
        inject: true,
        template: __dirname + "/../src/index.template.html",
        minify: config.PROD ? minifyOptions : {},
        BUILD_BUILDNUMBER: process.env.BUILD_BUILDNUMBER,
        config: config.website
    }),
]

if(config.service_worker &&  config.PROD)
{
    plugins.push(new SWPrecachePlugin({
        cacheId: config.website.name,
        filename: "service-worker.js",
        minify: true,
        staticFileGlobs: [
            config.public_folder + "/css/**.css",
            config.public_folder + "/fonts/**/*",
            config.public_folder + "/js/**.js",
            config.public_folder + "/img/**/*"
        ],
        stripPrefix: config.public_folder + '/',
        runtimeCaching: [{
            urlPattern: /\/.*/,
            handler: "networkFirst"
        }],
        dontCacheBustUrlsMatching: /./,
        navigateFallback: "/"
    }))
}

plugins = config.PROD ? plugins.concat([
    new WebappWebpackPlugin({
        logo: path.resolve(config.website.favicon),
        prefix: 'icons/',
        inject: true
    }),
    new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
]) : plugins.concat([
    new FriendlyErrorsPlugin()
])


module.exports = {
    mode: !config.PROD ? 'development' : 'production',
    devtool: config.PROD ? false : "inline-source-map",
    entry: {
        app: ['babel-polyfill', __dirname + "/../src/app.js"]
    },
    output: {
        path: path.resolve(__dirname, "../" + config.public_folder),
        publicPath: "/",
        filename: "js/[name].[hash:16].js"
    },
    devServer: {
		port: 3000,
        historyApiFallback: true,
	},
    resolve: {
        alias: {
            "src": path.resolve(__dirname, "../src"),
            "components": path.resolve(__dirname, "../src/components"),
            "images": path.resolve(__dirname, "../src/images"),
            "router": path.resolve(__dirname, "../src/router"),
            "store": path.resolve(__dirname, "../src/store"),
            "styles": path.resolve(__dirname, "../src/styles"),
            "mixins": path.resolve(__dirname, "../src/mixins"),
            "static": path.resolve(__dirname, "../src/static"),
            "views": path.resolve(__dirname, "../src/views")
        },
        extensions: ['.js', '.vue', '.scss']
    },
    resolveLoader: {
        alias: {
            'scss-loader': 'sass-loader'
        }
    },
    module: {
        noParse: /es6-promise\.js$/,
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }, {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                enforce: "pre",
                test: /app.js/,
                loader: VueGlobalRegistration.Register({
                    type: "component",
                    replace: "// GLOBAL COMPONENTS",
                    folder: __dirname + "/../src/components",
                    recursive: true
                })
            },
            {
                enforce: "pre",
                test: /app.js/,
                loader: VueGlobalRegistration.Register({
                    type: "component",
                    replace: "// GLOBAL LAYOUTS",
                    importPrefix: 'LAY',
                    folder: __dirname + "/../src/layouts",
                    recursive: true
                })
            },
            {
                enforce: "pre",
                test: /index.js/,
                loader: VueGlobalRegistration.Register({
                    type: "routing",
                    array: "routes",
                    replace: "//GLOBAL ROUTER INJECTION",
                    folder: __dirname + "/../src/views",
                    rules: [
                        {
                            test: /@connected/,
                            meta: {
                                connected: true
                            }
                        },
                        {
                            test: /@admin/,
                            meta: {
                                connected: true,
                                role: "Admin"
                            }
                        }
                    ]
                })
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    preserveWhitespace: false,
                    postcss: [
                        require("autoprefixer")({
                            browsers: ["last 3 versions"]
                        }),
                        require("cssnano")
                    ]
                }
            },

            {
                test: /\.js$/,
                loader: "babel-loader",
                //exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-env"]
                }
            },
            {
                test: /\.(json|txt|csv)(\?.*)?$/,
                type: 'javascript/auto',
                exclude: /i18n/,
                loader: "file-loader?name=static/[name].[hash:16].[ext]"

            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "img/[name].[hash:16].[ext]"
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "fonts/[name].[hash:16].[ext]"
                }
            }
        ]
    },
    performance: {
        maxEntrypointSize: 250000,
        hints: config.PROD ? "warning" : false
    },
    plugins: plugins

}