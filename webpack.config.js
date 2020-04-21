const path = require('path');
const babel = {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          }
        ] 
}
const config = {
    mode: "production",
    devtool: "cheap-module-source-map",
    entry: {
        main: './src/js/main/main.js',
    },
    module:babel,
    resolve: {
        extensions: ['*', '.js']
      },
    output: {
        path: path.resolve(__dirname, './temp/js'),
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
};
const configVendors = {
    mode: "production",
    devtool: "cheap-module-source-map",
    entry: {
        vendors: './src/js/vendors/vendors.js',
    },
    module:babel,
    resolve: {
        extensions: ['*', '.js']
      },
    output: {
        path: path.resolve(__dirname, './temp/js/vendors'),
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
  
};
exports.configVendors = configVendors;
exports.config = config;
