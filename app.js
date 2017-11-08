var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 5000;
var nav = [
    {Link: '/Books', Text: 'Book'},
    {Link: '/Authors', Text: 'Author'}
];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(session({
        secret: 'library',
        resave: true,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            secure: false // for http and true for https
        }
    }));
require('./src/config/passport')(app);

app.set('views', './src/views');

//app.set('view engine', 'jade');

/*var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({extname: '.hbs'}));
app.set('view engine', '.hbs');*/

app.set('view engine', 'ejs');

app.use('/Books', bookRouter);

app.use('/Admin', adminRouter);

app.use('/Auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    });
});

app.get('/books', function (req, res) {
    res.send('Hello Books!');
});

app.listen(port, function (err) {
    console.log(' running server on port ' + port);
});