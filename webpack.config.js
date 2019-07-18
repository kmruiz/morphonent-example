var path = require('path');

module.exports = {
	entry: path.join(__dirname, 'app', 'index.js'),
  output: {
    filename: path.join('main.js')
  },
  devServer: {
    contentBase: path.join('dist'),
    compress: true,
    port: 9000,
  }
};