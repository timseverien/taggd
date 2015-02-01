taggd
=====

A configurable jQuery plugin that allows you to tag images.

## 1. Installation

[Download the archive](https://github.com/timseverien/taggd/archive/v2.0.3.zip) or browse the repository.

Then include it after your jQuery file.

	<script src="js/jquery.js"></script>
	<script src="js/jquery.taggd.js"></script>

Optionally you can use include (and edit) the css file as well.

	<link href="css/taggd.css" />

## 2. Configuration

	var options = {
		
		// Aligning the text popups
		align: {
			x: 'center', // left, center or right
			y: 'center'	// top,	center or bottom
		},
		
		
		// The (relative) offset of the popups in pixels
		offset: {
			left: 0, // horizontal offset
			top: 12	// vertical offset
		},
		
		
		// event handlers of the tags
		handlers: {
		
			// Any vanilla JavaScript event is a valid key
			click: function(e) {
				alert('You clicked a button');

				this; // the DOM Node
				e;	// the Event
			},
		
		
			// For convenience, you can use strings to
			// show, hide and toggle the popups
			mouseenter: 'show',
			mouseleave: 'hide'
		}
		
		// Whether to enable editor mode
		edit: false,
		
		// Strings for buttons
		strings: {
			save: '&#x2713;',
			delete: '&#x00D7;'
		}
	};
	

	// The magic comes together here
	$('.taggd').taggd( options, data );

## 3. What is “data” and how do I get it?

Data are the tags. Taggd accepts different formats, so pay close attention!

	var data = [
		// x and y values can be decimals (0-1)
		{
			x: 0.512,
			y: 0.33,
			
			// (Optional) Set the text of the popup.
			// If omitted, no popup window will appear.
			text: 'Huey',
			
			// (Optional) Set the element’s attributes.
			attributes: {
				id:    'my-id',
				class: 'my-class'
			}
		},
		
		// x and y values can be in pixels too
		// Don’t you worry, they will scale perfectly
		{
			x: 1052,
			y: 356,
			text: 'Duwey'
		}
	];

As noted in the comments, whatever unit you use, they will scale. The coordinates are always right.

Not sure how to get them? I’ve made [a generator to get coordinates](https://timseverien.com/projects/taggd/generator/).

## 4. The API

But other than putting in data, you can do more with Taggd!

### Managing data

	// Replace existing data with new data
	taggd.setData( [ ... ] );

	// Add new items
	taggd.addData( { ... } );            // one item or
	taggd.addData( [{ ... }, { ... }] ); // multiple items

	// Get rid of all the tags
	taggd.clear();

	// Undo everthing Taggd did
	taggd.dispose();

### Show/hide/toggle tags

	// Show/hide/toggle all items
	taggd.show();
	taggd.hide();
	taggd.toggle();

These three methods all accept the following arguments.

	// A specific index
	taggd.show( 1 );
	
	// A CSS selector
	taggd.show( '#el-one, :nth-child(1)' );
	
	// A jQuery element
	taggd.show( $('#el-two') );
	
	// An array containing any of the formats above
	taggd.show( ['#el-one', 1] );
	
	// A function that returns true or false
	taggd.show(function(i, e) {
		
		// Show if tag contains a search query
		return data[i].text.indexOf(search_query);
		
	});

These methods can be chained.

	taggd.hide().show( 1 );


For examples and styled documentation, visit the [project page](https://timseverien.com/projects/taggd/).