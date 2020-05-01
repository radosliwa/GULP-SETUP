// TO DO===> nazwa projektu zamiast 'src' w values
module.exports = {
        pathsDev: {
            src: 'src/**/*',
            srcHTML: 'src/**/*.html',
            srcSCSS: 'src/styles/main.scss',
            srcCssVendors: 'src/styles/vendors/vendors.css',
            srcJS: 'src/js/main/*.js',
            srcJSVendors: 'src/js/vendors/*.js',

            temp: 'temp',
            tempHTML: 'temp/index.html',
            tempCSS: 'temp/styles',
            tempCssVendors: 'temp/styles/vendors',
            tempJS: 'temp/js',
            tempJSVendors: 'temp/js/vendors',
            // w kontekscie html w temp bedzie pobierał vendory juz przeniesione z src 

        },
        pathsBuild: {
            dist: 'dist',
            distHTML: 'dist/index.html',
            distCSS: 'dist/**/*.css',
            distJS: 'dist/**/*.js'
        }

    }
    // exports.pathsDev = pathsDev;