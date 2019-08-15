const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // installed via npm
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const buildPath = path.resolve(__dirname, 'dist')
module.exports = {
 // This option controls if and how source maps are generated.
 // https://webpack.js.org/configuration/devtool/
 devtool: 'source-map',
 // https://webpack.js.org/concepts/entry-points/#multi-page-application
 entry: {
  index: './src/page-list/main.js',
  details: './src/page-details/main.js',
},

 // how to write the compiled files to disk
 // https://webpack.js.org/concepts/output/
 output: {
   filename: '[name].[hash:20].js',
   path: buildPath
 },
 // https://webpack.js.org/concepts/loaders/
 module: {
   rules: [
     {
       test: /\.js$/,
       exclude: /node_modules/,
       loader: 'babel-loader',
       options: {
         presets: ['@babel/preset-env']
       }
     },
     {
       test: /\.scss$/,
       use: [
         MiniCssExtractPlugin.loader,
         'css-loader',
         'sass-loader'
       ]
     },
     {
       // Load all images as base64 encoding if they are smaller than 8192 bytes
       test: /\.(png|jpg|gif|svg)$/,
       use: [
         {
           loader: 'url-loader',
           options: {
             name: '[name].[hash:20].[ext]',
             limit: 8192
           }
         }
       ]
     },
     {
       test: /\.hbs$/,
       use: 'handlebars-loader'
     }
   ]
 },
 // https://webpack.js.org/concepts/plugins/
 plugins: [
   new CopyWebpackPlugin([
       {from:'src/img',to:'img'}
   ]),
   new HtmlWebpackPlugin({
     template: './src/page-list/index.html',
     inject: true,
     chunks: ['index'],
     filename: 'index.html'
   }),
   new HtmlWebpackPlugin({
     template: './src/page-details/details.html',
     inject: true,
     chunks: ['details'],
     filename: 'details.html'
   }),
   new WebpackBar()
 ],
 // https://webpack.js.org/configuration/optimization/
 optimization: {
   minimizer: [
     new UglifyJsPlugin({
       cache: true,
       parallel: true,
       sourceMap: true
     }),
     new OptimizeCssAssetsPlugin({})
   ]
 }
}
