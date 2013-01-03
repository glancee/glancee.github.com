/* Google Analytics
 * *******************************************************/

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-21455677-1']);
_gaq.push(['_setDomainName', 'glancee.com']);
_gaq.push(['_addIgnoredRef', 'glancee.com']);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();

/* Document ready
 * *******************************************************/

$(function() {
  // Modified from http://gist.github.com/1136488
  $('a[href^="http"]:not([href*="glancee.com"]),a[href^="mailto"],a[href$=".pdf"]').click(function(e) {
    _gaq.push(['_trackEvent', 'Links', $(this).attr('href'), $(this).closest('[id!=""]').attr('id')]);
    if (!(e.which == 2 || e.metaKey || e.ctrlKey || e.shiftKey || $(this).hasClass("link-video"))) {
      setTimeout('document.location="' + $(this).attr('href') + '"', 200);
      return false;
    }
  });
  $.getScript("/static/js/jquery.colorbox-min.js", function() {
    $(".link-video").colorbox({
      iframe: true,
      innerWidth: 800,
      innerHeight: 480,
      transition: 'none',
      returnFocus: false,
    });
  });
});