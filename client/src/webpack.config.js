
module.exports = {
    devServer: {
        inline:true,
        contentBase:'./public',
        port: 14173,
        historyApiFallback: true
    },
    mode: 'development',
    entry: ['@babel/polyfill', './src/client.js'],
    output: {
        filename: 'index.js'
    },
    module: {
        rules: [
            {test:/\.js$/,
                exclude:/node_modules/,
                use: {loader: 'babel-loader'}
            }
        ]
    }
};