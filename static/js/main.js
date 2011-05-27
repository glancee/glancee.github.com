/*
 * Created by Andrea Vaccari
 * Email: andrea@glancee.com
 */

$(function() {
    var slider = $('#slider').bxSlider({
        controls: false,
        speed: 800
    });

    $('.slide-next').click(function() {
        slider.goToNextSlide();
        return false;
    });

    $('.slide-back').click(function() {
        slider.goToFirstSlide();
        return false;
    });

    $(".link-download").fancybox({
        'autoScale' : false,
        'hideOnOverlayClick' : false,
        'padding' : 0,
        'titleShow' : false,
        'transitionIn' : 'none',
        'transitionOut' : 'none'
    });

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

    $("#countdown").countdown({until: new Date(2011, 05, 10)});

    LR.lrInstance = new LrInstance('launchrock', {
        tagLine: "Disrupting real-world social interactions!",
        description: "Leave us your email to participate in our private beta and connect with great people.",
        refCodeUrl: "http://glancee.com/?ref=",
        lrDomain: "glancee.com",
        apiKey: "9d2d43c5bdb4276df332ce13ba41ba7b",
        inviteList: "Glancee is launching soon. Get your VIP invite!"
    });

    LR.signupForm = new SignupForm({
        secondaryPostLocation: ""
    });

    LR.postSubmit = new PostSignupForm('pagesubmit', {
        twitterHandle: "glanceeapp",
        twitterMessage: "Glancee is ready to disrupt real-world social interactions. Join me and get your VIP invite. #launch",
        newUserHeaderText: "Thank you and welcome to Glancee!",
        newUserParagraphText: "Every person on Glancee has a reputation score that says how trustworthy and authoritative they are. You can earn points by inviting your friends on Facebook and Twitter to signup.",
        newUserParagraphText3: "You can also email and share the link below directly.",
        returningUserHeaderText: "Welcome back!",
        returningUserParagraphText: "Every person on Glancee has a reputation score that says how trustworthy and authoritative they are. You can earn points by inviting your friends on Facebook and Twitter to signup.",
        returningUserParagraphText3: "You can also email and share the link below directly.",
        statsPreText: "Your live stats: ",
        footerLinks: "<a href='http://twitter.com/glanceeapp'>Follow Us on Twitter</a> | <a href='http://facebook.com/glanceeapp'>Like Us on Facebook</a>",
        showDescription: true,
        showTagLine: true,
        showHeaderText: true,
        showParagraphText: true,
        showStats: true,
        showShareButtons: true,
        showFooterLinks: true
    });

    $("#launchrock").resize(function() {
        $.fancybox.resize();
    });

    $(window).load(resizeSlider);
    $(window).resize(resizeSlider);
});

function resizeSlider()
{
    var h = $(window).height() - 100;
    if (h < 500) h = 500;
    if (h > 600) h = 600;
    $('.banner-600').height(h);
}

