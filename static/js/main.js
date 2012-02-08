/*
 * Created by Andrea Vaccari
 * Email: andrea@glancee.com
 */

/*
 * Google Analytics
 */
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

/*
 * AdRoll Pixel
 */
adroll_adv_id = "7CCWSIIT4VBGRNTFAZJGSS";
adroll_pix_id = "LLYDUONO55FS5ID4H6EOWU";
(function () {
  var ar = document.createElement("script");
  ar.type = "text/javascript";
  ar.async = true;
  ar.src = ('https:' == document.location.protocol ? "https://s.adroll.com" : "http://a.adroll.com") + "/j/roundtrip.js";
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ar, s);
})();

var mpmetrics;

$(function() {
  // Modified from http://gist.github.com/1136488
  $('a[href^="http"]:not([href*="glancee.com"]),a[href^="mailto"],a[href$=".pdf"]').click(function(e) {
    _gaq.push(['_trackEvent', 'Links', $(this).attr('href'), $(this).closest('[id!=""]').attr('id')]);
    if (!(e.which == 2 || e.metaKey || e.ctrlKey || e.shiftKey || $(this).hasClass("link-video") || $(this).hasClass("link-fancy"))) {
      setTimeout('document.location="' + $(this).attr('href') + '"', 200);
      return false;
    }
  });
  $.getScript("http://api.mixpanel.com/site_media/js/api/mixpanel.js", function() {
    if (window.location.host == "localhost") {
      return;
    }
    try {
      mpmetrics = new MixpanelLib("889ac641d6eac33d42e9fea6255b027d");
      mpmetrics.track("visit-" + window.location.pathname);
      mpmetrics.track_links($("#header .link-iphone"), "link-iphone", {"page":window.location.pathname, "source":"header"});
      mpmetrics.track_links($("#matter .link-iphone"), "link-iphone", {"page":window.location.pathname, "source":"matter"});
      mpmetrics.track_links($("#footer .link-iphone"), "link-iphone", {"page":window.location.pathname, "source":"footer"});
      mpmetrics.track_links($("#header .link-android"), "link-android", {"page":window.location.pathname, "source":"header"});
      mpmetrics.track_links($("#matter .link-android"), "link-android", {"page":window.location.pathname, "source":"matter"});
      mpmetrics.track_links($("#footer .link-android"), "link-android", {"page":window.location.pathname, "source":"footer"});
      mpmetrics.track_links($("#header .link-fapp"), "link-fapp", {"page":window.location.pathname, "source":"header"});
      mpmetrics.track_links($("#footer .link-fapp"), "link-fapp", {"page":window.location.pathname, "source":"footer"});
      mpmetrics.track_links($("#matter .link-blog"), "link-blog", {"page":window.location.pathname, "source":"matter"});
      mpmetrics.track_links($("#footer .link-blog"), "link-blog", {"page":window.location.pathname, "source":"footer"});
      mpmetrics.track_links($("#matter .link-help"), "link-help", {"page":window.location.pathname, "source":"matter"});
      mpmetrics.track_links($("#footer .link-help"), "link-help", {"page":window.location.pathname, "source":"footer"});
      $("#bxslider .link-slide2").click(function() {
        mpmetrics.track("link-slide2", {"page":window.location.pathname, "source":"slider"});
        return false;
      });
      $("#bxslider .link-slide3").click(function() {
        mpmetrics.track("link-slide3", {"page":window.location.pathname, "source":"slider"});
        return false;
      });
      $("#header .link-video").click(function() {
        mpmetrics.track("link-video", {"page":window.location.pathname, "source":"header"});
        return false;
      });
      $("#bxslider .link-video").click(function() {
        mpmetrics.track("link-video", {"page":window.location.pathname, "source":"slider"});
        return false;
      });
    } catch(e) {
    }
  });
  $.getScript("/static/js/jquery.fancybox-1.3.4.js", function() {
    if ($(".link-video").length > 0) {
      $(".link-video").click(function() {
        $.fancybox({
          'autoScale' : false,
          'hideOnOverlayClick' : false,
          'padding' : 0,
          'titleShow' : false,
          'transitionIn' : 'none',
          'transitionOut' : 'none',
          'width' : 800,
          'height' : 480,
          'href' : this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
          'type' : 'swf',
          'swf' : {
            'wmode' : 'transparent',
            'allowfullscreen' : 'true'
          }
        });
        return false;
      });
    }
    if ($(".link-fancy").length > 0) {
      $(".link-fancy").fancybox();
    }
  });
  $.getScript("/static/js/jquery.bxslider.min.js", function() {
    if ($("#bxslider").length > 0) {
      var bxslider = $('#bxslider').bxSlider({
        controls: false,
        speed: 800
      });
      $('.slide-link').click(function() {
        bxslider.goToNextSlide();
        return false;
      });
      $('.slide-back').click(function() {
        bxslider.goToFirstSlide();
        return false;
      });
      function resizeSlider() {
        var h = $(window).height() - 140;
        if (h < 500) h = 500;
        if (h > 600) h = 600;
        $('#banner-600').height(h);
        if ($(window).width() >= 960) bxslider.reloadShow();
      }
      $(window).load(resizeSlider);
      $(window).resize(resizeSlider);
    }
    if ($("#ticker").length > 0) {
      $.getJSON('http://localhost:8080/event_json?callback=?', function(data) {
        $.each(data['interaction'], function(index, value) {
          $('#ticker').append('<li><img class="icon" src="' + value[0] + '"><span class="bold">' + value[2] + '</span> ' + value[1] + ' ' + value[3] + '</li>')
        });
        $('#ticker').bxSlider({
          auto: true,
          controls: false,
          pause: 5000,
          speed: 800
        });
      });
    }
  });
});
