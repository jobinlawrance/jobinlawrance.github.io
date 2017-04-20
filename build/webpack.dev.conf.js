var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: require('html-webpack-template'),
      appMountId: 'app',
      mobile: true,
      inject: true,
      title: 'Jobin Lawance',
      meta: [{
          name: 'description',
          content: 'A freelance developer based in Mubmai who develops Mobile & Web Applications'
        },
        {
          name: 'viewport',
          contetn: 'width=device-width, initial-scale=1'
        },
        {
          name : "msapplication-TileColor",
          content : "#2b5797"
        },
        {
          name : "msapplication-TileImage",
          content : "/static/mstile-144x144.png"
        },
        {
          name : "theme-color",
          content : "#e1d71e"
        }
      ],
      links: [{
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/static/apple-touch-icon.png"
        },
        {
          rel : "icon",
          type : "image/png",
          href : "/static/favicon-32x32.png",
          sizes : "32x32"
        },
        {
          rel : "icon",
          type : "image/png",
          href : "/static/favicon-194x194.png",
          sizes : "194x194"
        },
        {
          rel : "icon",
          type : "image/png",
          href : "/static/android-chrome-192x192.png",
          sizes : "192x192"
        },
        {
          rel: "icon",
          type: "image/png",
          href: "/static/favicon-16x16.png",
          sizes: "16x16"
        },
        {
          rel: "manifest",
          href: "static/manifest.json"
        },
        {
          rel: "mask-icon",
          href : "/static/safari-pinned-tab.svg",
          color : "#27293f"
        }
      ]
    }),
    new FriendlyErrorsPlugin()
  ]
})
