var path = require('path');
var webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    'react-hot-loader/patch',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, './src/assets/images'),
      to: './images'
    },
    {
      from: './index.html',
      to: '.'
    },
    {
      from: path.join(__dirname, './src/assets/js'),
      to: './js'
    },
    {
      from: './favicon*',
      to: '.'
    }
  ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"`
      }
    })
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      store: path.resolve(__dirname, './src/store'),
      api: path.resolve(__dirname, './src/api')
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx|js?$/,
        use: [ 'babel-loader' ],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(less|css)/,
        use: [
          'style-loader',
          'css-loader?url=false',
          'autoprefixer-loader',
          'less-loader'
        ]
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 1006,
    compress: true,
    historyApiFallback: true,
    noInfo: false,
    disableHostCheck: true,
    proxy: {
      '/wechat-advertise-api': {
        target: 'http://192.168.1.164:3010',
      },
    }
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#cheap-module-source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '\"production\"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
};