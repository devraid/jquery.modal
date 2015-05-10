/**
 * jQuery.spModal - A Modal Window System.
 *
 * This plugin requires: 
 *      1. jQuery >= 2.1.3
 *      2. jQuery.ui >= 1.11.4
 *
 * @author    Gonzalo Chumillas <gchumillas@email.com>
 * @license   https://github.com/soloproyectos/jquery.modal/blob/master/LICENSE MIT License
 * @link      https://github.com/soloproyectos/jquery.modal
 */
(function ($) {
    /**
     * Sends an HTTP request.
     * 
     * @param {String} method Request method. Can be either 'get' or 'post'
     * @param {Mixed}  args   Additional arguments
     */
    $.spModalRequest = function (method, args) {
        if ($.inArray(method, ['get', 'post']) < 0) {
            $.error('Method not allowed: ' + method);
        }
        
        this._method = method;
        this._args = Array.prototype.slice.call(arguments, 1);
    };
    
    /**
     * Reqest method.
     * This method can be either 'get' or 'post'
     * @var {String}
     */
    $.spModalRequest.prototype._method = null;
    
    /**
     * Request arguments.
     * @var {Array}
     */
    $.spModalRequest.prototype._args = [];
    
    /**
     * Sends an HTTP request.
     * 
     * @return {jQuery.Promise}
     */
    $.spModalRequest.prototype.send = function () {
        var ret = new $.Deferred();
        var req = null;

        var loading = new $.spModalLoading();
        loading.addButton('Cancel', function () {
            if (req != null) {
                req.abort();
            }
        });

        // sends a request
        req = $[this._method].apply(
            this, this._args
        ).always(function () {
            loading.close();
        }).done(function (data, status, xhr) {
            ret.resolve(data, status, xhr);
        }).fail(function (xhr, status) {
            var message = $.type(xhr.responseText) == 'string' && xhr.responseText.length > 0
                ? xhr.responseText
                : 'The request has failed';
            var title = $.type(xhr.statusText) == 'string' && xhr.statusText.length > 0
                ? xhr.statusText
                : 'HTTP Request Error';
            
            // document type not expected or malformed
            if (status == 'parsererror') {
                title = 'The document is not well formed';
            }

            var msg = new $.spModalMessage(title, message);
            msg.setTextAlign('left');
            msg.addButton('Ok', function () {
                msg.close();
                ret.reject(xhr, status);
            });
        });

        return ret.promise();
    };
})(jQuery);
