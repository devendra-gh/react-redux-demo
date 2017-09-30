process.env.NODE_ENV = 'test';

require('babel-register')();

require.extensions['.scss'] = function () {return null;};
require.extensions['.css'] = function () {return null;};
require.extensions['.png'] = function () {return null;};
require.extensions['.jpg'] = function () {return null;};
require.extensions['.svg'] = function () {return null;};

let jsdom = require('jsdom').jsdom;

let exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom({
  html:'<!doctype html><head></head><body></body></html>',
  scripts: [
    'http//hub.loginradius.com/include/js/LoginRadius.js',
  ],
});
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};
