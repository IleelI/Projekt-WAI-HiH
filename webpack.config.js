const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
    const devMode = !env.production;
    const config = {
        mode: devMode ? 'development' : 'production',
        entry: {
            index: path.resolve(__dirname, 'src', 'js', 'index.js'),
            gallery: path.resolve(__dirname, 'src', 'js', 'gallery.js'),
            planer: path.resolve(__dirname, 'src', 'js', 'planer.js'),
            contact: path.resolve(__dirname, 'src', 'js', 'contact.js'),
            script: path.resolve(__dirname, 'src', 'js', 'script.js')
        },
        output: {
            path: path.resolve(__dirname, 'public'), // __dirname resolves the "/" root of the whole project
            filename: devMode ? 'js/[name].js' : 'js/[name].js', // It's equal to /public/js/[name].js path.
        },
        plugins: [
            new CleanWebpackPlugin({
                cleanStaleWebpackAssets: false,
            }),
            new miniCssExtractPlugin({
                // We operate on webpack output.path directory which is "/public" in our case
/*                filename: devMode ? 'css/[name].css'
                    : 'css/[hash].[id].css',*/
                filename: 'css/[name].css',
                chunkFilename: "css/[hash].css",
            }),
            new htmlWebpackPlugin({
                title: "Main Page",
                // File name uses the output.path directory '/public"
                filename: "../index.html",
                // Template uses the path from the root of the project "/"
                template: path.resolve("src","assets","html","index.html"),
                chunks: [ "index", "script"],
                minify: false,
            }),
            new htmlWebpackPlugin({
                title: "Galeria Zdjęć",
                // File name uses the output.path directory '/public"
                filename: "../gallery.html",
                // Template uses the path from the root of the project "/"
                template: path.resolve("src","assets","html","gallery.html"),
                chunks: [ "gallery", "script" ],
                minify: false,
            }),
            new htmlWebpackPlugin({
                title: "Planer",
                // File name uses the output.path directory '/public"
                filename: "../planer.html",
                // Template uses the path from the root of the project "/"
                template: path.resolve("src","assets","html","planer.html"),
                chunks: [ "planer", "script" ],
                minify: false,
            }),
            new htmlWebpackPlugin({
                title: "Kontakt",
                // File name uses the output.path directory '/public"
                filename: "../contact.html",
                // Template uses the path from the root of the project "/"
                template: path.resolve("src","assets","html","contact.html"),
                chunks: [ "contact", "script" ],
                minify: false,
            })
        ],
        module: {
            rules: [
                {
                    test: /\.s[a|c]ss$/i,
                    exclude: /node_modules/,
                    use: [
                        miniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    outputStyle: 'expanded'
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.(svg|png|jpe?g|gif)$/i,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                // The Path used by outputPath is "/public/...." where dots are the part of outputPath
                                outputPath: "/assets/images",
                                // The defualt public path is set to the css path directory,
                                // we have to step out of it to get to the assets/images folder.
                                // And now the path to our images is correct and can be correctly placed in css!
                                publicPath: "../assets/images", // It's the URI Address that's
                                // passed to the webpack, so it can replace it later when compiling other files.
                                name: "[name].[ext]"
                            }
                        }
                    ]
                },
            ]
        },
        stats: {
          preset: "normal",
          colors: true,
        },
        optimization: {
            splitChunks: {
                chunks: 'async',
                minSize: 20000,
                minRemainingSize: 0,
                maxSize: 35000,
                minChunks: 1,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                automaticNameDelimiter: '~',
                enforceSizeThreshold: 50000,
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        },
        watch: true
    }
    return config;
}