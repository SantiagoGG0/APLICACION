// Sirve para identificar la ruta de donde se encuentra  este archivo
const path = require('path');

// Permite trabajar con documentos HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Extraer el codigo CSS, minificarlo y optimizarlo. Ademas lo agrega como parte del head.
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Permite copiar archivos de una ruta a otra.
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    // Investigar operadores en JS, diferencias entre el operador == y ===.
    const isProduction = argv.mode === 'production';
    return {
        entry: {
            index:  './src/index.js',
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist') 
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, 'src/assets/js'),
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        },                        
                    }
                }
            ]
        },
        plugins: [],
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            open: true,
            hot: true,
            watchFiles: [
                'src/**/*'
            ]
        }
    };
}
