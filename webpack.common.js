const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 根目录
const publicPath = process.env.ASSET_PATH || '/';

// 开发目录
const appPath = path.join(__dirname, 'src');

// 打包输出目录
const outputPath = path.join(__dirname, 'dist');
const config = {
  // 入口文件
  entry: './src/index.js',

  // 输出
  output: {
    path: outputPath,
    filename: '[name].bundle.js',
    chunkFilename: '[id].[chunkhash].js',
    publicPath: './',
    sourceMapFilename: '[name].map',
  },

  resolve: {
    extensions: [
      '.ts', '.js', '.json',
    ],
    modules: [appPath, 'node_modules'],
  },

  module: {
    rules: [
      // es6 to es5
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(html)$/,
        use: [
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src", "link:href"],
            },
          },
        ],
      },
      // scss to css
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
      // css loader
      {
        test: /\.css$/,
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      // images chunk
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: '[name].[hash:7].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
      // font chunk
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/', // where the fonts will go
              publicPath: './', // override the default path
            },
          },
        ],
      },
    ],
  },

  plugins: [
    // 每次打包清空目录
    new CleanWebpackPlugin(['./dist']),
    // 引入全局jquery
    new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
    // 合并公共资源
    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse(),
    }),
    // 拷贝index.html并自动添加js引用
    new HtmlWebpackPlugin({ template: './src/index.html', chunksSortMode: 'dependency' }),
    // 自动添加css样式表到head标签中，并重命名为style.css
    new ExtractTextPlugin('style.css'),
  ],
}

// 获得模板文件
let pages = Object.keys(getEntry('src/views/**/*.html', 'src/views/'));
pages.forEach(function (pathname) {
  var conf = {
    filename: './views/' + pathname + '.html', // 生成的html存放路径，相对于path
    template: 'src/views/' + pathname + '.html', // html模板路径
    inject: false // js插入的位置，true/'head'/'body'/false
  }
  config.plugins.push(new HtmlWebpackPlugin(conf))
})

module.exports = config;

function getEntry(globPath, pathDir) {
  const files = glob.sync(globPath)
  let entries = {}, entry, dirname, basename, pathname, extname

  for (var i = 0; i < files.length; i++) {
    entry = files[i]
    dirname = path.dirname(entry)
    extname = path.extname(entry)
    basename = path.basename(entry, extname)
    pathname = path.normalize(path.join(dirname, basename))
    pathDir = path.normalize(pathDir)
    if (pathname.startsWith(pathDir)) {
      pathname = pathname.substring(pathDir.length)
    }
    entries[pathname] = ['./' + entry]
  }
  return entries
}