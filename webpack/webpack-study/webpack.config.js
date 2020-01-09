const path = require('path');

module.exports = {
    mode: "development",
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    // 犯错
    module: {
        rules: [
            {
                test: /\.png$/,
                // 犯错
                use: {
                    loader: 'file-loader',
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1, modules: true }}],
            }
        ],
    }

}