const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

const publicPath = process.env.ASSET_PATH || '/';

module.exports = Merge(CommonConfig, {
    // source map
    devtool: '#cheap-module-eval-source-map',

    // dev server
    devServer: {
        port: 3000,
        host: 'localhost',
        historyApiFallback: true,
        noInfo: false,
        stats: 'minimal',
        publicPath: publicPath
    }
})
