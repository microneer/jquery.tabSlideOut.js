jquery.tabSlideOut.js
=====================

jQuery plugin to create tabs that slide out from the window edges to show a feedback form, contact form, notepad etc.

Includes methods to programmatically interact with tabs, and events and handlers fire on open, close and bounce (bounce
is used to attract attention to a tab).

Demo
----
 *  [Demonstration on JSFiddle](http://jsfiddle.net/microneer/6kvus71q/2/)

Usage
-----

    To use this you need an element for the tab panel content ('panel'), and inside it an element for the 
	tab which will stick out from the window edge and be clickable ('handle'). By default the selector 
	for handles is '.handle'.

    example HTML:
	
		<div id="my-tab"><span class="handle">Click me</span>Hello World</div>

	example JavaScript (puts the tab on the right, and opens it on hover rather than click):
	
        $('#my-tab').tabSlideOut( {'tabLocation':'right','action':'hover'} );
		
	Style the tab panel and handle using CSS. Add the class ui-slideouttab-handle-rounded to handles to give them 
    rounded outer corners.

Methods
------

    You can use some methods to programmatically interact with tabs. Methods except 'isOpen' are chainable.

        $('#my-tab').tabSlideOut('isOpen'); // return true or false
        $('#my-tab').tabSlideOut('open'); // opens it
        $('#my-tab').tabSlideOut('close'); // closes it
        $('#my-tab').tabSlideOut('toggle'); // toggles it
        $('#my-tab').tabSlideOut('bounce'); // bounces the tab
		
	You can also send JQuery events to initiate actions:
	
	    $('#my-tab').trigger('open'); // opens it
        $('#my-tab').trigger('close'); // closes it
        $('#my-tab').trigger('toggle'); // toggles it
        $('#my-tab').trigger('bounce'); // bounces the tab

Events
------

    Three events are defined and can be caught when tabs open and close:

        $(document).on('slideouttabopen slideouttabclose slideouttabbounce',function(event){
            var $panel = $(event.target);
            var eventType = event.type;
            // your code here
        });

	Features are demonstrated on the demo page.

Options
-------

You can leave out any options, and the following defaults are used:

	tabLocation: 'left', // left, right, top or bottom
	tabHandle: '.handle', // JQuery selector for the tab, can use any JQuery selector
	action: 'click',  // action which will open the panel, e.g. 'hover'
	hoverTimeout: 5000, // ms to keep tab open after no longer hovered - only if action = 'hover'
	offset: '200px', // panel dist from top or left (bottom or right if offsetReverse is true)
	offsetReverse: false, // if true, panel is offset from  right or bottom of window instead of left or top
	otherOffset: null, // if set, panel size is also set to maintain this dist from bottom or right of view port (top or left if offsetReverse)
	handleOffset: null, // e.g. '10px'. If null, detects panel border to align handle nicely on edge
	handleOffsetReverse: false, // if true, handle is offset from right or bottom of panel instead of left or top
	bounceDistance: '50px', // how far bounce event will move everything
	bounceTimes: 4, // how many bounces when 'bounce' is called
	bounceSpeed: 300, // time to animate bounces
	tabImage: null, // optional image to show in the tab
	tabImageHeight: null, // optional IE8 and lower only, else autodetected size
	tabImageWidth: null, // optional IE8 and lower only, else autodetected size
	onLoadSlideOut: false, // slide out after DOM load
	clickScreenToClose: true, // close tab when somewhere outside the tab is clicked
	clickScreenToCloseFilters: ['.ui-slideouttab-panel'], // if click target or parents match any of these, click won't close this tab
	onOpen: function(){}, // handler called after opening
	onClose: function(){} // handler called after closing

Add the class ui-slideouttab-handle-rounded to a handle to give it rounded outer corners.
	
Licence
-------

[GPL v3.0](http://www.gnu.org/licenses/gpl.html)

History
-------

This was originally written by [wpauli](http://wpaoli.building58.com/) and [hosted on Google Code](http://code.google.com/p/tab-slide-out/).