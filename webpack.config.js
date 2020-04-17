const path = require('path');
const config = {
    mode: "production",
    devtool: "cheap-module-source-map",
    entry: {
        vendors: './src/js/vendors/vendors.js',
        main: './src/js/main/main.js',

    },
    output: {
        path: path.resolve(__dirname, './temp/js'),
        filename: '[name].js',
    },
};
module.exports = config;