<div class="paper">

    <legend>Create a new ticket.</legend>
<div class="form-group has-small">
  <label class="control-label" style="visibility:hidden;" for="subject">Subject</label>
  <input contenteditable="true" spellcheck="true" type="text" class="form-control custom-form-control" id="subject" placeholder="Subject" required>
  <label class="control-label" style="visibility:hidden;" for="subject">provide a one liner Brief description of the issue.</label>
</div>
<ul class="list-inline">
    <li style="width:45%;">
	<label class="control-label" for="priority">Priority</label>
	<select class="form-control" id="priority" required>
          <option value="0">Very High</option>
          <option value="1">High</option>
          <option value="2" selected>medium</option>
          <option value="3">Low</option>
          <option value="4">Information</option>
        </select></li>
    <li style="width:45%;float:right;">
	<label class="control-label" for="component">Component (optional)</label>
	<select class="form-control" id="component">
          <option value="1" selected>1</option>
          <option value="1">2</option>
          <option value="1">3</option>
          <option value="1">4</option>
          <option value="1">5</option>
        </select></li>
</ul>
</br><label class="control-label" for="select">Please describe the issue below.</label></hr>


<div id="content-container">
      <div id="editor-wrapper">
        <div id="formatting-container" style="border-bottom: 1px solid #ccc;">
         <select title="Font" class="ql-font">
            <option value="sans-serif" selected>Sans Serif</option>
            <option value="Georgia, serif">Serif</option>
            <option value="Monaco, 'Courier New', monospace">Monospace</option>
          </select>
          <select title="Size" class="ql-size">
            <option value="10px">Small</option>
            <option value="13px" selected>Normal</option>
            <option value="18px">Large</option>
            <option value="32px">Huge</option>
          </select>
          <select title="Text Color" class="ql-color">
            <option value="rgb(255, 255, 255)">White</option>
            <option value="rgb(0, 0, 0)" selected>Black</option>
            <option value="rgb(255, 0, 0)">Red</option>
            <option value="rgb(0, 0, 255)">Blue</option>
            <option value="rgb(0, 255, 0)">Lime</option>
            <option value="rgb(0, 128, 128)">Teal</option>
            <option value="rgb(255, 0, 255)">Magenta</option>
            <option value="rgb(255, 255, 0)">Yellow</option>
          </select>
          <select title="Background Color" class="ql-background">
            <option value="rgb(255, 255, 255)" selected>White</option>
            <option value="rgb(0, 0, 0)">Black</option>
            <option value="rgb(255, 0, 0)">Red</option>
            <option value="rgb(0, 0, 255)">Blue</option>
            <option value="rgb(0, 255, 0)">Lime</option>
            <option value="rgb(0, 128, 128)">Teal</option>
            <option value="rgb(255, 0, 255)">Magenta</option>
            <option value="rgb(255, 255, 0)">Yellow</option>
          </select>
          <select title="Text Alignment" class="ql-align">
            <option value="left" selected>Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
		  
		  <button title="Bold" class="ql-format-button ql-bold btn btn-default" style="border-radius: 0px;">
		  <i class="fa fa-bold"></i>
		  </button>
          <button title="Italic" class="ql-format-button ql-italic btn btn-default" style="border-radius: 0px;">
		  <i class="fa fa-italic"></i>
		  </button>
          <button title="Underline" class="ql-format-button ql-underline btn btn-default" style="border-radius: 0px;">
		  <i class="fa fa-underline"></i>
		  </button>
          <button title="Strikethrough" class="ql-format-button ql-strike btn btn-default" style="border-radius: 0px;">
		  <span class="fa fa-strikethrough"></span>
		  </button>
		  
          
          <button title="Link" class="ql-format-button ql-link btn btn-default" style="border-radius: 0px;margin-left: 5px;">
		  <span class="fa fa-link"></span></button>
          <button title="Image" class="ql-format-button ql-image btn btn-default" style="border-radius: 0px;">
		  <span class="fa fa-file-image-o"></button>
		  
		  
          <button title="Bullet" class="ql-format-button ql-bullet btn btn-default" style="border-radius: 0px;margin-left: 5px;">
		  <span class="fa fa-list-ul ql-format-button ql-bullet"></span></button>
          <button title="List" class="ql-format-button ql-list btn btn-default" style="border-radius: 0px;">
		  <span class="fa fa-list-ul ql-format-button ql-list"></span></button>
		  
        </div>
        <div id="editor-container" style="min-height:200px;padding:0px;"></div>
      </div>
    </div>
	
  <button id="draft-ticket" class="btn btn-default btn-lg">Save as Draft</button>
  <button id="save-ticket" class="btn btn-primary btn-lg">Create Ticket</button>
	
	
	
<div>
