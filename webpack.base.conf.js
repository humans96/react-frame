const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const json = require('./package.json');// 引进package.json

const newEntry = {
  bundle: ['babel-polyfill', './src/index'],
};

const config = {
  entry: newEntry,
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      store: path.resolve(__dirname, './src/store'),
      api: path.resolve(__dirname, './src/api'),
      images: path.resolve(__dirname, './src/assets/images'),
    },
    extensions: ['.js', '.jsx'],
    mainFields: ['jsnext:main', 'browser', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.jsx|js?$/,
        use: ['happypack/loader?id=babel'],
        include: path.resolve(__dirname, 'src'),
        exclude: [
          path.resolve(__dirname, './node_modules'),
        ],
      },
      {
        test: /\.(less|css)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            // 'style-loader',
            {
              loader: 'css-loader?url=false',
              options: {
                minimize: true,
              },
            },
            'autoprefixer-loader',
            'less-loader',
          ],
        }),
        exclude: [
          path.resolve(__dirname, './node_modules'),
        ],
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    port: 1086,
    compress: true,
    historyApiFallback: true,
    noInfo: false,
    disableHostCheck: true,
    // proxy: {
    //   '/admin-api': {
    //     target: 'http://121.43.196.139/',
    //     pathRewrite: {'^/admin-api': ''}
    //   },
    // }
  },
};
module.exports = config;
