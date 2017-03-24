var express = require ('express');
var passport = require ('passport');
var session = require ('express-session');
var mongoose = require ('mongoose');
var bodyparser = require ('body-parser');



var port = process.env.PORT || 8080;

var routes = require('./routes/app')(passport);

var configPassport = require ('./configs/passport');

mongoose.promise = global.promise;


mongoose.connect('mongodb://localhost/authdemo');

configPassport(passport);

var app = express();

app.use(session({secret: 'menager of monkeys', resave: false, saveUninitialized: false}));
 app.use(bodyparser.json());

app.use (passport.initialize());
 app.use(passport.session());

app.use('/assets', express.static(process.cwd()+ '/assets'));
app.use('/', routes);




app.listen(port, function (req, res) {
  console.log('Server is runnig on' + port + '....');
});
