(function( $ ) {

    $.autorun = (function() {

    var _queue = [];
    var _actions = ['click', 'type', 'submit', 'dblclick', 'wait'];
    var _result = {};

    function run(o) {
        var elt = $(o.selector);
        if (elt.length && elt.is(':visible')) {
            switch (o.action) {
                
                case 'type' :
                    elt.focus();
                    var s = '';
                    for (var i = 0; i < o.value.length; i++) {
                        s += o.value.charAt(i); // IE compat???
                        elt.keydown().val(s).keypress().keyup();
                    }
                    break;
                    
                case 'click' :
                    elt.focus().mousedown().mouseup().click();
                    break;
                    
                case 'dblclick' :
                    elt.focus().mousedown().mouseup().dblclick();
                    break;
                    
                case 'wait' :
                    // do nothing :)
                    break;
                    
                default:
                    elt.trigger(o.action);
                    break;
            }
            _queue.shift();
        }
    };


    function processQueue() {
        console.log('queue', _queue.length);
        if (_queue.length) {
            run(_queue[0]);
            setTimeout(processQueue, 100);
        }
    }


    // Initialize queueable methods
    $.each(_actions, function(i, action) {
        // create the $.autorun.action() method
        _result[action] = function(selector, value) {
            _queue.push({
                action:action,
                selector:selector,
                value:value
            });
            return $.autorun;
        }
    });

    $(document).ready(function() {
        setTimeout(processQueue, 1000);
    });
    
    return _result;
})();

    $(document).ready(function() {
        var button = $('<button>static copy</button>')
            .click(function() {
                //$(this).remove();
                var d = document;
                var html = '';
                var doctypeNode = d.childNodes[0].nodeType === 10
                        ? d.childNodes[0]
                        : null;
                var doctype = '';
                if (doctypeNode) {
                    var dt = ['<!DOCTYPE'];
                    dt.push(doctypeNode.name);
                    dt.push('PUBLIC "' + doctypeNode.publicId + '"');
                    dt.push('"' + doctypeNode.systemId + '">');
                    doctype = dt.join(' ');
                }

                $(document).find('script').remove();
                html = doctype + '\n' + document.documentElement.innerHTML;

                var w = window.open();
                w.document.open(); w.document.write(html); w.document.close();
                /*
                var path = location.protocol + '//' + location.host + location.pathname;
                html = html.replace('<head>', '<head><base href="' + path + '"/></head>');
                //window.open('data:text/html;charset=utf-8,' + encodeURIComponent(html));
                */
            });
        button.css({
            position:'absolute',
            top:'0',
            right:'0',
            'z-index':'1000'
        }).appendTo($('body'));
    });

    
})(jQuery);




