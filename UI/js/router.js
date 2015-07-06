// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/inbox/HomeView',
  'views/Profile/Profile',
  'views/Ticket/CreateTicket',
  'views/footer/FooterView',
  'views/SupportInbox/SupportInbox'
], function($, _, Backbone, HomeView, ProfileView, CreateTicket, FooterView,SupportInboxView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'Profile': 'Profile',
      'createticket': 'createticket',
      'supportInbox' : 'supportInbox',
      // Default
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){
	currentview = new ProfileView();
    var app_router = new AppRouter;
    
    app_router.on('route:Profile', function(){
		debugger;
		currentview.undelegateEvents();
        currentview = new ProfileView();
		currentview.render(); 
    });
	
    app_router.on('route:createticket', function () {
		debugger;
		currentview.undelegateEvents();
		currentview = new CreateTicket();
		currentview.render();        
    });

    app_router.on('route:defaultAction', function (actions) {
		debugger;
		currentview.undelegateEvents();
        currentview = new HomeView();
        currentview.render();
    });
	
	app_router.on('route:supportInbox', function (actions) {
		debugger;
		currentview.undelegateEvents();
        currentview = new SupportInboxView();
        //currentview.render();
    });

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
