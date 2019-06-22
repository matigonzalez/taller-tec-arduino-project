const { join } = require('path');
exports.ASSETS_FOLDER = '/assets';
exports.WEBSITE_PATH = join(__dirname, '../website');
exports.ARDUINO_PATH = join(__dirname, '../arduino');
exports.NODE_MODULES_PATH = join(__dirname, '../../node_modules');
exports.ASSETS_PATH = join(exports.WEBSITE_PATH, exports.ASSETS_FOLDER);
exports.ASSETS_JS_FOLDER = join(exports.ASSETS_FOLDER, 'js');