/*
**************************************************************
Load all the standard dependencies for the project.
**************************************************************
*/
var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    TwitterStrategy = require('passport-twitter').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
	https = require('https'),
	http = require('http'),
	favicon = require('serve-favicon'),
	fs = require('fs'),
	graph = require('fbgraph');
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
var profile = require('./Routes/Users/profile.js'),
	oAuthConfig = require('./Config/oAuth.js'),
	ticket = require('./Routes/Ticket/ticket.js');
	template = require('./Routes/Template/template.js');
    //funct = require('./functions.js');

/*
**************************************************************
Library loading ends
**************************************************************
*/

var app = express();

/*
***************************************************************
Passport
***************************************************************
*/

// Passport session setup.
passport.serializeUser(function(obj, done) {
  console.log("serializing " + obj);
  done(null, obj);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});

// Use the LocalStrategy within Passport to login users with saved cookies.
passport.use('local-cookie-signin', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req,username, password, done) {
	profile.login(req.signedCookies.login,req.signedCookies.loginusing,done);
  }
));

// Use the LocalStrategy within Passport to login users 
passport.use('local-signin', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req,username, password, done) {
    console.log(username);
	var usr  = profile.login(username,password,done);
  }
));

// Use the LocalStrategy within Passport to Register/"signup" users.
passport.use('local-signup', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    console.log(username);
	req.session.success = 'You are successfully logged in ' + username + '!';
	profile.addProfile(username,password);
    done(null, {"user":username});
  }
));

passport.use(new GoogleStrategy({
    clientID: oAuthConfig.googleAuth.clientID,
    clientSecret: oAuthConfig.googleAuth.clientSecret,
    callbackURL: oAuthConfig.googleAuth.callbackURL
  },
  function(accessToken, refreshToken, userprofile, done) {
    profile.findOrCreate(userprofile,done);
  }
));


passport.use(new FacebookStrategy({
    clientID: oAuthConfig.facebookAuth.clientID,
    clientSecret: oAuthConfig.facebookAuth.clientSecret,
    callbackURL: oAuthConfig.facebookAuth.callbackURL,
	profileFields: ['id', 'displayName', 'gender', 'name', 'photos', 'emails']
  },
  function(accessToken, refreshToken, userprofile, done) {
    //User.findOrCreate(..., function(err, user) {
      //if (err) { return done(err); }
	  graph.setAccessToken(accessToken);
      profile.findOrCreate(userprofile,done);
    //});
  }
));

passport.use(new TwitterStrategy({
    consumerKey: oAuthConfig.twitterAuth.consumerKey,
    consumerSecret: oAuthConfig.twitterAuth.consumerSecret,
    callbackURL: oAuthConfig.twitterAuth.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    //User.findOrCreate(..., function(err, user) {
    //  if (err) { return done(err); }
      done(null, profile);
    //});
  }
));


// Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { 
  return next();
  }
  req.session.error = 'Please sign in!';
  res.redirect('login.html?message=Your session has expired, please login again.');
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
// Configure Express
app.use(express.compress());
app.use(express.static(__dirname+"/UI"));
app.use(favicon(__dirname + '/favicon/favicon.ico'));
app.use(express.logger());
app.use(express.cookieParser("supernova"));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'supernova', cookie:{maxAge:60000},rolling: true,resave: true, }));
app.use(passport.initialize());
app.use(passport.session());

// Session-persisted message middleware
app.use(function(req, res, next){
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
});
app.use(app.router);
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
app.get('/isloggedin', function(req, res){
  ensureAuthenticated(req, res,function(){
  res.redirect('/home.html');
  });
});
app.get('/', function(req, res){
  if(req.isAuthenticated())
  return res.redirect('/home.html');
  if(req.signedCookies.login&&req.signedCookies.loginusing){
	var usr  = profile.cookielogin(req.signedCookies.login,req.signedCookies.loginusing,req,res);
	}
  else
	res.redirect('/login.html')
});

app.get('/Ping', function(req, res){
  res.send(req.user);
});




app.post('/signup', passport.authenticate('local-signup', { 
  successRedirect: '/home.html',
  failureRedirect: '/'
  })
);




//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
app.post('/login', passport.authenticate('local-signin', {failureRedirect: '/login.html?message=Invalid Username or Password'}),
	function(req, res) {
	if(req.body.cook==='yes'){
		res.cookie('login', req.body.username, { maxAge: 900000000000000,signed: true});
		res.cookie('loginusing', req.body.password, { maxAge: 900000000000000,signed: true});
	}
	else{
		res.clearCookie('login');
		res.clearCookie('loginusing');
	}
    // Successful authentication, redirect home.
    res.redirect('/home.html');
  });

app.get('/auth/google',passport.authenticate('google',{ scope : ['profile', 'email'] }));

app.get('/auth/google/oauth2callback', 
  passport.authenticate('google', { failureRedirect: '?message=Cannot Login with Google.' }),
  function(req, res) {
    // Successful authentication, redirect home.
		res.redirect('/home.html');
  });

  // Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook',{ scope: [ 'email' ] }));

// test function for FB feeds
app.get('/test', function(req,res){
	var options = {
		timeout:  3000
	  , pool:     { maxSockets:  Infinity }
	  , headers:  { connection:  "keep-alive" }
	};
	// 102988293558
	graph
	  .setOptions(options)
	  .get("/102988293558", function(err, response) {
		console.log(response); // { id: '4', name: 'Mark Zuckerberg'... }
		res.send(response)
	  });
});

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/home.html',
                                      failureRedirect: '?message=Cannot Login with Facebook.' }));
									  
// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
app.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { successRedirect: '/home.html',
                                     failureRedirect: '/login.html?message=Cannot Login with Twitter.' }));


//logs user out of site, deleting them from the session, and returns to homepage
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login.html?message=You have been logged out.');
});


/*
**************************************************************
TIcket Management routings starts
**************************************************************
*/
app.post('/ticket', ticket.createTicket);
app.get('/ticket', ticket.getTicket);
app.put('/ticket', ticket.updateTicket);

/*
**************************************************************
TIcket Management routings ends
**************************************************************
*/

/*
**************************************************************
Template Management routings 
**************************************************************
*/
app.post('/template', template.createTemplate);
app.get('/template', template.getTemplate);

/*
**************************************************************
Template Management routings 
**************************************************************
*/




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