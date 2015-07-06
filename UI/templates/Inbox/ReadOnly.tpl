<%var heading = ["Customer Action","Closed: Waiting for approval","M","L","I"];  var colorclass = ["primary","success","M","L","I"];%>
<span class="label label-<%=colorclass[id]%> crisp-span"><%=heading[id]%></span>
<div class="panel-group panel-group-crisp" id="accordion"> 

<%var priority = ["V","H","M","L","I"]; _.each(tickets, function(ticket){ %>
<div class="panel panel-default crisp-panel crisp-panel-margin">
    <div class="panel-heading crisp-panel-heading">
        <span class="accordion-toggle panel-title" ><%=ticket.get("subject") %>
		<span class="flag-<%= priority[ticket.get("priority")] %> pull-right"><b><%= priority[ticket.get("priority")] %></b></span>
		</span>  
    </div>
    <div class="panel-collapse collapse">
      <div class="panel-body">
		  <%= ticket.get("conversation")[ticket.get("conversation").length-1].conversation %>
      </div>
	  <div class="panel-footer crisp-panel-footer in">
	  <div>
		<cite>- By <%= ticket.get("conversation")[ticket.get("conversation").length-1].user.name %> on <%= new Date(ticket.get("conversation")[ticket.get("conversation").length-1].time).toLocaleDateString()%> at <%= new Date(ticket.get("conversation")[ticket.get("conversation").length-1].time).toLocaleTimeString()%></cite>
		<a class="viewticket" style="cursor:pointer; href="<%=ticket.get("_id") %>"><span class= "fa fa-arrow-circle-right pull-right fa-2x" data-toggle="tooltip" data-placement="bottom" data-original-title="View ticket details."></span></a>
		</div>
	  </div>
	  <div class="panel-footer-ext collapse">test</div>
    </div>
  </div>
<% }); %>
  
</div>

	
  