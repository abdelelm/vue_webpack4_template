const webpack = require("webpack")
const config = require("../config")
const merge = require("webpack-merge")
const base = require("./webpack.base.config")
const HTMLPlugin = require("html-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SWPrecachePlugin = require("sw-precache-webpack-plugin")


const minifyOptions = {
	collapseWhitespace: true,
	removeComments: true,
	ignoreCustomComments: [/vue-ssr-outlet/]
}

const clientConfig = merge(base, {
	plugins: [
		new webpack.DefinePlugin({
			"process.env.VUE_ENV": "'client'"
		}),
		new HTMLPlugin({
			template: "src/index.template.html",
			minify: config.PROD ? minifyOptions : {}
		}),
	]
})

if (config.ssr) {
	const VueSSRClientPlugin = require("vue-server-renderer/client-plugin")
	clientConfig.plugins.push(new VueSSRClientPlugin());
}

if (config.PROD) {
	clientConfig.plugins.push(
		new UglifyJsPlugin({
			cache: true,
			parallel: true,
			sourceMap: true
		}),
		new SWPrecachePlugin({
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
		}),
		new webpack.optimize.ModuleConcatenationPlugin()
	)
}



module.exports = clientConfig