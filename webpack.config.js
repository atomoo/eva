const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'cheap-source-map',
    mode: 'development',
    entry: [
        path.join(__dirname, 'src', 'Index.jsx'),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        contentBase: './dist',
        port: 3000,
        host: '0.0.0.0',
        hot: true,
        historyApiFallback: true,
        disableHostCheck: true
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                include: path.resolve(__dirname),
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                ]
            }
        ]
    },
}
