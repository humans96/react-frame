const merge = require('webpack-merge');// webpack配置文件合并

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');// 基础配置
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = merge(baseWebpackConfig, {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash:8].js',
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    new HappyPack({
      id: 'babel',
      loaders: [{
        loader: 'babel-loader',
        query: {
          cacheDirectory: './webpack_cache/',
        },
      }],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"`,
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource && resource.indexOf('node_modules') >= 0 && resource.match(/\.js$/)
      ),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
      minChunks: Infinity,
    }),
    new ExtractTextPlugin({
      filename: 'css/bundle-[hash:8].css', 
      disable: false,
      allChunks: true, 
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, './src/assets/images'),
        to: './images',
      },
      {
        from: './index.html',
        to: '.',
      },
      {
        from: './favicon*',
        to: '.',
      }]),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
});

if (process.env.NODE_ENV === 'development') {
  config.devtool = 'cheap-module-eval-source-map';
  config.entry.bundle.push('react-hot-loader/patch');
  config.plugins = (config.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin(),
  ]);
}

if (process.env.NODE_ENV === 'production') {
  config.devtool = 'cheap-module-source-map';
  config.output.filename = '[name]-[chunkhash:8].js';
  config.plugins = (config.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        drop_console: true,
      },
    }),
    new CleanWebpackPlugin(),
  ]);
}

module.exports = config;
