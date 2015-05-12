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
     * Sends a GET request.
     * 
     * Example:
     * ```JavaScript
     * var req = new $.spModalRequestGet('test.php');
     * var obj = req.send();
     * obj.always(function () {
     *     console.log('This function is always executed, even when the request fails.');
     * }).done(function () {
     *     console.log('This function is executed on success requests.');
     * }).fail(function () {
     *     console.log('This function is executed on failed requests.');
     * });
     * ```
     * @param {String} url    URL
     * @param {Object} data   Parameters (not required)
     * @param {String} type   Expected document type (not required)
     * 
     * @extends {$.spModalRequest}
     */
    $.spModalRequestGet = function (url, data, type) {
        // calls the parent constructor
        $.spModalRequest.call(this, 'get', url, data, type);
    };
    $.spModalRequestGet.prototype = Object.create($.spModalRequest.prototype);
})(jQuery);
