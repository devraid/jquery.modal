/**
 * jQuery.spModalWindow - A modal window.
 *
 * This plugin requires jQuery >= 1.7
 *
 * @namespace
 * @name      spModalWindow
 * @author    Gonzalo Chumillas <gchumillas@email.com>
 * @license   https://github.com/soloproyectos/jquery.modal/blob/master/LICENSE MIT License
 * @link      https://github.com/soloproyectos/jquery.modal
 */
(function ($) {
    
    /**
     * Creates a modal window.
     * 
     * A modal window is an iFrame covering all the available window. See the example included in
     * /demos/modal-window for more info.
     * 
     * Example:
     * ```JavaScript
     * var mw = new $.spModalWindow('user-interface.html', {param1: 'one', param2: 'two'});
     * mw.on('event', function () {
     *      // Performs some actions and close the modal window
     *      mw.close();
     * });
     * ```
     * 
     * @param {String} url    URL to the user interface
     * @param {Object} params Parameters (not required)
     * @name spModalWindow#__constructor__
     * @function
     */
    $.spModalWindow = function (url, params) {
        var self = this;
        
        if (params === undefined) {
            params = {};
        }
        
        // shows a loading dialog
        var loading = new $.spModalLoading();
        loading.addButton('Cancel', function () {
            if (self._target !== null) {
                self._target.remove();
            }
            loading.close();
        });
        
        // opens the interface
        this._target = $('<iframe class="sp-modal-window" />')
            .css('visibility', 'hidden')
            .attr('src', url)
            .data(params)
            .load(function () {
                self._target.css('visibility', 'visible');
                loading.close();
            })
            .appendTo('body');
        
        // calls the parent constructor
        $.spModalEventable.call(this, this._target);
    };
    $.spModalWindow.prototype = Object.create($.spModalEventable.prototype);
    
    /**
     * Closes the modal window.
     * 
     * @return {Void}
     * @name spModalWindow#close
     * @function
     */
    $.spModalWindow.prototype.close = function () {
        this._target.remove();
    };
})(jQuery);
