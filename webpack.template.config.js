const path = require('path');

function srcPaths(src) {
    return path.join(__dirname, src);
}

const libraryName = 'customPortalTemplate'
const templateUMD = {
    mode: 'development',
    entry: __dirname + '/src/template/customPortalTemplate.tsx',
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
                test: /\.tsx?$/,
                exclude: /(node_modules|.webpack)/,
                loaders: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }]
            },
            {
                test: /\.(scss|css)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            }
        ]
    },
    resolve: {
        alias: {
            '@main': srcPaths('src/main'),
            '@models': srcPaths('src/models'),
            '@renderer': srcPaths('src/renderer')
        },
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
    }
}

module.exports = [templateUMD]