<div id="content-container">
      <div id="editor-wrapper">
        <div id="formatting-container" style="border-bottom: 1px solid #ccc;border-top: 1px solid #ccc;background-color:#f5f5f5; padding:5px 10px">
         <select title="Font" class="ql-font" style="vertical-align:bottom;">
            <option value="sans-serif" selected>Sans Serif</option>
            <option value="Georgia, serif">Serif</option>
            <option value="Monaco, 'Courier New', monospace">Monospace</option>
          </select>
          <select title="Size" class="ql-size" style="vertical-align:bottom;">
            <option value="10px">Small</option>
            <option value="13px" selected>Normal</option>
            <option value="18px">Large</option>
            <option value="32px">Huge</option>
          </select>
          <select title="Text Color" class="ql-color" style="vertical-align:bottom;">
            <option value="rgb(255, 255, 255)">White</option>
            <option value="rgb(0, 0, 0)" selected>Black</option>
            <option value="rgb(255, 0, 0)">Red</option>
            <option value="rgb(0, 0, 255)">Blue</option>
            <option value="rgb(0, 255, 0)">Lime</option>
            <option value="rgb(0, 128, 128)">Teal</option>
            <option value="rgb(255, 0, 255)">Magenta</option>
            <option value="rgb(255, 255, 0)">Yellow</option>
          </select>
          <select title="Background Color" class="ql-background collapse" style="vertical-align:bottom;">
            <option value="rgb(255, 255, 255)" selected>White</option>
            <option value="rgb(0, 0, 0)">Black</option>
            <option value="rgb(255, 0, 0)">Red</option>
            <option value="rgb(0, 0, 255)">Blue</option>
            <option value="rgb(0, 255, 0)">Lime</option>
            <option value="rgb(0, 128, 128)">Teal</option>
            <option value="rgb(255, 0, 255)">Magenta</option>
            <option value="rgb(255, 255, 0)">Yellow</option>
          </select>
          <select title="Text Alignment" class="ql-align" style="vertical-align:bottom;">
            <option value="left" selected>Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
		  
		  <button title="Bold" class="ql-format-button ql-bold btn btn-default" style="border-radius: 0px;">
		  <i class="fa fa-bold"></i>
		  </button>
          <button title="Italic" class="ql-format-button ql-italic btn btn-default" style="border-radius: 0px;margin-left:-4px;">
		  <i class="fa fa-italic"></i>
		  </button>
          <button title="Underline" class="ql-format-button ql-underline btn btn-default" style="border-radius: 0px;margin-left:-4px;">
		  <i class="fa fa-underline"></i>
		  </button>
          <button title="Strikethrough" class="ql-format-button ql-strike btn btn-default" style="border-radius: 0px;margin-left:-4px;">
		  <span class="fa fa-strikethrough"></span>
		  </button>
		  
          
          <button title="Link" class="ql-format-button ql-link btn btn-default collapse" style="border-radius: 0px;margin-left: 5px;">
		  <span class="fa fa-link"></span></button>
          <button title="Image" class="ql-format-button ql-image btn btn-default collapse" style="border-radius: 0px;margin-left:-4px;">
		  <span class="fa fa-file-image-o"></span></button>
		  
		  
          <button title="Bullet" class=" ql-bullet btn btn-default" style="border-radius: 0px;margin-left: 5px;">
		  <span class="fa fa-list-ul ql-format-button ql-bullet"></span></button>
          <button title="List" class="ql-format-button ql-list btn btn-default" style="border-radius: 0px;margin-left:-4px;">
		  <span class="fa fa-list-ul ql-format-button ql-list"></span></button>
		  <button title="Expand Toolbar" class="btn btn-default" style="border-radius: 0px;margin-left:-4px;padding:6px 2px">
		  <span class="fa fa-chevron-right"></span></button>
		  
		  <a href=<%=id%> class="btn btn-default btn-primary pull-right sendirt" style="margin-left: 10px;">
		  <span class="fa fa-reply"></span> Meet IRT</a>
          <button class="btn btn-default btn-warning pull-right cancelirt" style="margin-left: 10px;" >
		  <span class="fa fa-remove"></span> Cancel</button>
		  <div class="btn-group pull-right">
			  <a href="#" class="btn btn-success template"><span class="fa fa-download"></span> Insert Template</a>
			  <a href="#" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span></a>
			  <ul class="dropdown-menu">
			<%_.each(templates, function(template){ %>
				<li><a class="template" href="<%= template.get("_id") %>">
				<%if(template.get("user")==="Global") {%>
				<span class="fa fa-users"></span>
				<%}else{%>
				<span class="fa fa-user"></span>
				<%}%>
				<%= template.get("name") %></a></li>
			<% }); %>
				<li class="divider"></li>
				<li><a href="#"><span class="fa fa-save"></span> Save As Template</a></li>
			  </ul>
			</div>
		  
        </div>
        <div id="editor-container" style="min-height:200px;padding:0px;"></div>
      </div>
    </div>