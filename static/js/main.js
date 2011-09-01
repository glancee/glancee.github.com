/*
 * Created by Andrea Vaccari
 * Email: andrea@glancee.com
 */

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-21455677-1']);
_gaq.push(['_setDomainName', 'glancee.com']);
_gaq.push(['_setAllowHash', 'false']);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();

var mpmetrics;

$(function() {
  $.getScript("http://api.mixpanel.com/site_media/js/api/mixpanel.js", function() {
    if (window.location.host == "localhost") {
      return;
    }
    try {
      mpmetrics = new MixpanelLib("889ac641d6eac33d42e9fea6255b027d");
      mpmetrics.track("visit-" + window.location.pathname, {"referrer":document.referrer});
      mpmetrics.track_links($("#header .link-iphone"), "link-iphone", {"page":window.location.pathname, "source":"header"});
      mpmetrics.track_links($("#matter .link-iphone"), "link-iphone", {"page":window.location.pathname, "source":"matter"});
      mpmetrics.track_links($("#footer .link-iphone"), "link-iphone", {"page":window.location.pathname, "source":"footer"});
      mpmetrics.track_links($("#header .link-android"), "link-android", {"page":window.location.pathname, "source":"header"});
      mpmetrics.track_links($("#matter .link-android"), "link-android", {"page":window.location.pathname, "source":"matter"});
      mpmetrics.track_links($("#footer .link-android"), "link-android", {"page":window.location.pathname, "source":"footer"});
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
    if ($(".fancybox_link").length > 0) {
      $(".fancybox_link").fancybox();
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
  $.getScript("http://view.jquery.com/trunk/plugins/validate/jquery.validate.js", function() {
    $("#ss-thanks").toggle();
    $("#ss-form").validate({
      submitHandler: function(form) {
        $.post("https://spreadsheets.google.com/a/glancee.com/formResponse?formkey=dHktYWpaYTNaOGpFZWJ3eDlVYVM2N3c6MQ", $(form).serialize());
        $("#ss-form").fadeToggle('fast', function() {
          $("#ss-thanks").fadeToggle('fast');
        });
      }
    });
  });
//    LR.lrInstance = new LrInstance('launchrock', {
//        tagLine: "Disrupting real-world social interactions!",
//        description: "Leave us your email to participate in our private beta and connect with great people.",
//        refCodeUrl: "http://glancee.com/?ref=",
//        lrDomain: "glancee.com",
//        apiKey: "9d2d43c5bdb4276df332ce13ba41ba7b",
//        inviteList: "Glancee is launching soon. Get your VIP invite!"
//    });
//
//    LR.signupForm = new SignupForm({
//        secondaryPostLocation: ""
//    });
//
//    LR.postSubmit = new PostSignupForm('pagesubmit', {
//        twitterHandle: "glanceeapp",
//        twitterMessage: "Glancee is ready to disrupt real-world social interactions. Join me and get your VIP invite. #launch",
//        newUserHeaderText: "Thank you and welcome to Glancee!",
//        newUserParagraphText: "Every person on Glancee has a reputation score that says how trustworthy and authoritative they are. You can earn points by inviting your friends on Facebook and Twitter to signup.",
//        newUserParagraphText3: "You can also email and share the link below directly.",
//        returningUserHeaderText: "Welcome back!",
//        returningUserParagraphText: "Every person on Glancee has a reputation score that says how trustworthy and authoritative they are. You can earn points by inviting your friends on Facebook and Twitter to signup.",
//        returningUserParagraphText3: "You can also email and share the link below directly.",
//        statsPreText: "Your live stats: ",
//        footerLinks: "<a href='http://twitter.com/glanceeapp'>Follow Us on Twitter</a> | <a href='http://facebook.com/glanceeapp'>Like Us on Facebook</a>",
//        showDescription: true,
//        showTagLine: true,
//        showHeaderText: true,
//        showParagraphText: true,
//        showStats: true,
//        showShareButtons: true,
//        showFooterLinks: true
//    });
//
//    $("#launchrock").resize(function() {
//        $.fancybox.resize();
//    });
});
