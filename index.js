const CandyJs = require('candyjs');
const Candy = require('candyjs/Candy');
const App = require('candyjs/web/Application');
const R = require('candyjs/midwares/Resource');
const Hook = require('candyjs/core/Hook');

Candy.setPathAlias('@template', __dirname + '/node_modules');
Hook.addHook(R.serve(__dirname + '/public', {
    mime: {
        'ttf': 'font/ttf',
        'woff': 'font/woff'
    }
}));

new CandyJs(new App({
    'id': 1,
    'debug': true,
    'appPath': __dirname + '/app',
    'defaultView': 'template/@candyjs/template-hbs/index',

})).listen(2333, () => {
    console.log('listen on 2333');
});
