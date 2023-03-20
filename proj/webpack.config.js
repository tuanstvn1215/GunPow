const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv').config({
    path: path.join(__dirname, '.env')
});
const MergeIntoSingle = require('webpack-merge-and-include-globally');
module.exports = {
    entry: './src/Main.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        alias: {
            "webfontloader": path.resolve(__dirname, "./node_modules/webfontloader/webfontloader.js")
        },
        extensions: ['.ts', '.js'],
        fallback: {
            fs: false,
            path: false
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        host: '0.0.0.0',
        port: 8082
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": dotenv.parsed
        }),
        new MergeIntoSingle({
            files: {
                "libs.js": [
                    './libs/pixi.js',
                    './libs/tweenjs.min.js',
                    './libs/fairygui.js',
                    './libs/rawinflate.min.js',
                    './libs/stats.min.js',
                    './libs/pixi-particles.js',
                    './libs/pixi-sound.js',
                    './libs/html-text.js',
                    
                ]
            },
            transform: {
                'libs.js': code => require("uglify-js").minify(code).code
            }
        }),
    ],
};
