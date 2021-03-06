const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode:"none",
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool:"eval-source-map",
  plugins: [
    new CleanWebpackPlugin(),
  	new CopyPlugin([
  		{
  			from: "public"
  		}
  	])
  ],
  module: {
    rules: [
      {
        test:/\.css$/i,
        use:['style-loader','css-loader'],
      },
      {
        enforce:"pre",
        test: /\.(js|jsx$)/, 
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          failOnError:true,
        },
      },
      { 
        test: /\.(js|jsx$)/, 
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env',
                    '@babel/react',{
                    'plugins': ['@babel/plugin-proposal-class-properties']}]
        } 
      },
      {
        test: /\.(png|jpe?g|gif|woff|woff2)$/i,
        use:[{loader:'file-loader',}],
      },


    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),
    compress:true,
    port:8000,
    proxy: {
      "/api": "http://localhost:3000"
    }
  }
};