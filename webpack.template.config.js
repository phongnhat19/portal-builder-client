const path = require('path');
const rules = require('./webpack.rules');

function srcPaths(src) {
    return path.join(__dirname, src);
}

const libraryName = 'customPortalTemplate'
const templateUMD = {
    mode: 'development',
    entry: __dirname + '/src/template/customPortalTemplate.tsx',
    output: {
        path: __dirname + '/dist',
        filename: libraryName + '.min.js',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: `(typeof self !== 'undefined' ? self : this)`
    },
    module: {
        rules
    },
    resolve: {
        alias: {
            '@main': srcPaths('src/main'),
            '@models': srcPaths('src/models'),
            '@renderer': srcPaths('src/renderer'),
            'react-dom': '@hot-loader/react-dom'
        },
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
    }
}

module.exports = [templateUMD]