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
        db.collection('tickets', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'tickets' collection doesn't exist. Creating it with sample data...");
                populateticketDB();
            }
        });
    }
});
 
var getAllForUser={"conversation":{$elemMatch:{type:"Problem Description"}}};






 
exports.getTicket = function(req, res) {
    db.collection('tickets', function(err, collection) {
        collection.find(getAllForUser).toArray(function(err, items) {
            res.send(items);
        });
    });
}; 
exports.createTicket = function(req, res) {
    //console.log('Adding profile: ' + JSON.stringify(profile));
    db.collection('tickets', function(err, collection) {
        collection.insert(req.body, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred' });
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });	
};
exports.updateTicket = function(req, res) {
	var id = req.body._id;
	var data = req.body;
	delete data._id;
	db.collection('tickets', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, data, {safe:true}, function(err, result) {
            if (err) {
				res.status(400).send(err);
                
            } else {
                res.send(result);
            }
        });
    });
};
 
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

var populateticketDB = function() {
 
	var ticket = {
					subject : '',
					priority : '',
					component : '',
					status: 'New',
					conversation:[]
				};

    
    db.collection('tickets', function(err, collection) {
        collection.insert(ticket, {safe:true}, function(err, result) {});
    });
 
};