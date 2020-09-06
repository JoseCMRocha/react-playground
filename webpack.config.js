const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

// process.env.NODE_ENV = "development"
console.log(process.env.NODE_ENV);

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
        main: ['webpack-hot-middleware/client', './src/index.tsx'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.join(__dirname, 'src'),
                use: [
                    isDevelopment && {
                        loader: 'babel-loader',
                        options: { 
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: ['react-refresh/babel'] 
                        },
                    },
                    'ts-loader',
                ].filter(Boolean),
            },
        ],
    },
    plugins: [
        isDevelopment && new webpack.HotModuleReplacementPlugin(),
        isDevelopment &&
        new ReactRefreshPlugin({
            overlay: {
                sockIntegration: 'whm',
            },
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './public/index.html',
        }),
    ].filter(Boolean),
    resolve: {
        extensions: ['.js', '.ts','.tsx'],
    },
};