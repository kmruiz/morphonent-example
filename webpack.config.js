var path = require('path');

module.exports = {
	entry: path.join(__dirname, 'app', 'index.jsx'),
  output: {
    filename: path.join('main.js')
  },
  devServer: {
    contentBase: path.join('dist'),
    compress: true,
    port: 9000,
    historyApiFallback: {
      index: '/'
    }
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
};