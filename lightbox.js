/*
    Lightbox jQuery plugin
    ======================
    (c)2017 Nick de Kruijk

    Version 0.0.2

    Usage:
    HTML:
    <a href="/link/to/bigpicture.jpg" rel="lightbox" data-caption="Image caption"><img src="thumbnail.jpg" alt="Lowres image"></a>

    CSS:
    #lightbox .caption {position:absolute;bottom:5%;right:5%;color:#fff}
    #lightbox .close {position:absolute;top:3%;right:3%;color:#fff}
    #lightbox .close:after {content:'×'}

    JS:
    $('A[rel=lightbox]').lightbox({
        option1:'value1',
        option2:'value2'
    );

    Options: default value|other options

    arrowkeys: true|false             # Enable keyboard left and right arrow keys
    touchwipe: true|false             # Enable touch device left and right swipe gestures
    fadeIn: 400                       # Fade in animation time when showing lightbox
    fadeOut: 300                      # Fade out animation time when closing lightbox
    captionClass: 'caption'           # CSS Class to apply to the image caption DIV
    background: 'rgba(0, 0, 0, 0.7)'  # Overlay background color
*/

(function ( $ ) {

    $.fn.lightbox = function(options) {

        var defaults = {
            arrowkeys: true,
            touchwipe: true,
            fadeIn: 300,
            fadeOut: 300,
            captionClass: 'caption',
            background: 'rgba(0, 0, 0, 0.7)',
        };

        var rel;
        var relIndex = 0;
        var relLength = 0;
        var node;

        var settings = $.extend( {}, defaults, options );

        return this.each(function() {
            $(this).click(function(e) {
                e.preventDefault();
                rel = $(this).attr('rel');
                if (rel) {
                    node = $(this).prop('nodeName') + '[rel=' + rel + ']';
                    relLength = $(node).length;
                    var href = $(this).attr('href');
                    $(node).each(function(n) {
                        if (href==$(this).attr('href')) {
                            relIndex = n;
                        }
                    });
                }
                showLightbox(this);
            });
        });

        function isTouch() {
        	return 'ontouchstart' in window || 'onmsgesturechange' in window;
        }

        function go(d) {
            var go = relIndex + d;
            if (go < 0) go = relLength-1;
            if (go > relLength-1) go = 0;
            $(node).each(function(n) {
                if (n == go) {
                    relIndex = n;
                    $('#lightbox .caption').html($(this).data('caption'));
                    $('#lightbox .img').fadeOut(settings.fadeOut, function() {
                        $(this).detach();
                    });
                    $('#lightbox').append('<div class="img" style="position:absolute;display:none;top:5%;bottom:5%;left:5%;right:5%;background-size:contain;background-image:url(\''+this+'\')"></div>');
                    setTimeout(function() {
                        $('#lightbox .img:last-child').fadeIn(settings.fadeIn);
                    }, settings.fadeOut);
                }
            });
        }

        function showLightbox(t) {
            $('BODY').append('<div id="lightbox" style="position:fixed;top:0;bottom:0;left:0;right:0;display:none;z-index:99999;background-color:'+settings.background+'"></div>');
            if (rel) {
                $('#lightbox').append('<span class="next"></span>');
                $('#lightbox').append('<span class="prev"></span>');
            }
            $('#lightbox').append('<span class="close"></span>');
            $('#lightbox').append('<div class="img" style="position:absolute;top:5%;bottom:5%;left:5%;right:5%;background-size:contain;background-image:url(\''+t+'\')"></div>');
            if ($(t).data('caption')) {
                 $('#lightbox').append('<div class="caption '+settings.captionClass+'">'+$(t).data('caption')+'</caption>');
            }
            $('#lightbox').fadeIn(settings.fadeIn);
            $('#lightbox .close').click(function() {
                $('#lightbox').fadeOut(settings.fadeOut, function() {
                    hideLightbox();
                });
                return false;
            });
            $('#lightbox .next').click(function(e) {
                go(1);
                return false;
            });
            $('#lightbox .prev').click(function(e) {
                go(-1);
                return false;
            });
            $('#lightbox').click(function() {
                $('#lightbox .close').click();
            });
            // Activate touch gestures
        	if (settings.touchwipe && isTouch()) {
        		$('#lightbox').touchwipe_lightbox({
        			wipeLeft: function() { $('#lightbox .next').click(); },
        			wipeRight: function() { $('#lightbox .prev').click(); },
        			min_move_x: 50,
        			min_move_y: 2000,
        			preventDefaultEvents: false
        		});
        		// Hide arrow keys on touch devices
        		$('#lightbox').children('span.next').hide();
        		$('#lightbox').children('span.prev').hide();
        	}
            // Activate arrow keys on keyboard
        	if (settings.arrowkeys) $(document).keydown(function(e) {
        		var keyCode=e.keyCode || e.which;
        		if (keyCode==39) {
                    $('#lightbox .next').click();
        		}
        		if (keyCode==37) {
                    $('#lightbox .prev').click();
        		}
        		if (keyCode==27) {
                    $('#lightbox .close').click();
        		}
        	});
        }
        function hideLightbox() {
            $('#lightbox').detach();
        }
    };

}( jQuery ));

/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 *
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems)
 * @version 1.1 (1st September 2010) - support wipe up and wipe down
 * @version 1.0 (15th July 2010)
 */
(function($){$.fn.touchwipe_lightbox=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);
