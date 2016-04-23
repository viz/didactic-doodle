import webpack from 'webpack'      // Required to make this work
import path from 'path'            // For working with filesystem paths
import merge from 'webpack-merge'  // Merges configs: http://survivejs.com/webpack/developing-with-webpack/splitting-configuration/
import stylelint from 'stylelint'  // Used to lint CSS

// https://docs.npmjs.com/misc/scripts#current-lifecycle-event
const TARGET = process.env.npm_lifecycle_event

// https://babeljs.io/docs/usage/babelrc/#env-option
process.env.BABEL_ENV = TARGET

// Using `path` allows us to create paths that will work on any OS
// (the path separator will depend on the OS)
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
}

// About the CSS loaders
// The myth-loader converts "future" CSS syntax to current syntax allowing us
// to use the latest CSS features in today's browsers (kind of like babel with JS)
// The css-loader handles the imports, etc. and outputs the full CSS
// The style-loader inserts the CSS into the bundled code

// This is the common configuration
// We'll merge in lifecycle-specific configurations for start and build below
const common = {
  entry: {
    app: PATHS.app  // process the files in this folder and subfolders
  },
  resolve: {
    extensions: [ '', '.js', '.jsx' ]  // process files with these extensions
  },
  output: {
    path: PATHS.build,
    filename: 'app.js'  // bundle the transpiled output into this file in the above folder
  },
  module: {
    preLoaders: [
      {
        test: /\.css$/,           // For files ending in .css
        loaders: [ 'postcss' ],   // run the postcss plugin before running the loaders
        include: PATHS.app        // Look in this path
      },
      {
        test: /\.jsx?$/,          // For files ending in .js or .jsx
        loaders: [ 'eslint' ],    // run the eslint linter before running the loaders
        include: PATHS.app        // Look in this path
      }
    ],
    loaders: [
      {
        test: /\.css$/,                       // For files ending in .css
        loaders: [ 'style', 'css', 'myth' ],  // run these loaders: myth, then css, then style
        include: PATHS.app                    // Look in this path for the files
      },
      {
        test: /\.jsx?$/,                      // For files ending in .js or .jsx
        loaders: [ 'babel?cacheDirectory' ],  // run the babel-loader and cache the output
        include: PATHS.app                    // Look in this path
      }
    ]
  },
  externals: { // See https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md
    'jsdom': 'window',
    'react/lib/ReactContext': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true
  },
  postcss: function () {
    return [stylelint({
      rules: {
        'color-hex-case': 'lower'  // Configure the stylelint linter to demand lowercase hex colors
      }
    })]
  }
}

// The extra configuration for the start script
const startConfig = {
  devtool: 'eval-source-map',  // https://webpack.github.io/docs/configuration.html#devtool
  devServer: {  // these can also be set on the command line
    contentBase: PATHS.build,
    historyApiFallback: true,  // https://webpack.github.io/docs/webpack-dev-server.html#the-historyapifallback-option
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only',
    host: process.env.HOST,
    port: process.env.PORT
  },
  plugins: [
    // https://github.com/webpack/docs/wiki/list-of-plugins#hotmodulereplacementplugin
    new webpack.HotModuleReplacementPlugin()
  ]
}

// The extra configuration for the build script
const buildConfig = {}

// Merge the correct script config with the common config with webpack-merge
const config = (TARGET === 'start' || !TARGET)
  ? merge(common, startConfig)
  : merge(common, buildConfig)

// Export the combined configuration
export default config
