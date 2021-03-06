var path = require("path")
var webpack = require("webpack")

// Env vars from .env file loaded into process.env
var dotenv = require('dotenv')
dotenv.config()

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      PORT: JSON.stringify(process.env.PORT || 8080),
      PUBLIC_PORT: JSON.stringify(process.env.PUBLIC_PORT || 8080),
      DIR: JSON.stringify(process.env.DIR || ''),
      INTERVAL: JSON.stringify(process.env.INTERVAL || 1500)
    }
  })
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }))
}

module.exports = {
  entry: {
    host: './src/host.js',
    client: './src/client.js'
  },
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    publicPath: '/dist/',
    filename: '[name].bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    inline: true,
    hot: true,
    // stats: 'errors-only',
    contentBase: './public',
    publicPath: '/dist/',
    filename: '[name].bundle.js'
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.frag$|\.vert$/,
        use: 'raw-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
}
