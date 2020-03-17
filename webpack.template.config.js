const rules = require('./webpack.rules');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const libraryName = 'customPortalTemplate'
const templateUMD = {
    mode: 'production',
    entry: __dirname + '/template/customPortalTemplate.js',
    output: {
        path:  __dirname + '/dist',
        filename: libraryName + '.min.js',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: `(typeof self !== 'undefined' ? self : this)`
    },
    module: {
        rules
    }
}

module.exports = [templateUMD]