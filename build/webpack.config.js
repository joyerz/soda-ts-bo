const path = require('path')
const webpack = require('webpack')
const WebpackHTMLPlugin = require('html-webpack-plugin')
const ReduxSagaPlugin = require('./reduxSagaHelperPlugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const vars = require('./webpack.vars')

console.log('process.env', process.env.HOME)
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, '../src/index.tsx'),

  resolve: vars.resolve,

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: '[name].js',
    crossOriginLoading: 'anonymous'
  },

  module: {
    rules: vars.rules
  },

  plugins: [
    new ReduxSagaPlugin(),
    // new FlowBabelWebpackPlugin(),
    new CheckerPlugin(),
    //
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),

    // extractCSS,
    new vars.MiniCss({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignore: 'warning'
    }),

    /*压缩优化代码结束*/
    new WebpackHTMLPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: './index.html',
      inject: true,
      // favicon: path.resolve(__dirname, '../src/assets/images/favicon.png')
    })
  ],
  // externals: {
  //   'react': 'react',
  //   'React': 'react',
  //   'react-dom': 'react-dom',
  //   'ReactDOM': 'react-dom',
  // },
  // stats: 'errors-only',
  devServer: vars.devServer
}
