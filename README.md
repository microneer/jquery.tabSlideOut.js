jquery.tabSlideOut.js
=====================

jQuery plugin to create a side/top/bottom tab that slides out to show a feedback form, contact form, notepad etc.

Examples:

 *  [http://www.building58.com/examples/tabSlideOut.html](http://www.building58.com/examples/tabSlideOut.html) (includes explanation)
 * [https://dashboard.hawkip.com](https://dashboard.hawkip.com) (no explanation)

Usage
-----

To use you must have a div, img, span etc. for the tab, inside a div which will be the panel.

For example:

        $('.slide-out-div').tabSlideOut({
                tabHandle: '.handle', //selector for the tab
        });


Options
-------

You can leave out many options and set the tab and panel properties using css.

There is an optional setting bottomPos which, when set, fixes the gap between the window
bottom edge and the panel bottom - the panel is resized with the window. This only
really makes sense if fixedPosition: true, and only works if tabLocation is
left or right.

            tabHandle: '.handle', // JQuery selector for the tab, can use #
            toggleButton: '.tab-opener',
            speed: 300,
            action: 'click',  // action which will open the panel
            tabLocation: 'left', // left, right, top or bottom
            topPos: '200px',
            leftPos: '20px',
            fixedPosition: false, // positioning: fixed? (otherwise absolute)
            /* optional setting bottomPos: '10px', for left or right tabLocations */
            positioning: 'absolute',
            pathToTabImage: null,
            imageHeight: null,
            imageWidth: null,
            handleOffset: '0',
            onLoadSlideOut: false, // slide out after DOM load
            onOpen: function(){}, // handler called after opening
            onClose: function(){} // handler called after closing

Methods
-------

You can use some methods too:

        $('#slide-out-div').tabSlideOut('isOpen'); // returns true or false
        $('#slide-out-div').tabSlideOut('open'); // opens it
        $('#slide-out-div').tabSlideOut('close'); // closes it
        $('#slide-out-div').tabSlideOut('toggle'); // toggles it


Licence
-------

[GPL v3.0](http://www.gnu.org/licenses/gpl.html)

History
-------

This was originally written by [wpauli](http://wpaoli.building58.com/) and [hosted on Google Code](http://code.google.com/p/tab-slide-out/).