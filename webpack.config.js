const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});
module.exports = {
  entry: ['regenerator-runtime/runtime', path.join(__dirname, 'src/main.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ],
  },
  plugins: [htmlPlugin],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/dist',
    },
    proxy: { '/api': 'http://localhost:3000' },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
};
