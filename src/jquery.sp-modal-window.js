(function ($) {
    
    /**
     * Opens a modal window.
     * 
     * This function appends an iframe to the body.
     * 
     * @param {String} url    URL to the user interface
     * @param {Object} params Parameters (not required)
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
    };
    
    /**
     * Iframe modal window.
     * @var {jQuery.<HTMLIFrameElement>}
     */
    $.spModalWindow.prototype._target = null;
    
    /**
     * Gets the iframe modal window.
     * 
     * @return {jQuery.<HTMLIFrameElement>}
     */
    $.spModalWindow.prototype.getTarget = function () {
        return this._target;
    };
    
    /**
     * Attaches an event handler.
     * 
     * More info: https://api.jquery.com/on/
     * 
     * @return {jQuery}
     */
    $.spModalWindow.prototype.on = function () {
        var args = Array.prototype.slice.call(arguments);
        
        return this._target.on.apply(this._target, args);
    };
    
    /**
     * Removes an event handler.
     * 
     * More info: https://api.jquery.com/off/
     * 
     * @return {jQuery}
     */
    $.spModalWindow.prototype.off = function () {
        var args = Array.prototype.slice.call(arguments);
        
        return this._target.off.apply(this._target, args);
    }
    
    /**
     * Triggers an event.
     * 
     * More info: https://api.jquery.com/trigger/
     * 
     * @return {jQuery}
     */
    $.spModalWindow.prototype.trigger = function (eventType) {
        var args = Array.prototype.slice.call(arguments);
        
        this._target.trigger.apply(this._target, args);
    };
    
    /**
     * Closes the modal window.
     * 
     * @return {Void}
     */
    $.spModalWindow.prototype.close = function () {
        this._target.remove();
    };
})(jQuery);
