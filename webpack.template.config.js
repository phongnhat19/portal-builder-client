const rules = require('./webpack.rules');

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
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ]
    }
}

module.exports = [templateUMD]