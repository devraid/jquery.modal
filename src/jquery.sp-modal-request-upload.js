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
     * This class sends a POST request and uploads files.
     * 
     * ```JavaScript
     * var inputFile = $('#file');
     * inputFile.change(function () {
     *     var req = new $.spModalRequestUpload(inputFile, 'test.php');
     *     req.send().done(function (data) {
     *         console.log(data);
     *     }).fail(function () {
     *         console.log('failed!');
     *     });
     * });
     * ```
     * 
     * @param {jQuery.<HTMLInputElement>|String} input Input file(s)
     * @param {String}                           url   URL
     * @param {Object}                           data  Parameters (not required)
     */
    $.spModalRequestUpload = function (input, url, data) {
        this._input = $.type(input) == 'string'? $(input): input;
        this._url = url;
        this._data = data;
    };
    
    /**
     * Input file(s).
     * @var {jQuery.<HTMLInputElement>}
     */
    $.spModalRequestUpload.prototype._input = null;
    
    /**
     * URL.
     * @var {String}
     */
    $.spModalRequestUpload.prototype._url = "";
    
    /**
     * Parameters.
     * @var {Object}
     */
    $.spModalRequestUpload.prototype._data = {};
    
    /**
     * Sends a POST request and uploads the files.
     * 
     * @return {jQuery.Promise}
     */
    $.spModalRequestUpload.prototype.send = function () {
        var ret = new $.Deferred();
        var data = new FormData();
        var req = null;
        
        // appends files
        this._input.each(function () {
            var target = $(this);
            var name = target.attr('name');
            var value = this.files[0];
            
            if ($.type(name) != 'string' || name.length == 0) {
                $.error('Attribute "name" is required for the input file');
            }
            
            if (value !== undefined) {
                data.append(name, value);
            }
        });
        
        // appends parameters
        if (this._data !== undefined) {
            $.each(this._data, function (name, value) {
                data.append(name, value);
            });
        }
        
        // shows modal progress dialog
        var progress = new $.spModalProgress('Uploading file...');
        progress.addButton('Cancel Upload', function () {
            progress.close();
            if (req != null) {
                req.abort();
            }
        });

        // sends data object
        var req = new XMLHttpRequest();
        req.upload.addEventListener('progress', function (event) {
            var total = $.type(event.total) == 'number'? event.total: 100;
            var loaded = $.type(event.loaded) == 'number'? event.loaded: 0;
            progress.setValue(loaded / total);
        }, false);
        req.addEventListener('readystatechange', function () {
            if (req.readyState == 4) {
                progress.close();
                
                // checks for errors
                var status = '' + req.status;
                if (!status.match(/^2\d{2}$/)) {
                    var message = $.type(req.responseText) == 'string' && req.responseText.length > 0
                        ? req.responseText
                        : 'The request has failed';
                    var title = $.type(req.statusText) == 'string' && req.statusText.length > 0
                        ? req.statusText
                        : 'HTTP Request Error';
                    $.spModal('error', title, message);
                }
                
                ret.resolve(req.responseText, 'sucess', req);
            }
        }, false);
        req.open('POST', this._url, true);
        req.send(data);

        return ret.promise();
    };
})(jQuery);
