/**
 * Created by Andrea Vaccari
 * Email: andrea@glancee.com
 */

$(function() {
    $("#wrap_post").toggle();

    $("#join_form").validate({
        submitHandler: function(form) {
            $.post("https://spreadsheets.google.com/a/glancee.com/formResponse?formkey=dDhPcGRDRnRYd2N2Nl9HN1lnN0V2VVE6MQ", $(form).serialize());
            $("#wrap_form").fadeToggle('fast', function() {
                $("#wrap_post").fadeToggle('fast');
            });
        }
    });

    $('.default-value').each(function() {
        var default_value = this.value;
        $(this).addClass("inactive");
        $(this).focus(function() {
            if (this.value == default_value) {
                this.value = '';
                $(this).removeClass("inactive");
                $(this).addClass("active");
            }
        });
        $(this).blur(function() {
            if (this.value == '') {
                this.value = default_value;
                $(this).removeClass("active");
                $(this).addClass("inactive");
            }
        });
    });
});