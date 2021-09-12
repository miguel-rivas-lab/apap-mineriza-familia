const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const pug = {
  test: /\.(pug|jade)$/,
  exclude: ["/node_modules/"],
  use: [
    "html-loader",
    {
      loader: "pug-html-loader",
      options: {}
    }
  ]
};

const html = {
  test: /\.html$/,
  use: [
    {
      loader: "html-loader",
      options: { minimize: true }
    }
  ]
};

const js = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader"
  }
};

const typescript = {
  test: /\.tsx?$/,
  use: 'ts-loader',
  exclude: /node_modules/,
};

const eslint = {
  test: /\.(ts|tsx)$/,
  enforce: 'pre',
  use: [
    {
      options: {
        eslintPath: require.resolve('eslint'),

      },
      loader: require.resolve('eslint-loader'),
    },
  ],
  exclude: /node_modules/,
};

const sass = {
  test: /\.s[ac]ss$/i,
  use: [
    "style-loader",
    "css-loader",
    "sass-loader",
  ],
};

const imgs = {
  test: /\.(png|jpe?g)$/,
  type: "asset/resource",
};

module.exports = {
  mode: "development",
  module: {
    rules: [
      js,
      typescript,
      eslint,
      pug,
      html,
      sass,
      imgs,
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.pug'),
      inject: true,
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
}