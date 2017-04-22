/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            'app': 'assets/app', // 'dist',
            'rxjs':                       'assets/node_modules/rxjs',
            'angular2-in-memory-web-api': 'assets/node_modules/angular2-in-memory-web-api',
            '@angular':                   'assets/node_modules/@angular',
            'primeng':                    'assets/node_modules/primeng',


            // angular bundles
            '@angular/core': 'assets/node_modules/@angular/core/bundles/core.umd.js',
            '@angular/common': 'assets/node_modules/@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'assets/node_modules/@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'assets/node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/animations/browser': 'assets/node_modules/@angular/animations/bundles/animations-browser.umd.js',
            '@angular/platform-browser-dynamic': 'assets/node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'assets/node_modules/@angular/http/bundles/http.umd.js',
            '@angular/router': 'assets/node_modules/@angular/router/bundles/router.umd.js',
            '@angular/router/upgrade': 'assets/node_modules/@angular/router/bundles/router-upgrade.umd.js',
            '@angular/forms': 'assets/node_modules/@angular/forms/bundles/forms.umd.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            'app': {main: 'main.js', defaultExtension: 'js'},
            'rxjs': {defaultExtension: 'js'},
            'angular2-in-memory-web-api': {defaultExtension: 'js'},
            'primeng': {defaultExtension: 'js'}
        },

        packageNames: [
            '@angular/common',
            '@angular/compiler',
            '@angular/core',
            '@angular/http',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/router',
            '@angular/testing',
            '@angular/upgrade',
            '@angular/forms'
        ]


    });
})(this);
