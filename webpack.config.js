const merge = require('webpack-merge');//webpack配置文件合并
const baseWebpackConfig = require("./webpack.base.conf");//基础配置

var path = require('path');
var webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let config = merge(baseWebpackConfig, {
  output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      chunkFilename: "[name]-[id].js"
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"`
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    /* common 业务公共代码，vendor引入第三方 */
    new webpack.optimize.CommonsChunkPlugin({
        name: ["bundle","vendor"],
    }),
    /* 防止 vendor hash 变化 */
    new webpack.optimize.CommonsChunkPlugin({
        name: ['manifest'],
        chunks: ['vendor']
    }),
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
      }]),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
});

if (process.env.NODE_ENV === 'development') {
  config.devtool = 'eval';
  config.entry.bundle.push('react-hot-loader/patch');
  config.plugins = (config.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin()
  ])
};

if (process.env.NODE_ENV === 'production') {
};
module.exports = config;