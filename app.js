var express = require('express');
var cors = require('cors');
var app = express();
var db = require('./config/dbConnection');
var redis = require('./config/redis')
//var morgan  = require('morgan');
//var winston = require('./config/winston');
var path = require('path');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var passportSetUp = require('./config/passport-setup')
var socialRoutes = require('./routes/user/social')
var register = require('./routes/user/register');
var login = require('./routes/user/login');
//var logout = require('./routes/uslogout');
var admin = require('./routes/admin/admin');
var playerstat = require('./routes/stats/playerStats');
var videostat = require('./routes/stats/videoStats');
var videocron = require('./cronjob/videoUpdate')
var shop = require('./routes/shop/shop')
var socket = require('socket.io');
var chat = require('./routes/chat/chat');
var profile = require('./routes/user/profile') 


// Passport init
app.use(passport.initialize());
app.use(passport.session());

// body-parser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(morgan('dev'));

// For Cros
app.use(cors());

//Routers
app.use('/register', register);
app.use('/login', login);
app.use('/admin', admin);
app.use('/players', playerstat);
app.use('/google', socialRoutes);
app.use('/videos', videostat)
app.use('/shop', shop)
app.use('/chat',chat);
app.use('/user',profile);
//app.use('/cron',cron);

//app.use(morgan('combined', { stream: winston.stream }));

var server = app.listen(3000, function () {
    console.log('Port running at 3000');
});
server;

//socket setup
var io = socket(server);

io.on('connection', function (socket) {
    console.log('made socket connection');

    socket.on('chat', function (data) {
        console.log('data rx', data)
        io.sockets.emit('chat', data)
    });

    socket.on('join', function (data) {
        socket.join(data.email)
    });

});


module.exports = server;