const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './src/main.ts',
    vendors: ['phaser']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

  // Source maps add a huge amount of data to the build, comment this out when
  // making builds for production. (It is helpful for debugging though, so make
  // sure not to remove it during testing)
  // devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build')
  },

  // Changing the mode can help minimize and speed things up for builds as well
  // as offering warnings regarding production size
  // mode: 'development',
  mode: 'production',

  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    https: true
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'index.html'),
        to: path.resolve(__dirname, 'build')
      },
      {
        from: path.resolve(__dirname, 'assets', '**', '*'),
        to: path.resolve(__dirname, 'build')
      }
    ]),
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    }),
    // Helps shrink size of final build, tells webpack to set an environment
    // variable to "production". Many libraries check this variable and will
    // behave more efficiently as a result.
    new webpack.DefinePlugin({ "process.env": { NODE_ENV: JSON.stringify("production") } }),
  ],

  optimization: {
    // minimizes all our js files and dependencies
    minimize: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};