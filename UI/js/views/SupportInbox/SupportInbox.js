define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/inbox/InitialResponse.tpl',
  'text!templates/inbox/InProcess.tpl',
  'text!templates/inbox/ReadOnly.tpl',
  'text!templates/RTE/IRT.tpl',
  'text!templates/RTE/InProcess.tpl'
], function($, _, Backbone, homeTemplate,InProcessTemplate,ReadOnly,RTE,RTEInProcess){

  var HomeView = Backbone.View.extend({
    el: $("#contentView"),
	events: {
		    "click .crisp-panel-heading" : "showMessage",
			"click .viewticket" : "viewTicket",
			"click .meetirt" : "meetIRT",
			"click .cancelirt": "cancelIRT",
			"click .template": "insertTemplate",
			"click .sendirt": "sendIRT",
			"click .reply": "showReply",
			"click .sendreply": "sendReply",
			"click .sendreplyclose": "sendReplyClose",
			"click .sendinfo": "sendInfo",
			"click .sendmemo": "sendMemo",
			"click .sendcall": "sendCall"
		},
	initialize: function(){
		debugger;
		var _this=this;
		var ticketList = Backbone.Collection.extend({
				url: 'ticket',
				initialize: function(){
					this.fetch({
						success: this.fetchSuccess,
						error: this.fetchError
					});
				},
				fetchSuccess: function (collection, response) {
					console.log('Collection fetch success', response);
					console.log('Collection models: ', collection.models);
					_this.render()
				},

				fetchError: function (collection, response) {
					throw new Error("Books fetch error");
				}
			});
		this.tickets = new ticketList();
		var templateList = Backbone.Collection.extend({
				url: 'template?type=IRT',
				initialize: function(){
					this.fetch({
						success: this.fetchSuccess,
						error: this.fetchError
					});
				},
				fetchSuccess: function (collection, response) {
				},

				fetchError: function (collection, response) {
					throw new Error("Books fetch error");
				}
			});
		this.templates = new templateList();
		
		
	},
    render: function(){
		debugger;
		var data = {
			tickets: this.tickets.where({status:"New"})
		  };
		var compiledTemplate = _.template(homeTemplate, data);
		
		data = {
			tickets: this.tickets.where({status:"In Process"})
		  };
		compiledTemplate += _.template(InProcessTemplate, data);
		data = {
			tickets: this.tickets.where({status:"Customer Action"}),
			id:0
		  };
		compiledTemplate += _.template(ReadOnly, data);
		data = {
			tickets: this.tickets.where({status:"Closed"}),
			id:1
		  };
		compiledTemplate += _.template(ReadOnly, data);
		this.$el.html(compiledTemplate);
		require(['jquery', 'bootstrap'], function($){
			$('[data-toggle="tooltip"]').tooltip();
		});
	},
	showMessage: function(oEvent){
			debugger;
			
			var $target = $(oEvent.srcElement);
			if($target.parents('.panel').find('.panel-collapse').hasClass("in")){
				$target.parents('.panel').find('.panel-collapse').removeClass("in");
				$target.parents('.panel').addClass('crisp-panel-margin');
				$target.parents('.panel').removeClass('expaned-panel');
			}
			else{
				$target.parents('.panel-group').find('.panel').removeClass('expaned-panel');
				$target.parents('.panel-group').find('.panel').addClass('crisp-panel-margin');
				$target.parents('.panel-group').find('.panel-collapse').removeClass('in');
				$target.parents('.panel').find('.panel-collapse').addClass("in");
				$target.parents('.panel').removeClass('crisp-panel-margin');
				$target.parents('.panel').addClass('expaned-panel');
			}
			
		},
	viewTicket: function(oEvent){
		debugger;
		oEvent.preventDefault();
		var id = $(oEvent.srcElement.parentElement).attr("href");
	},
	meetIRT: function(oEvent){
		debugger;
		var _this = this;
		oEvent.preventDefault();
		var $target = $(oEvent.srcElement.parentElement);
		var id = $target.attr("href");
		$target.parents(".panel-footer").removeClass('in').addClass('collapse');
		$target.parents(".panel-footer").next().removeClass('collapse').addClass('in');
		var data = {
			templates: this.templates.models,
			id: id
		  };
		var compiledTemplate = _.template(RTE, data);
		$target.parents(".panel-footer").next().html(compiledTemplate);
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
	cancelIRT: function(oEvent){
		debugger;
		$(oEvent.srcElement).parents(".panel").find(".panel-footer").addClass("in");
		$(oEvent.srcElement).parents(".panel-footer-ext").addClass("collapse").removeClass("in");
	},
	insertTemplate: function(oEvent){
		debugger;
		oEvent.preventDefault();
		var $target = $(oEvent.srcElement);
		var id = $target.attr("href");
		var templateMessage = this.templates.where({_id:id})[0].get('message');
		//$target.parents("#content-container").find("#editor-container").html(templateMessage);
		this.editor.setHTML(templateMessage);
	},
	sendIRT: function(oEvent){
		debugger;
		oEvent.preventDefault();
		var $target = $(oEvent.srcElement);
		var id = $target.attr("href");
		var ticket = this.tickets.where({_id:id})[0].toJSON();
		ticket.conversation.push({
			user: {
				name: document.response.userName,
				profilepic: document.response.profilepic
			},
			time: Date(),
			type: "Info to customer",
			conversation: this.editor.getHTML(),
			read: ""
		});
		ticket.statushistory.push({
			status:ticket.status,
			user: {
				name: document.response.userName,
				profilepic: document.response.profilepic
			},
			time: Date(),
		});
		ticket.status="In Process";
		
		$.ajax({
			url: "/ticket",
			type: "PUT",
			data: ticket,
			error: function(jqXHR,status,err){},
			success: function(data,status,jqXHR){}
		});
		
	},
	showReply: function(oEvent){
		debugger;
		var _this = this;
		oEvent.preventDefault();
		var $target = $(oEvent.srcElement.parentElement);
		var id = $target.attr("href");
		$target.parents(".panel-footer").removeClass('in').addClass('collapse');
		$target.parents(".panel-footer").next().removeClass('collapse').addClass('in');
		var data = {
			templates: this.templates.models,
			id: id
		  };
		var compiledTemplate = _.template(RTEInProcess, data);
		$target.parents(".panel-footer").next().html(compiledTemplate);
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
	sendReply: function(oEvent){
		debugger;
		oEvent.preventDefault();
		var $target = $(oEvent.srcElement);
		var id = $target.attr("href");
		var ticket = this.tickets.where({_id:id})[0].toJSON();
		ticket.conversation.push({
			user: {
				id: document.response._id,
				name: document.response.userName,
				profilepic: document.response.profilepic
			},
			time: Date(),
			type: "Reply",
			conversation: this.editor.getHTML(),
		});
		ticket.statushistory.push({
			status:ticket.status,
			user: {
				id: document.response._id,
				name: document.response.userName,
				profilepic: document.response.profilepic
			},
			time: Date(),
		});
		ticket.status="Customer Action";
		
		$.ajax({
			url: "/ticket",
			type: "PUT",
			data: ticket,
			error: function(jqXHR,status,err){},
			success: function(data,status,jqXHR){}
		});
		
	},
	sendReplyClose: function(oEvent){
		debugger;
		oEvent.preventDefault();
		var $target = $(oEvent.srcElement);
		var id = $target.attr("href");
		var ticket = this.tickets.where({_id:id})[0].toJSON();
		ticket.conversation.push({
			user: {
				id: document.response._id,
				name: document.response.userName,
				profilepic: document.response.profilepic
			},
			time: Date(),
			type: "Reply",
			conversation: this.editor.getHTML(),
		});
		ticket.statushistory.push({
			status:ticket.status,
			user: {
				id: document.response._id,
				name: document.response.userName,
				profilepic: document.response.profilepic
			},
			time: Date(),
		});
		ticket.status="Closed";
		
		$.ajax({
			url: "/ticket",
			type: "PUT",
			data: ticket,
			error: function(jqXHR,status,err){},
			success: function(data,status,jqXHR){}
		});
		
	},
	sendInfo: function(oEvent){
		debugger;
		oEvent.preventDefault();
		var $target = $(oEvent.srcElement);
		var id = $target.attr("href");
		var ticket = this.tickets.where({_id:id})[0].toJSON();
		ticket.conversation.push({
			user: {
				id: document.response._id,
				name: document.response.userName,
				profilepic: document.response.profilepic
			},
			time: Date(),
			type: "Info to customer",
			conversation: this.editor.getHTML(),
			read: ""
		});
		
		//ticket.status="Customer Action";
		
		$.ajax({
			url: "/ticket",
			type: "PUT",
			data: ticket,
			error: function(jqXHR,status,err){},
			success: function(data,status,jqXHR){}
		});
		
	},
	sendMemo: function(oEvent){
		debugger;
		oEvent.preventDefault();
		var $target = $(oEvent.srcElement);
		var id = $target.attr("href");
		var ticket = this.tickets.where({_id:id})[0].toJSON();
		ticket.conversation.push({
			user: {
				id: document.response._id,
				name: document.response.userName,
				profilepic: document.response.profilepic
			},
			time: Date(),
			type: "Internal Memo",
			conversation: this.editor.getHTML(),
			read: ""
		});
		
		//ticket.status="Customer Action";
		
		$.ajax({
			url: "/ticket",
			type: "PUT",
			data: ticket,
			error: function(jqXHR,status,err){},
			success: function(data,status,jqXHR){}
		});
		
	},
	sendCall: function(oEvent){
		debugger;
		oEvent.preventDefault();
		var $target = $(oEvent.srcElement);
		var id = $target.attr("href");
		var ticket = this.tickets.where({_id:id})[0].toJSON();
		ticket.conversation.push({
			user: {
				id: document.response._id,
				name: document.response.userName,
				profilepic: document.response.profilepic
			},
			time: Date(),
			type: "Call to Customer",
			conversation: this.editor.getHTML(),
			read: ""
		});
		
		//ticket.status="Customer Action";
		
		$.ajax({
			url: "/ticket",
			type: "PUT",
			data: ticket,
			error: function(jqXHR,status,err){},
			success: function(data,status,jqXHR){}
		});
		
	},
  });

  return HomeView;
  
});
