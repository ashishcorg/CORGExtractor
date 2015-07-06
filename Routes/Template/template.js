var mongo = require('mongodb'),
	bcrypt=  require('bcryptjs');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('CORG', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'CORG' templates");
        db.collection('templates', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'templates' collection doesn't exist. Creating it with sample data...");
                populateTemplateDB();
            }
        });
    }
});

exports.createTemplate = function(req, res) {
	db.collection('templates', function(err, collection) {
        collection.insert(req.body, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred' });
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
exports.getTemplate = function(req, res) {
	db.collection('templates', function(err, collection) {
        collection.find({$or:[{user:"Global",type:req.query.type},{user:req.user._id,type:req.query.type}]}).toArray(function(err, items) {
            res.send(items);
        });
    });
}
var populateTemplateDB = function() {
 
	var templates = {
						user: "Global",
						type: "IRT",
						name: "IRT Template",
						message: '<div>Dear Customer,</div><div><br></div><div>This is in regards to the ticket which you have raised. This is to inform you that we have received your ticket and our team have started looking in to the issue. And we will be getting back to you soon with the solution adhering to our SLAs.</div><div><br></div><div>Thanks and Regards</div><div><a href="http://www.CloudTickets.com">CloudTickets</a> Team. </div>'
				   };

    
    db.collection('templates', function(err, collection) {
        collection.insert(templates, {safe:true}, function(err, result) {});
    });
 
};