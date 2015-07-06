// Filename: app.js
define(['jquery', 'underscore', 'backbone','router'],
 function($, _, Backbone, Router){
  var mousein = true; 
  var initialize = function(){
		debugger;
		//var _this=this;
		require(['jquery', 'bootstrap'], function($){
			$('[data-toggle="tooltip"]').tooltip();
		});
		$("#showmenu").click(function(e){
			e.preventDefault();
			$("#menu").toggleClass("show");
		});
		
		$("#contentView").click(function(e){
			debugger;
			$("#menu").removeClass("show");			
		});
		
		var _this=this;
		var usermodel = Backbone.Model.extend({
				url: 'ping',
				initialize: function(){
					this.fetch({
						success: this.fetchSuccess,
						error: this.fetchError
					});
				},
				fetchSuccess: function (collection, response) {
					//console.log('Collection fetch success', response);
					//console.log('Collection models: ', collection.models);
					//_this.setUI(response);
					document.getElementById("profilepic").src= response.profilepic;
					document.response=response;
				},

				fetchError: function (collection, response) {
					throw new Error("Books fetch error");
				}
			});
		this.tickets = new usermodel();
		
		
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  };


  return { 
    initialize: initialize
  };
});
