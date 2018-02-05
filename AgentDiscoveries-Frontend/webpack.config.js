var path = require('path');

module.exports = {
    entry: './app/index.js',

    output: {
        path: path.join(__dirname, 'target', 'classes', 'META-INF', 'resources', 'public'),
        filename: 'bundle.js'
    }
};