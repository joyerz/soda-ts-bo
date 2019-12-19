const path = require('path')
const MiniCss = require('mini-css-extract-plugin')

const resolve = {
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.less', '.json'],
  alias: {
    '@src': path.resolve(__dirname, '../src'),
    '@com': path.resolve(__dirname, '../src/components'),
    '@utils': path.resolve(__dirname, '../src/utils'),
    '@assets': path.resolve(__dirname, '../src/assets'),
    '@conf': path.resolve(__dirname, '../src/conf'),
    '@pages': path.resolve(__dirname, '../src/pages'),
  },
}

const rules = [
  // {
  //   loader: 'webpack-ant-icon-loader',
  //   enforce: 'pre',
  //   include: [require.resolve('@ant-design/icons/lib/dist')]
  // },
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    // use: ['awesome-typescript-loader', 'eslint-loader']
    use: ['babel-loader', 'eslint-loader'],
  },
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ['babel-loader', 'eslint-loader'],
  },
  { enforce: 'pre', test: /\.(js|ts)$/, loader: 'source-map-loader' },

  {
    oneOf: [
      {
        test: /\.css$/,
        include: [/node_modules[\\/]antd/, /dist/],
        use: [
          {
            loader: MiniCss.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        include: /node_modules[\\/]antd/,
        use: [
          {
            loader: MiniCss.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              paths: [path.resolve(__dirname, 'node_modules/antd')],
              modifyVars: {
                // 'primary-color': '#1DA57A',
                // 'link-color': '#1DA57A',
                // 'border-radius-base': '2px',
                // or
                hack: 'true; @import \'./src/assets/antd/variable.less\'',
                // 'hack': `true; @import "../src/assets/antd/variable.less";`, // Override with less file
              },
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCss.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:10]'
            }
          },
          {
            loader: 'postcss-loader'
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: path.resolve(
                __dirname,
                '../src/assets/scss/variable.scss',
              ),
            },
          },
        ],
      },
    ],
  },
  {
    test: /\.(png|jpg|gif)$/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=3000&name=images/[name]_[hash].[ext]'
  },
  {
    test: /\.(woff|woff2|eot|ttf|svg)$/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=10240&name=fonts/[name].[ext]'
  }
]

const devServer = {
  contentBase: path.resolve(__dirname, '../dist'),
  port: 3000,
  host: '0.0.0.0',
  proxy: {
    '/api/**': {
      target: 'https://motoapi.sodacar.com/',
      secure: false,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/upload/**': {
      target: 'http://localhost:3200',
      secure: false,
      pathRewrite: { '^/upload': '' },
    },
    '/auth/**': {
      target: 'https://motoauthapi.sodacar.com/',
      secure: false,
      changeOrigin: true,
      pathRewrite: { '^/auth': '' },
    },
    '/baidu/**': {
      target: 'http://localhost',
      secure: false,
      changeOrigin: true,
      pathRewrite: { '^/baidu': '' },
    },
  },
}

module.exports = {
  MiniCss,
  resolve,
  rules,
  devServer,
}


