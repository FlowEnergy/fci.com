$(window).load(function() {
    $('label[for]').click(function(e) {
        var target = window[this.htmlFor];
        target.checked = !target.checked;
        e.preventDefault();
    });

    /*
     * Replace all SVG images with inline SVG
     */
    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });
    $('.wrap-loader').addClass('visib');
    $('.scroll-link').bind("click", function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 1000);
        e.preventDefault();
    });
    $('.scroll-link-nav').bind("click", function(e){
      var anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top - 220
      }, 1000);
      e.preventDefault();
    });
    // header add class fixed

    // header add class fixed end
    $('.animated-down-0-7s').viewportChecker({
        classToAdd: 'visible animated-0-7s fadeInDown',
        offset: 0
    });
    $('.animated-down-0-8s').viewportChecker({
        classToAdd: 'visible animated-0-8s fadeInDown',
        offset: 0
    });
    $('.animated-down-0-9s').viewportChecker({
        classToAdd: 'visible animated-0-9s fadeInDown',
        offset: 0
    });
// animate Down end
    $('.animate-40').viewportChecker({
        classToAdd: 'visible animated-0-9s fadeInDown-40',
        offset: 0
    });
    $('.detail--right').viewportChecker({
      classToAdd: 'visible detail-line detail-line--right',
      offset: 0
    });
    $('.detail--left').viewportChecker({
      classToAdd: 'visible detail-line detail-line--left',
      offset: 0
    });
    $('.circle').viewportChecker({
        classToAdd: 'visible detail-circle',
        offset: 0
    });

});
// animate Down start
$(document).ready(function() {
    var header = $('.main-header');
    var carouselMain = $('#carousel-main'),
        windowHeight = $(window).height(),
        carouselMainHeight = carouselMain.height(),
        allScroll = $('body').scrollTop(),
        differentHeight = windowHeight - carouselMainHeight;
    carouselMain.carousel({
        interval: 2000,
        pause: "false"
    });

    var headerFunc = function () {
        var allScroll = $(window).scrollTop(),
            widthContainer = $('.container').width();
        //if (allScroll > 0 && widthContainer > 768) {
        //    header.addClass('fixed')
        //} else {
        //    header.removeClass('fixed')
        //}
    }

    var funcScroll = function () {
        var carouselMainStart = $('.block-slider').offset(),
            allScroll = $(window).scrollTop();
        if (allScroll + differentHeight >= carouselMainStart.top) {
            carouselMain.carousel('cycle');
        } else {
            carouselMain.carousel('pause');
        }
    }


  //Product slider / scroll

    var productSlide = function () {
        var product_scroll_wrap = $('.product-scroll-wrap');
        var itemSlider = $('.product-scroll-wrap .col-md-4');
        itemSlider.each(function (i) {
            $(this).closest('.customers-scroll--inner').css('width', '100%');
        });
    };

    productSlide();

    $(window).load(function() {
        carouselMain.carousel('pause');
    });
    if(carouselMain.length) {
        funcScroll();
        $(window).scroll(function () {
            funcScroll();
        });
    }
    $(window).scroll(function () {
        headerFunc();

    });
    $(window).resize(function() {
        headerFunc();
        productSlide();
    });

});


$(function(){
  $('.carousel').carousel({
    interval: 100000
  });
    jQuery('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, else we gonna set it if we can.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });    
});