const json = require('./package.json');//引进package.json
const path = require('path');

const newEntry = {
    'bundle': ['babel-polyfill','whatwg-fetch','./src/index'],
};

newEntry.vendor = Object.keys(json.dependencies); //把 package.json dependencies字段的值放进 vendor中

let config = {
    entry: newEntry,
    resolve: {
        alias: {
            components: path.resolve(__dirname, './src/components'),
            store: path.resolve(__dirname, './src/store'),
            api: path.resolve(__dirname, './src/api'),
            images: path.resolve(__dirname, './src/assets/images'),
          },
          extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
          {
            test: /\.jsx|js?$/,
            use: [ 'babel-loader' ],
            include: path.join(__dirname, 'src'),
            exclude: [
                path.resolve(__dirname, "./node_modules")
            ],
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
          '/admin-api': {
            target: 'http://121.43.196.139/',
            pathRewrite: {'^/admin-api': ''}
          },
        }
    }
};
module.exports = config;