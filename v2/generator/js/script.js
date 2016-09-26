var App = function() {
	this.data = [];
	this.DOM = this.getDOM();
	
	this.initializeInput();
	this.initializeOutput();
	
	this.printData();
};

App.prototype.getDOM = function() {
	return {
		input: $('#input-file'),
		preview: $('#preview'),
		output: $('#output'),
		
		outputOptionMinify: $('#output-opt-minify')
	};
};

App.prototype.getOptions = function() {
	return {
		align: {
			x: 'center', // left, center or right
			y: 'center' // top, center or bottom
		},
		
		offset: {
			left: 0, // horizontal offset
			top: 24 // vertical offset
		},
		
		edit: true
	};
};

/****************************************************************
 * INITIALIZATION
 ****************************************************************/

App.prototype.initializeInput = function() {
	var _this = this;
	var $el = this.DOM.input;
	
	$el.on('change', function(e) {
		var el = $el.get(0);
		
		if(el.files.length > 0) {
			_this.loadPreview(el.files[0]);
		}
	});
};

App.prototype.initializeOutput = function() {
	var _this = this;
	var $el = this.DOM.outputOptionMinify;
	
	$el.on('change', function() {
		_this.printData();
	});
};

/****************************************************************
 * PREVIEW
 ****************************************************************/

App.prototype.loadPreview = function(file) {
	var _this = this;
	var $el = this.DOM.preview;
	var reader = new FileReader();
	
	var i = 0;
	
	reader.onloadend = function() {
		while($el.children().length) {
			$el.children().remove();
		}
		
		var img = new Image();
		img.src = reader.result;
		
		$el.append(img);
		
		var taggd = $el.children().taggd(_this.getOptions(), []);
		
		taggd.on('change', function() {
			_this.data = taggd.data;
			_this.printData();
		});
	};
	
	reader.readAsDataURL(file);
};

/****************************************************************
 * OUTPUT
 ****************************************************************/

App.prototype.printData = function() {
	var $el = this.DOM.output;
	var json = null;
	
	var minify = this.DOM.outputOptionMinify.get(0).checked;
	
	if(minify) json = JSON.stringify(this.data);
	else json = JSON.stringify(this.data, null, '\t');
	
	$el.html('var data = ' + json);
};

new App();