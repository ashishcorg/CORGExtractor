define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/Ticket/CreateTicket.tpl',
  'quill',
  'models/Ticket/CreateTicket'
], function($, _, Backbone, ticketTemplate, quill,createTicketModel){

  var createticket = Backbone.View.extend({
    el: $("#contentView"),
	events: {
		    "focus .custom-form-control" : "showMessage",
			"blur .custom-form-control" : "hideMessage",
			"click #draft-ticket" : "setDraft",
			"click #save-ticket" : "sendTicket"
		},
	initialize: function(){
		debugger;
		this.model = new createTicketModel();
	},
    render: function(){		
			debugger;
			this.$el.empty();
			this.$el.html(ticketTemplate);
			var _this=this;
			require(['quill'], function (Quill) {
				_this.editor = new Quill('#editor-container', {
					modules: {
					  'toolbar': { container: '#formatting-container' },
					  'link-tooltip': true,
					  'image-tooltip': true
					},
				  });
				  
			});
    },
	showMessage:function(oEvent){
		var target = oEvent.srcElement;
		target.parentElement.children[0].style.visibility="visible"
		target.parentElement.children[2].style.visibility="visible"
	},
	hideMessage:function(oEvent){
		var target = oEvent.srcElement;
		if(target.value===null||target.value==="")
		target.parentElement.children[0].style.visibility="hidden"
		target.parentElement.children[2].style.visibility="hidden"
	},
	setDraft:function(){
		this.model.set("status","Draft");
		this.sendTicket();
	},
	sendTicket:function(){
		debugger;
		var data = {
			subject : $('#subject').val(),
			priority : $('#priority').val(),
			priorityhistory: [],
			component : $('#component').val(),
			componenthistory: [],
			status: this.model.get("status"),
			statushistory:[],
			conversation:[{
			user: {
				name: document.response.userName,
				profilepic: document.response.profilepic
			},
			time: Date(),
			type: "Problem Description",
			conversation: this.editor.getHTML(),
			}]
		};
		this.model.set(data);
		this.model.save();
	}
  });
  return createticket;
});
