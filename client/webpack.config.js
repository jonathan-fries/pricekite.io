const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    devServer: {
        inline:true,
        contentBase:'./public',
        port: 15051,
        historyApiFallback: true
    },
    mode: 'development',
    entry: ['@babel/polyfill', './src/client.js'],
    output: {
        path: __dirname + '/public/scripts',
        filename: 'index.js'
    },
    module: {
        rules: [
            {test:/\.js$/,
                exclude:/node_modules/,
                use: {loader: 'babel-loader'}
            },
            {test:/\.(css)$/, use: [{loader: MiniCssExtractPlugin.loader}, "css-loader" ]},
            {test:/\.(scss|sass)$/, use: [{loader: MiniCssExtractPlugin.loader}, "css-loader", "sass-loader" ]}

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: "../stylesheets/app.css"})
    ]
};
