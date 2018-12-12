const Vue = require("vue")
const path = require("path")
const webpack = require("webpack")
const VueI18n = require("vue-i18n")
const config = require("../config")
const vueLoader = require('vue-loader')
const WebappWebpackPlugin = require('webapp-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StringReplacePlugin = require("string-replace-webpack-plugin")
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin')
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
const VueGlobalRegistration =require("vueglobalregistration-webpack-plugin")

const messages = {
	main: require(`${__dirname}/../src/i18n/${config.language.filename}`),
	fallback: config.fallbackLanguage ? require(`${__dirname}/../src/i18n/${config.fallbackLanguage.filename}`) : null
}
Vue.use(VueI18n);
const i18n = new VueI18n({
	locale: "main",
	fallbackLocale: messages.fallback ? "fallback" : null,
	messages
})
const commonPlugins = [
	new ExtractTextPlugin({
		filename: 'css/[name].[chunkhash].css',
		allChunks: true
	}),
	new webpack.DefinePlugin({
		"process.env.NODE_ENV": JSON.stringify(config.nodeEnv),
		"MAINFILELANGUAGE": JSON.stringify(config.language.filename)
	}),
	new vueLoader.VueLoaderPlugin()
]
const doI18n = StringReplacePlugin.replace({
	replacements: [{
		pattern: /\$ts\((.+)\)/g,
		replacement: function (fullMatch, params, offset, string) {
			params = params.split(",").map((p) => eval(p))
			if (i18n.tc(...params) === params[0]) {
				if (config.PROD) {
					throw new Error(`[i18n] Translation key "${params[0]}" does not exist`)
				} else { // just warn in development mode
					console.warn(`[i18n] Translation key "${params[0]}" does not exist`)
				}
			}
			return i18n.tc(...params)
		}
	}]
})

// if(config.DEV)
// {
// 	commonPlugins.push(
// 		new ExtraWatchWebpackPlugin({
// 			dirs: [ __dirname+ '/../src/components/' , __dirname+ '/../src/views/' ],
// 		})
// 	)
// }

module.exports = {
	mode: !config.PROD ? 'development' : 'production',
	devtool: config.PROD ?
		false :
		"inline-source-map",

	entry: {
		app: ['babel-polyfill' ,  "./src/entry-client.js"]
	},
	output: {
		path: path.resolve(__dirname, "../"+ config.public_folder ),
		publicPath: "/",
		filename: "js/[name].[chunkhash:16].js"
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
		noParse: /es6-promise\.js$/, // avoid webpack shimming process
		rules: [{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
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
					folder :  __dirname +  "/../src/components",
					recursive : true
				})
			},

			{
				enforce: "pre",
				test: /index.js/,
				loader: VueGlobalRegistration.Register({
					type: "routing",
					array : "routes",
					replace : "//<ROUTING>",
					folder : __dirname + "/../src/views",
					rules : [ {
						test :  /@connected/,
						meta : {
							connected :  true
						}
					  },
					  {
						test :  /@admin/,
						meta : {
							connected :  true ,
							role : "admin"
						}
				  	 }
					]
				})
			},
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					preLoaders: {
						html: doI18n
					},
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
				exclude: /node_modules/,
				options: {
					presets: ["@babel/preset-env"]
				}
			},
			{
				test:/\.(json|txt|csv)(\?.*)?$/,
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
				loader: "url-loader?limit=10000",
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

	plugins: config.PROD ? commonPlugins.concat([
		new WebappWebpackPlugin({ logo : path.resolve(config.website.favicon) ,  prefix: 'icons/' , inject: true} ),
	]) : commonPlugins.concat([
		new FriendlyErrorsPlugin()
	])
}
