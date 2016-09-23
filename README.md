jquery.tabSlideOut.js
=====================

jQuery plugin to create tabs that slide out from the window edges to show a feedback form, contact form, notepad etc.

Includes methods to programmatically interact with tabs, and events and handlers fire on open, close and bounce (bounce
is used to attract attention to a tab).

Demo
----
 *  [Demonstration on JSFiddle](http://jsfiddle.net/gh/get/jquery/1.11/hawk-ip/jquery.tabSlideOut.js/tree/master/demo)

Usage
-----

Create a handle element (div, a, img, span etc.) inside a div (typically) which will be the 
content panel. By default the selector for the handle is .handle (scope is limited to the panel).

HTML:

	<div id="slide-out-div">
		<a class="handle">Click me</a>
		<p>This is the panel content.</p>
	</div>


In your javascript:

	$('#slide-out-div').tabSlideOut({
		tabLocation: 'right' // optional, default is 'left'
	});

The handle and panel will be positioned by the plugin - you don't need to apply positioning. 
Init options let you choose where to place the tab (which edge, offset from the top/bottom/left/right) and
where to place the handle relative to the content panel. 

Styling, such as borders, colours, hover effects etc. should be put in your own CSS.

Options
-------

You can leave out any options, and the following defaults are used:

	tabLocation: 'left', // left, right, top or bottom
	tabHandle: '.handle', // JQuery selector for the tab, can use #
	speed: 300, // time to animate
	action: 'click',  // action which will open the panel, 'hover' or 'click'
	offset: '200px', // panel dist from top or left (bottom or right if offsetReverse is true)
	offsetReverse: false, // if true, panel is aligned with right or bottom of window
	otherOffset: null, // if set, panel size is set to maintain this dist from bottom or right (top or left if offsetReverse)
	handleOffset: null, // e.g. '10px'. If null, detects panel border to align handle nicely
	handleOffsetReverse: false, // if true, handle aligned with right or bottom of panel 
	bounceDistance: '50px', // how far bounce event will move everything
	bounceTimes: 4, // how many bounces when 'bounce' is called
	positioning: 'fixed', // can also use absolute, so tabs move when window scrolls
	pathToTabImage: null, // optional image to show in the tab
	imageHeight: null,
	imageWidth: null,
	onLoadSlideOut: false, // slide out after DOM load
	clickScreenToClose: true, // close tab when rest of screen clicked
	toggleButton: '.tab-opener', // not often used
	onOpen: function(){}, // handler called after opening
	onClose: function(){} // handler called after closing

Add the class ui-slideouttab-handle-rounded to a handle to give it rounded outer corners.


Methods
-------

You can programmatically interact with the tab:

	$('#slide-out-div').tabSlideOut('isOpen'); // returns true or false
	$('#slide-out-div').tabSlideOut('open'); // opens it
	$('#slide-out-div').tabSlideOut('close'); // closes it
	$('#slide-out-div').tabSlideOut('toggle'); // toggles it
	$('#slide-out-div').tabSlideOut('bounce'); // bounces to attract attention

Events
------

Three events are defined. Respond to one or more of them as follows:

	$(document).on('slideouttabopen slideouttabclose slideouttabbounce',function(event){
		var $panel = $(event.target);
		var eventType = event.type;
		// your code here
	});
	
Licence
-------

[GPL v3.0](http://www.gnu.org/licenses/gpl.html)

History
-------

This was originally written by [wpauli](http://wpaoli.building58.com/) and [hosted on Google Code](http://code.google.com/p/tab-slide-out/).