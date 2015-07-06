/*
**************************************************************
Load all the standard dependencies for the project.
**************************************************************
*/
var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    TwitterStrategy = require('passport-twitter'),
    GoolgeStrategy = require('passport-google'),
    FacebookStrategy = require('passport-facebook'),
	https = require('https'),
	http = require('http'),
	favicon = require('serve-favicon'),
	fs = require('fs'),
	FBgraph = require('fbgraph');
    
/*
**************************************************************
Standard dependencies loading ends.
**************************************************************
*/


/*
**************************************************************
Load all the Libraries for the project.
**************************************************************
*/
//var config = require('./config.js'), 
    //funct = require('./functions.js');

/*
**************************************************************
Library loading ends
**************************************************************
*/

/*
***************************************************************
Passport
***************************************************************
*/
//===============PASSPORT=================

// Passport session setup.
passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});

// Use the LocalStrategy within Passport to login users.
passport.use('local', new LocalStrategy(
  
  function(req, username, password, done) {
  console.log(username);
      if(username=="Ashish")
		return done(null, {"username":username});
	  return done(null, false);
    }
));

// Use the LocalStrategy within Passport to Register/"signup" users.
/*passport.use('local-signup', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    funct.localReg(username, password)
    .then(function (user) {
      if (user) {
        console.log("REGISTERED: " + user.username);
        req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT REGISTER");
        req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));*/

// Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.error = 'Please sign in!';
  res.redirect('/signin');
}


/*
***************************************************************
Passport Ends
***************************************************************
*/

/*
**************************************************************
Create and configure the app
**************************************************************
*/
var app = express();
app.use(express.static(__dirname+"/UI"));
app.use(favicon(__dirname + '/favicon/favicon.ico'));
//app.use(express.logger());
//app.use(express.cookieParser());
//app.use(express.bodyParser());
//app.use(express.methodOverride());
//app.use(express.session({ secret: 'supernova' }));
app.use(passport.initialize());
app.use(passport.session());

// Session-persisted message middleware
/*app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});*/

//app.use(app.router);
 

/*
**************************************************************
app ends
**************************************************************
*/


/*
**************************************************************
Mapping for rest Services
**************************************************************
*/

//sends the request through our local login/signin strategy,
// and if successful takes user to homepage,
// otherwise returns then to signin page
app.post('/login', passport.authenticate('local', { 
  successRedirect: '/abcd',
  failureRedirect: '/signin'
  })
);


app.get('/SevenWonders', function(req, res){
var items = [{name:'Giza Necropolis',location:'Giza, Egypt'},
			{name:'Great Wall of China',location:'China'},
			{name:'Petra',location:'Ma\'an Governorate, Jordan'},
			{name:'Colosseum',location:'Rome, Italy'},
			{name:'Chichen Itza',location:'Yucatán, Mexico'},
			{name:'Machu Picchu',location:'Cuzco, Peru'},
			{name:'Taj Mahal',location:'Agra, Uttar Pradesh, India'},
			{name:'Christ the Redeemer',location:'Rio de Janeiro, Brazil'}];
res.send(items);
});

/*
**************************************************************
Mapping for rest Services Ends
**************************************************************
*/

/*
**************************************************************
create a HTTPS Server
**************************************************************
*/
var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(8000);
console.log('Listening on port 8000');

/*
**************************************************************
HTTPS Server ends
**************************************************************
*/


/*
**************************************************************
create a HTTP Server
**************************************************************
*/
http.createServer(app).listen(8080);
console.log('Listening on port 8080');
/*
**************************************************************
HTTP Server ends
**************************************************************
*/