var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var app = express();
function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib());
}
app.set('views', __dirname + '/client/views');
app.set('view engine', 'jade');
app.use(stylus.middleware({ src: __dirname + '/client/public/css',
    compile: compile
}));
app.use(express.static(__dirname + '/client/public'));
app.get('/', function (req, res) {
    res.render('index', { title: 'Home' });
});
app.listen(3000);
console.log('Server started...');
