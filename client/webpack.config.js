
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
            },
            {
              test: /\.less$/,
              use: [
                {
                  loader: "style-loader"
                },
                {
                  loader: "css-loader",
                  options: {
                    sourceMap: true,
                    modules: true,
                    localIdentName: "[local]___[hash:base64:5]"
                  }
                },
                {
                  loader: "less-loader"
                }
              ]
            }

        ]
    }
};
