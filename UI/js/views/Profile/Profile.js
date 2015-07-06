define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/Profile/Profile.tpl'
], function($, _, Backbone,homeTemplate){

  var HomeView = Backbone.View.extend({
    el: $("#contentView"),
	events: {
		    "click div.bhoechie-tab-menu>div.list-group>a" : "changeContent",
		},
	

    render: function(){
      
      //$('.menu li').removeClass('active');
      //$('.menu li a[href="#"]').parent().addClass('active');
      this.$el.html(homeTemplate);

      //var sidebarView = new SidebarView();
      //sidebarView.render();
 
    },
	changeContent: function(oEvent){
		debugger;
		oEvent.preventDefault();
		var $target = $(oEvent.srcElement);
        $target.siblings('a.active').removeClass("active");
        $target.addClass("active");
        var index = $target.index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
			
		}

  });

  return HomeView;
  
});
