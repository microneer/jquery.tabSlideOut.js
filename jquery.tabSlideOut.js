/*
    tabSlideOUt v2.1

    By William Paoli: http://wpaoli.building58.com
    Contributions by:
        Michael Fielding / www.hawkip.com
    License: GPL v2.0
    Original location: http://code.google.com/p/tab-slide-out

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

    You can use some methods too:

        $('#slide-out-div').tabSlideOut('isOpen'); // true or false
        $('#slide-out-div').tabSlideOut('open'); // opens it
        $('#slide-out-div').tabSlideOut('close'); // closes it
        $('#slide-out-div').tabSlideOut('toggle'); // toggles it
        $('#slide-out-div').tabSlideOut('bounce'); // bounces the tab

*/
(function($){
    $.fn.tabSlideOut = function(callerSettings, oParams) {

        if ( typeof callerSettings == 'string' )
        {
            // param is a string, use command mode
            switch ( callerSettings )
            {
                case 'open':
                    if ( !this.hasClass('open') )
                        this.children('.ui-slideouttab-handle').click();
                    break;
                case 'close':
                    if ( this.hasClass('open') )
                        this.children('.ui-slideouttab-handle').click();
                    break;
                case 'isOpen':
                    return this.hasClass('open');
                    break;
                case 'toggle':
                    this.children('.ui-slideouttab-handle').click();
                    break;
                case 'bounce':
                    this.children('.ui-slideouttab-handle').trigger('bounce');
                    break;
                default:
                    throw "Invalid tabSlideOut command";
            }
        }
        else
        {
            // param is an object, it's initialisation mode
            var settings = $.extend({
                tabHandle: '.handle', // JQuery selector for the tab, can use #
                toggleButton: '.tab-opener',
                speed: 300,
                action: 'click',  // action which will open the panel
                tabLocation: 'left', // left, right, top or bottom
                topPos: '200px',
                leftPos: '20px',
                bounceDistance: '50px', // how far 'bounce event will move everything
                bounceTimes: 4, // how many bounces when 'bounce' is called
                fixedPosition: false, // positioning: fixed? (otherwise absolute)
                /* optional setting bottomPos: '10px', for left or right tabLocations */
                positioning: 'absolute',
                pathToTabImage: null,
                imageHeight: null,
                imageWidth: null,
                handleOffset: '0',
                onLoadSlideOut: false, // slide out after DOM load
                clickScreenToClose: true, // close when rest of screen clicked
                onOpen: function(){}, // handler called after opening
                onClose: function(){} // handler called after closing
            }, callerSettings||{});

            settings.tabHandle = $(settings.tabHandle);
            settings.tabHandle.addClass('ui-slideouttab-handle'); // need this to find it later
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
                var iDimension;
                switch ( settings.tabLocation )
                {
                    case 'top':
                    case 'bottom':
                        iDimension = properties.containerHeight;
                        break;
                    case 'left':
                    case 'right':
                        iDimension = properties.containerWidth;
                }
                
                var param = [];
                param[settings.tabLocation] = '-' + iDimension;
                obj.animate(param, settings.speed, settings.onClose()).removeClass('open');
            };

            var slideOut = function() {
                var param = [];
                param[settings.tabLocation] = '-3px';
                obj.animate(param,  settings.speed, settings.onOpen()).addClass('open');
            };
            
            // animate the tab in and out
            var moveIn = [];
            moveIn[settings.tabLocation] = '-=' + settings.bounceDistance;
            var moveOut = [];
            moveOut[settings.tabLocation] = '+=' + settings.bounceDistance;
            
            var bounceIn = function() {
                var temp = obj;
                for ( var i = 0; i < settings.bounceTimes; i++ )
                {
                    temp = temp.animate(moveIn,  settings.speed)
                       .animate(moveOut,  settings.speed);
                }
            };
            
            var bounceOut = function() {
                var temp = obj;
                for ( var i = 0; i < settings.bounceTimes; i++ )
                {
                    temp = temp.animate(moveOut,  settings.speed)
                       .animate(moveIn,  settings.speed);
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
                if ( settings.clickScreenToClose )
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

                    if ( settings.clickScreenToClose )
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
            
            settings.tabHandle.on('bounce', function(event){
                if (obj.hasClass('open')) {
                    bounceIn();
                } else {
                    bounceOut();
                }
            });

        }
        return this;
    };
})(jQuery);
