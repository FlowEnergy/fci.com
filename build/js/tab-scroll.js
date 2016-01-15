$(document).ready(function() {
  var tabScroll = $('.tab-scroll'),
    offsetTabScroll = tabScroll.offset();

  var tabScrollFunc = function () {
    var allScroll = $(window).scrollTop(),
      widthContainer = $('.container').width();
    if (allScroll > (offsetTabScroll.top - tabScroll.height()) && widthContainer > 500) {
      tabScroll.addClass('fixed')
    } else {
      tabScroll.removeClass('fixed')
    }
  };

  $(window).scroll(function () {
    tabScrollFunc();
  });
  $(window).resize(function() {
    tabScrollFunc();
  });
});