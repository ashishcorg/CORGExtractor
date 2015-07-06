define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var createTicketModel = Backbone.Model.extend({
	urlRoot: '/ticket',
  	defaults : {
  		subject : '',
  		priority : '',
  		component : '',
		status: 'New',
		conversation:[]
  	}

  });

  return createTicketModel;

});
