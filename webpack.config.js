const path = require('path');

module.exports = {
  entry: './src/index.ts', 
  devtool: 'inline-source-map', 
  module: {
    rules: [
      {
        test: /\.tsx?$/, 
        use: 'ts-loader', 
        exclude: /node_modules/, 
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], 
  },
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'dist'), 
  },
  mode: 'development', 
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), 
    },
    compress: true, 
    port: 8080, 
    open: true, 
    hot: true, 
  },
};