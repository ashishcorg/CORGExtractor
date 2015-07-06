<span class="label label-danger crisp-span">New Tickets</span>
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
		  <%= ticket.get("conversation")[0].conversation %>
      </div>
	  <div class="panel-footer crisp-panel-footer in">
	  <div>
		<cite>- By <%= ticket.get("conversation")[0].user.name %> on <%= new Date(ticket.get("conversation")[0].time).toLocaleDateString()%> at <%= new Date(ticket.get("conversation")[0].time).toLocaleTimeString()%></cite>
		<a class="viewticket" style="cursor:pointer; href="<%=ticket.get("_id") %>"><span class= "fa fa-arrow-circle-right pull-right fa-2x" data-toggle="tooltip" data-placement="bottom" data-original-title="View ticket details."></span></a>
		<a class="meetirt" style="cursor:pointer;" href="<%=ticket.get("_id") %>"><span class= "fa fa-reply pull-right fa-2x" data-toggle="tooltip" data-placement="bottom" data-original-title="Send an initial response to meet IRT."></span></a>
		</div>
	  </div>
	  <div class="panel-footer-ext collapse">test</div>
    </div>
  </div>
<% }); %>
  
</div>

	
  