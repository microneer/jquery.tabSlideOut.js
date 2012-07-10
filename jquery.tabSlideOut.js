/*
    tabSlideOUt v2.0

    By William Paoli: http://wpaoli.building58.com
    Contributions by:
        Michael Fielding / www.hawkip.com

    To use you must have a div, img, span etc. for the tab, inside a div which
    will be the panel.

    example:

        $('.slide-out-div').tabSlideOut({
                tabHandle: '.handle', //selector for the tab
        });

    You can leave out most options and set the properties using css.

    There is an optional setting bottomPos which, when set, fixes the gap between the window
    bottom edge and the panel bottom - the panel is resized with the window. This only
    really makes sense if fixedPosition: true, and only works if tabLocation is
    left or right.
*/


(function($){
    $.fn.tabSlideOut = function(callerSettings) {
        var settings = $.extend({
            tabHandle: '.handle', // JQuery selector for the tab, can use #
            toggleButton: '.tab-opener',
            speed: 300,
            action: 'click',  // action which will open the panel
            tabLocation: 'left', // left, right, top or bottom
            topPos: '200px',
            leftPos: '20px',
            fixedPosition: false,
            /* optional setting bottomPos: '10px', for left or right tabLocations */
            positioning: 'absolute',
            pathToTabImage: null,
            imageHeight: null,
            imageWidth: null,
            handleOffset: '0',
            onLoadSlideOut: false,
            onOpen: function(){},
            onClose: function(){}
        }, callerSettings||{});

        settings.tabHandle = $(settings.tabHandle);
        settings.toggleButton = $(settings.toggleButton);

        var obj = this;
        if (settings.fixedPosition === true) {
            settings.positioning = 'fixed';
        } else {
            settings.positioning = 'absolute';
        }

        //ie6 doesn't do well with the fixed option
        if (document.all && !window.opera && !window.XMLHttpRequest) {
            settings.positioning = 'absolute';
        }

        //set initial tabHandle css
        if (settings.pathToTabImage !== null) {
            settings.tabHandle.css({
            'background' : 'url('+settings.pathToTabImage+') no-repeat',
            'width' : settings.imageWidth,
            'height': settings.imageHeight
            });
        }

        settings.tabHandle.css({
            'display': 'block',
            'textIndent' : '-99999px',
            'outline' : 'none',
            'position' : 'absolute'
        });

        obj.css({
            'line-height' : '1',
            'position' : settings.positioning
        });

        /**
         * Return the desired height of the panel, if a bottomPos is defined.
         */
        function getPanelHeight() {
            return height = $(window).height() - (parseInt(settings.bottomPos) + parseInt(settings.topPos));
        }

        var properties = {
                    containerWidth: parseInt(obj.outerWidth(), 10) + 'px',
                    containerHeight: parseInt(obj.outerHeight(), 10) + 'px',
                    tabWidth: parseInt(settings.tabHandle.outerWidth(), 10) + 'px',
                    tabHeight: parseInt(settings.tabHandle.outerHeight(), 10) + 'px'
                };

        //set calculated css
        if(settings.tabLocation === 'top' || settings.tabLocation === 'bottom') {
            obj.css({'left' : settings.leftPos});
            settings.tabHandle.css({'right' : settings.handleOffset + 'px'});
        }

        if(settings.tabLocation === 'top') {
            obj.css({'top' : '-' + properties.containerHeight});
            settings.tabHandle.css({'bottom' : '-' + properties.tabHeight});
        }

        if(settings.tabLocation === 'bottom') {
            obj.css({'bottom' : '-' + properties.containerHeight, 'position' : 'fixed'});
            settings.tabHandle.css({'top' : '-' + properties.tabHeight});

        }

        if(settings.tabLocation === 'left' || settings.tabLocation === 'right') {
            obj.css({
                'height' : typeof settings.bottomPos == 'undefined' ?
                        properties.containerHeight : getPanelHeight()+'px',
                'top' : settings.topPos
            });

            settings.tabHandle.css({'top' : settings.handleOffset + 'px'});

            // window resize handler
            if ( typeof settings.bottomPos != 'undefined' ) {
                $(window).resize(function() { obj.height(getPanelHeight() + 'px');});
            }
        }

        if(settings.tabLocation === 'left') {
            obj.css({ 'left': '-' + properties.containerWidth});
            settings.tabHandle.css({'right' : '-' + properties.tabWidth});
        }

        if(settings.tabLocation === 'right') {
            obj.css({ 'right': '-' + properties.containerWidth});
            settings.tabHandle.css({'left' : '-' + properties.tabWidth});

            $('html').css('overflow-x', 'hidden');
        }

        //functions for animation events

        settings.tabHandle.click(function(event){
            event.preventDefault();
        });
        settings.toggleButton.click(function(event){
            event.preventDefault();
        });

        var slideIn = function() {

            if (settings.tabLocation === 'top') {
                obj.animate({top:'-' + properties.containerHeight}, settings.speed, settings.onClose()).removeClass('open');
            } else if (settings.tabLocation === 'left') {
                obj.animate({left: '-' + properties.containerWidth}, settings.speed, settings.onClose()).removeClass('open');
            } else if (settings.tabLocation === 'right') {
                obj.animate({right: '-' + properties.containerWidth}, settings.speed, settings.onClose()).removeClass('open');
            } else if (settings.tabLocation === 'bottom') {
                obj.animate({bottom: '-' + properties.containerHeight}, settings.speed, settings.onClose()).removeClass('open');
            }

        };

        var slideOut = function() {

            if (settings.tabLocation === 'top') {
                obj.animate({top:'-3px'},  settings.speed, settings.onOpen()).addClass('open');
            } else if (settings.tabLocation === 'left') {
                obj.animate({left:'-3px'},  settings.speed, settings.onOpen()).addClass('open');
            } else if (settings.tabLocation === 'right') {
                obj.animate({right:'-3px'},  settings.speed, settings.onOpen()).addClass('open');
            } else if (settings.tabLocation === 'bottom') {
                obj.animate({bottom:'-3px'},  settings.speed, settings.onOpen()).addClass('open');
            }
        };

        var clickScreenToClose = function() {
            obj.click(function(event){
                event.stopPropagation();
            });

            settings.toggleButton.click(function(event){
                event.stopPropagation();
            });


            $(document).click(function(){
                slideIn();
            });
        };

        var clickAction = function(){
            settings.tabHandle.click(function(event){
                if (obj.hasClass('open')) {
                    slideIn();
                } else {
                    slideOut();
                }
            });
            settings.toggleButton.click(function(event){
                if (obj.hasClass('open')) {
                    slideIn();
                } else {
                    slideOut();
                }
            });
            clickScreenToClose();
        };

        var hoverAction = function(){
            obj.hover(
                function(){
	                if (!obj.hasClass('open')) {
	                    slideOut();
    				}
                },

                function(){
                    if (obj.hasClass('open')) {
                            setTimeout(slideIn, 1000);
                    }
                });

                settings.tabHandle.click(function(event){
                    if (obj.hasClass('open')) {
                        slideIn();
                    }
                });

	            settings.toggleButton.click(function(event){
	                if (obj.hasClass('open')) {
	                    slideIn();
	                } else {
	                    slideOut();
	                }
	            });

                clickScreenToClose();

        };

        var slideOutOnLoad = function(){
            slideIn();
            setTimeout(slideOut, 500);
        };

        //choose which type of action to bind
        if (settings.action === 'click') {
            clickAction();
        }

        if (settings.action === 'hover') {
            hoverAction();
        }

        if (settings.onLoadSlideOut) {
            slideOutOnLoad();
        }

    };
})(jQuery);
