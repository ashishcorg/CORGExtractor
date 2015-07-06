define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/inbox/inbox.tpl'
], function($, _, Backbone, homeTemplate){

  var HomeView = Backbone.View.extend({
    el: $("#contentView"),
	events: {
		    "click .crisp-panel-heading" : "showMessage",
		},
    render: function(){
      this.$el.html(homeTemplate);
		},
	destroy: function(){
			this.$el.empty();
			this.undelegateEvents();
			//this.stopListening();
		},
	showMessage: function(oEvent){
			//e.preventDefault();
			//$("#menu").toggleClass("show");
			//this.parentElement.children[0].style.visibility="hidden"
			//this.parentElement.children[2].style.visibility="hidden"
			debugger;
			
			var $target = $(oEvent.srcElement);
			if($target.hasClass('panel-title'))
				$target = $target.parent();
			if($target.next().hasClass("in")){
				$target.next().removeClass("in");
				$target.parents('.panel').addClass('crisp-panel-margin');
				$target.parents('.panel').removeClass('expaned-panel');
			}
			else{
				$target.parents('.panel-group').find('.panel').removeClass('expaned-panel');
				$target.parents('.panel-group').find('.panel').addClass('crisp-panel-margin');
				$target.parents('.panel-group').find('.panel-collapse').removeClass('in');
				$target.next().addClass("in");
				$target.parents('.panel').removeClass('crisp-panel-margin');
				$target.parents('.panel').addClass('expaned-panel');
			}
			
		}

  });

  return HomeView;
  
});
