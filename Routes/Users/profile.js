var mongo = require('mongodb'),
	bcrypt=  require('bcryptjs');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('CORG', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'CORG' profile");
        db.collection('profiles', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'profiles' collection doesn't exist. Creating it with sample data...");
                populateProfileDB();
            }
        });
    }
});
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving profile: ' + id);
    db.collection('profiles', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findByUser = function(req, res) {
    var user = req.params.userName;
	debugger;
    console.log('Retrieving profile data for user: ' + user);
    db.collection('profiles', function(err, collection) {
        collection.findOne({'userName': user}, function(err, item) {
            res.send(item);
        });
    });
};

exports.login = function(username, password,done) {
    console.log('Retrieving profile data for user: ' + username);
    db.collection('profiles', function(err, collection) {
		//password=bcrypt.hashSync(password, 8);
        collection.findOne({'email': username}, function(err, item) {
		if(item){
			if(bcrypt.compareSync(password, item.password))
            done(null, item);
			else
			done(null,false);
		}
		else
			done(null,false);
        });
    });
};

exports.cookielogin = function(username, password,req,res) {
    console.log('Retrieving profile data for user: ' + username);
    db.collection('profiles', function(err, collection) {
		//password=bcrypt.hashSync(password, 8);
        collection.findOne({'email': username}, function(err, item) {
				req.login(item, function(err) {
						if (err) { res.redirect('login.html'); }
						return res.redirect('home.html');
					});	
			});
    });
};

var parseProfile = function(userprofile){
	switch (userprofile.provider){
		case 'google':
			return profile = {
					userid  : userprofile._json.id,
					firstname:userprofile._json.given_name,
					lastname:userprofile._json.family_name,
					userName : userprofile._json.name,
					locale: userprofile._json.locale,
					gender: userprofile._json.gender,
					profilepic   : userprofile._json.picture,
					password: bcrypt.hashSync(userprofile._json.id, 8),
					roles: [],
					email: [userprofile._json.email],
					comtact: [],
					provider: userprofile.provider,
				   };
			break;
		case 'facebook':
			return profile = {
					userid  : userprofile._json.id,
					firstname:userprofile._json.givenName,
					lastname:userprofile._json.familyName,
					userName : userprofile._json.name,
					locale: "",
					gender: userprofile._json.gender,
					profilepic   : userprofile.photos[0].value,
					password: bcrypt.hashSync(userprofile._json.id, 8),
					roles: [],
					email: [userprofile._json.email],
					comtact: [],
					provider: userprofile.provider,
				   };
			break;
	}
};
exports.findOrCreate = function(profile,done){
	db.collection('profiles', function(err, collection) {
        collection.findOne({'userid': profile.id,'provider':profile.provider}, function(err, item) {
				if(item)
					done(null,item)
				else{
					profile = parseProfile(profile);
					db.collection('profiles', function(err, collection) {
						collection.insert(profile, {safe:true}, function(err, result) {
							if (err) {
								//res.send({'error':'An error has occurred' });
							} 
							else {
								done(null,result[0]);
							}
						});
					});
				}
			});
    });
};
exports.findAll = function(req, res) {
    db.collection('profiles', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};


 
exports.addProfile = function(username, password) {
    var profile = {
					userid  : username,
					userName : "",
					profilepic   : "",
					password: bcrypt.hashSync(password, 8),
					profilepic: "tetskjkjdk",
					roles: [],
					email: [username],
					comtact: []
				   };
    console.log('Adding profile: ' + JSON.stringify(profile));
    db.collection('profiles', function(err, collection) {
        collection.insert(profile, {safe:true}, function(err, result) {
            if (err) {
                //res.send({'error':'An error has occurred' });
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                //res.send(result[0]);
            }
        });
    });
	//return 0;
}
 
exports.updateProfile = function(req, res) {
    var id = req.params.id;
    var profile = req.body;
    console.log('Updating profile: ' + id);
    console.log(JSON.stringify(profile));
    db.collection('Profiles', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, profile, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating profile: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(profile);
            }
        });
    });
}
 
exports.deleteProfile = function(req, res) {
    var id = req.params.id;
    console.log('Deleting profile: ' + id);
    db.collection('profiles', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

var populateProfileDB = function() {
 
	var profiles = {
					userid  : "test",
					userName : "AA",
					profilepic   : "!",
					password: "Testingtheawesome",
					profilepic: "tetskjkjdk",
					roles: ["processor","Analytics","customer"],
					email: ["ashishanand2918@gmail.com"],
					comtact: [7829748735]
				   };

    
    db.collection('profiles', function(err, collection) {
        collection.insert(profiles, {safe:true}, function(err, result) {});
    });
 
};