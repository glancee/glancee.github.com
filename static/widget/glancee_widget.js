(function() {
    function queryValueFor(url, name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var re = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = re.exec(url);
        if (results == null) return null;
        return results[1];
    }

    var getOptions = function() {
        var options = {}
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
            var script = scripts[i].src;
            if (script.match(/glancee_widget\.js(\?.*)?$/)) {
                options['location'] = queryValueFor(script, 'location');
                options['event_id'] = queryValueFor(script, 'event_id');
                break;
            }
        }
        return options;
    }

    var getHost = function() {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
            var script = scripts[i].src;
            if (script.match(/glancee_widget\.js(\?.*)?$/)) {
                var host = script.substring(0, script.indexOf("tender_widget.js"));
            }
        }
        return host;
    }

    var api = 'http://192.168.1.113:8080';
    var host = getHost();
    var options = getOptions()

    var show = function() {
        if (!document.getElementById('glancee_window')) {
            var element = document.createElement('div');
            element.innerHTML = '<div id="glancee_window"><a id="glancee_closer" href="#">Close</a><iframe id="glancee_frame" src="' + api + '/event?event_id=' + options['event_id'] + '" scrolling="no" frameborder="0"></iframe></div>';
            document.body.appendChild(element);
            document.getElementById('glancee_closer').onclick = function() {
                hide();
                return false;
            }
        }
        document.getElementById('glancee_window').style.display = '';
        document.getElementById('glancee_toggle').style.display = 'none';
    }

    var hide = function() {
        document.getElementById('glancee_window').style.display = 'none';
        document.getElementById('glancee_toggle').style.display = '';
    }

    var toggle = document.createElement('div');
    toggle.innerHTML = '<div id="glancee_toggle"><a id="glancee_toggle_link" href="#">Glancee</a></div>';
    document.body.appendChild(toggle);
    document.getElementById('glancee_toggle_link').onclick = function() {
        show();
        return false;
    }

    var css = "#glancee_window { position:fixed; top:20px; left:50%; margin-left:-300px; width:580px; height:600px; padding:3px; background:url(" + host + "static/widget/bg-black.png); z-index:9999; } ";
    css += "#glancee_window #glancee_frame{ width:100%; height:100%; background: #fff; } ";
    css += "#glancee_closer { position:absolute; top:18px; right:18px; color:#fff; font: bold 12px Helvetica, Arial, sans-serif; text-decoration:none; border:none; } ";
    css += "#glancee_toggle { position:fixed; top:50px; left:0; width:35px; height:100px; padding:3px 3px 3px 0; background:url(" + host + "static/widget/bg-black.png); } ";
    css += "#glancee_toggle_link{ display:block; width:100%; height:100%; text-decoration:none; border:none; text-indent:-9999px; background: #88aa33 url(" + host + "static/widget/toggle_" + options['location'] + ".png) !important; } "

    if (options['location'] == 'right') {
        css += "#glancee_toggle { right:0; padding:3px 0 3px 3px; }";
    } else if (options['location'] == 'top') {
        css += "#glancee_toggle{ top:0; left:100px; padding:0 3px 3px 3px;";
    } else if (options['location'] == 'bottom') {
        css += "#glancee_toggle{ bottom:0; left:100px; padding:3px 3px 0 3px;";
    }

    var style = document.createElement('style');
    style.setAttribute("type", "text/css");
    style.setAttribute("charset", "utf-8");
    try {
        style.appendChild(document.createTextNode(css));
        document.getElementsByTagName("head").item(0).appendChild(style);
    } catch(e) {
    }
})();
